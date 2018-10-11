const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  auth: null
})

export const mutations = {
  updateAdminToken(state, data) {
    if (Cookie) Cookie.remove('adminauth');
    state.auth = data
  }
}

export const actions = {
  logout({commit}) {
    commit("updateAdminToken", null)
  },
  updateAdminAuth({req, commit}) {
    let adminAccessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.adminauth) {
        adminAccessToken = parsed.adminauth
        commit("updateAdminToken", adminAccessToken)
      }
    }
  }
}
