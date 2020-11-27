export const state = () => ({
  jobs: [],
})

export const mutations = {
  SET_JOBS(state, jobs) {
    state.jobs = jobs
  },
}

export const actions = {
  async getJobs({ commit, dispatch }) {
    try {
      const result = await fetch(`/api/job_board/search?limit=4`).then((res) =>
        res.json()
      )
      commit('SET_JOBS', result)
    } catch (error) {}
  },
}
