const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  auth: null,
  info: null,
  hasSubscription: false,
  subscription: {
    period: 0,
    title: null,
  }
})

export const mutations = {
  updateUserInfo(state, data) {
    state.info = data
  },
  updateUserSubscription(state, data) {
    if (_.has(data, 'id')) {
      state.subscription = data;
      state.hasSubscription = true;
    } else {
      state.hasSubscription = false;
    }
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
