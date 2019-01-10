//export const strict = false
import cookieparser from "cookieparser"

const guaranteeMethod = '/guaranteeTypes',
  loanTypeMethod = '/loanTypes',
  cityMethod = '/cities?number=3000',
  settingsMethod = '/settings',
  contactUsMethod = '/site/contact-us',
  aboutUsMethod = '/site/about-us'

export const state = () => ({
  debug: true,
  site: {
    title: "وامیار",
  },
  page: {
    title: "بدون عنوان",
    breadcrumb: null
  },
  client_secret: "JNjHBZBNIHXKn1Gl8AwkV2saK4cfG5rwT879lT9m",
  client_id: 1,
});

export const mutations = {
  setPageData(state, data) {
    state.page = data
  },
  debug(state, data) {
    state.debug = data
  }
};
export const actions = {
  async nuxtServerInit({commit, dispatch}, {$axios, route, redirect, req}) {
    // user

    if (!_.startsWith(route.path, '/admin')) {
      let accessToken = null;
      if (req.headers.cookie) {
        let parsed = cookieparser.parse(req.headers.cookie);
        if (parsed.auth) {
          accessToken = parsed.auth;
          $axios.setHeader("Authorization", `Bearer ${accessToken}`);
          try {
            let {data} = await $axios.$get("/user/details");
            if (_.has(data, 'details')) {
              commit("user/updateUserInfo", data)
            }
            let subscriptionData = await $axios.$get("/user/subscriptions", {params: {include: 'subscriptionPlan'}});
            if (_.has(subscriptionData, 'data')) {
              commit("user/updateUserSubscription", _.get(subscriptionData, 'data', null))
            }
          } catch (error) {
            //console.log('AUTH ERROR', error)
            //return  redirect('/user/auth');
          }
          commit("user/updateToken", accessToken)
        }
      }
    }

    //admin

    if (!!_.startsWith(route.path, '/admin')) {
      let adminAccessToken = null;
      if (req.headers.cookie) {
        let parsed = cookieparser.parse(req.headers.cookie);
        if (parsed.adminauth) {
          adminAccessToken = parsed.adminauth;
          commit("admin/updateAdminToken", adminAccessToken)
        }
      }
    }

    // city resource
    /*
    // used in advert creation
    try {
      let cityData = await this.$axios.$get(cityMethod);
      commit('city/setAndProcessData', cityData.data || []);
      //dispatch('city/makeArrayList');
    } catch (error) {
      //console.log(error)
    }


    // guarantee resources
    // used in advert creation
    try {
      let guaranteeData = await this.$axios.$get(guaranteeMethod);
      commit('guaranteeType/setAndProcessData', guaranteeData.data || []);
    } catch (error) {
      //console.log(error)
    }

    // loan types resources
    try {
      let loanTypeData = await this.$axios.$get(loanTypeMethod);
      commit('loanType/setData', loanTypeData.data || []);
    } catch (error) {
      //console.log(error)
    }
  */
    // settings resources
    try {
      let settingsData = await this.$axios.$get(settingsMethod);
      commit('settings/setAndProcessData', settingsData.data || []);
    } catch (error) {
      //console.log(error)
    }
    /*
    // about us resource
    try {
      let aboutUsData = await this.$axios.$get(aboutUsMethod);
      commit('site/aboutUs/setData', aboutUsData.data || []);
    } catch (error) {
      //console.log(error)
    }
    // contact us resources
    try {
      let contactUsData = await this.$axios.$get(contactUsMethod);
      commit('site/contactUs/setData', contactUsData.data || []);
    } catch (error) {
      //console.log(error)
    }
    */

  }
};
