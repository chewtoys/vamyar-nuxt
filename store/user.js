const Cookie = process.client ? require('js-cookie') : undefined

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
  logout: function ({commit}) {
    if (Cookie) Cookie.remove('auth');
    commit("updateToken", null)
  },
  updateAuth: function ({req, commit}) {
    let accessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.auth) {
        accessToken = parsed.auth
        commit("updateToken", accessToken)
      }
    }
  }
}
