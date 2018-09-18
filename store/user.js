export const state = () => ({
  auth: null,
  info: null
})

export const mutations = {
  updateUserInfo(state, data) {
    state.info = data
  },
  updateToken(state, data) {
    state.auth = data
  }
}

export const actions = {
  logout() {
    this.commit("user/updateToken", null)
  },
  updateAuth({ req }) {
    let accessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.auth) {
        accessToken = parsed.auth
        commit("user/updateToken", accessToken)
      }
    }
  }
}
