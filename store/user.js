const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  auth: null,
  info: null,
  hasSubscription: false,
  subscription: {
    period: 0,
    left: 0,
    endDate: '',
    expireDate: '',
    title: null,
  },
  subscriptions: []
})

export const mutations = {
  updateUserInfo(state, data) {
    state.info = data
  },
  updateUserSubscription(state, data) {
    if (_.isArray(data) && data.length > 0) {
      state.subscription = data[0];
      state.subscription.period = _.get(data[0], 'period', 0);
      state.subscription.left =  _.get(data[0], 'info.remainedDays', 0);
      state.subscription.endDate = _.get(data[0], 'info.endDate.date', 0);
      state.subscription.expireDate = Helper.dateFormat(_.get(data[0], 'info.endDate.date', ''), 'YYYY/M/D HH:mm:ss', 'jYYYY/jM/jD HH:mm:ss');
      state.subscriptions = data;
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
