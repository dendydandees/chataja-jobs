export const state = () => ({
  hasProfile: false,
})

export const mutations = {
  SET_CHECK_PROFILE(state, profile) {
    state.hasProfile = profile
  },
}

export const actions = {
  /**
   * check account profile
   * @error 400 : user not login
   * @error 422 : user was login, but not have profile
   */
  async getProfile({ commit, dispatch }, token) {
    await fetch(
      'https://cors-anywhere.herokuapp.com/http://chataja-jobs-be.chataja.co.id/api/v1/seeker/profile',
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => {
        if (response.status === 422) {
          commit('SET_CHECK_PROFILE', true)
        } else {
          commit('SET_CHECK_PROFILE', false)
        }
      })
      .then((result) => result)
      .catch((error) => error)
  },
  /**
   * check account profile
   * @error 400 :
   * @error 422 : phone number has been taken
   */
  async SignUpJobSeeker({ commit, dispatch }, data) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify(data)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    return await fetch(
      'https://cors-anywhere.herokuapp.com/http://chataja-jobs-be.chataja.co.id/api/v1/users',
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw response
        } else {
          return response.json()
        }
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        return error
      })
  },
}
