export const state = () => ({
  auth: null
})

export const mutations = {

  updateAdminToken(state, data) {
    state.auth = data
  }

}


export const actions = {

  logout() {
    this.commit('admin/updateAdminToken', null);
  }
  ,
  updateAdminAuth({req}) {
    let adminAccessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.adminauth) {
        adminAccessToken = parsed.adminauth
        commit('admin/updateAdminToken', adminAccessToken)
      }
    }
  }
}
