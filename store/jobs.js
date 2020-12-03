export const state = () => ({
  latestJobs: [],
  functionJobs: [],
  detailJob: [],
  searchJobs: [],
})

export const mutations = {
  SET_LATEST_JOBS(state, latestJobs) {
    state.latestJobs = latestJobs
  },
  SET_FUNCTION_JOBS(state, functionjob) {
    state.functionJobs = functionjob
  },
  SET_DETAIL_JOB(state, detailJob) {
    state.detailJob = detailJob
  },
  SET_SEARCH_JOBS(state, searchJobs) {
    state.searchJobs = searchJobs
  },
}

export const actions = {
  async getLatestJobs({ commit, dispatch }) {
    try {
      const result = await fetch(`/api/job_board/search?limit=4`)
        .then((res) => res.json())
        .then((data) => {
          return data.jobs.sort((first, second) => {
            return first.activation_date > second.activation_date
              ? -1
              : first.activation_date < second.activation_date
              ? 1
              : 0
          })
        })

      if (result) {
        commit('SET_LATEST_JOBS', result)
      } else {
        commit('SET_LATEST_JOBS', [])
      }
    } catch (error) {
      error({ statusCode: 404, message: 'Jobs not found' })
    }
  },
  async getFunctionJobs({ commit, dispatch }) {
    try {
      const result = await fetch(`/api/job_board/search`)
        .then((res) => res.json())
        .then((data) => {
          const jobs = data.jobs.map((job) => {
            return job.function
          })
          const set = [...new Set(jobs)]
          return set
        })

      if (result) {
        commit('SET_FUNCTION_JOBS', result)
      } else {
        commit('SET_FUNCTION_JOBS', [])
      }
    } catch (error) {
      error({ statusCode: 404, message: 'Jobs not found' })
    }
  },
  async getDetailJob({ commit, dispatch }, id) {
    try {
      const result = await fetch(`/api/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          return data
        })

      if (result) {
        commit('SET_DETAIL_JOB', result)
      } else {
        commit('SET_DETAIL_JOB', [])
      }
    } catch (error) {
      error({ statusCode: 404, message: 'Jobs not found' })
    }
  },
  async searchJobsAction({ commit }, data) {
    const result = await fetch(
      `/api/job_board/search?text=${data.text}&location=${data.location}&limit=12&offset=0`
    )
      .then((res) => res.json())
      .then((data) => {
        return data
      })

    if (result) {
      commit('SET_SEARCH_JOBS', result)
    } else {
      commit('SET_SEARCH_JOBS', [])
    }
  },
}
