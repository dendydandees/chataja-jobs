export const state = () => ({
  latestJobs: [],
})

export const mutations = {
  SET_LATEST_JOBS(state, latestJobs) {
    state.latestJobs = latestJobs
  },
}

export const actions = {
  async getLatestJobs({ commit, dispatch }) {
    try {
      const result = await fetch(`/api/job_board/search?limit=4`).then((res) =>
        res.json()
      )
      if (result) {
        commit('SET_LATEST_JOBS', result.jobs)
        console.log(result.jobs[1])
      } else {
        commit('SET_LATEST_JOBS', [])
      }
    } catch (error) {
      throw new Error(error)
    }
  },
}
