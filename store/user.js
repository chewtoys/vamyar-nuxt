const Cookie = process.client ? require('js-cookie') : undefined
import Helper from '~/assets/js/helper'

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
    data = _.get(data, 'data', data)
    if (_.isArray(data) && data.length > 0) {
      state.subscription = data[0];
      state.subscription.period = _.get(data[0], 'subscriptionsPlan.period', 0);
      state.subscription.left = _.get(data[0], 'remainedDays', 0);
      state.subscription.title = _.get(data[0], 'subscriptionPlan.title', 0);
      state.subscription.price = _.get(data[0], 'subscriptionPlan.price', 0);
      let endDate = _.get((data[0]), 'endDate.date', 0)
      // console.log({endDate})
      //state.subscription.endDate = endDate;
      state.subscription.expireDate = Helper.dateFormat(endDate, 'YYYY-M-D HH:mm:ss', 'jYYYY/jM/jD HH:mm:ss');
      state.subscriptions = data;
      state.hasSubscription = _.get(data[0], 'active', false);
    } else {
      state.hasSubscription = false;
    }
  },
  updateToken(state, data) {
    state.auth = data
  },
  resetUser(state, data) {
    state.subscription = {
      period: 0,
      left: 0,
      endDate: '',
      expireDate: '',
      title: null,
    }
    state.hasSubscription = false
    state.subscriptions = []
    state.info = null
    state.auth = null
  }
}

export const actions = {
  logout: function ({commit}) {
    if (Cookie) Cookie.remove('auth');
    commit("updateToken", null)
    commit("resetUser", null)
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
