import cookieparser from "cookieparser"

const guaranteeMethod = '/guaranteeTypes',
  cityMethod = '/cities?number=1000',
  loanTypeMethod = '/loanTypes',
  settingsMethod = '/settings',
  contactUsMethod = '/site/contact-us',
  aboutUsMethod = '/site/about-us'

export const state = () => ({
  temp: {
    lorem:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
  },
  debug: true,
  test: null,
  year: 1397,
  site: {
    notes_on_loans:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    notes_on_request_loans:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    users_count: 768,
    title: "وامیار",
    heading: "شعار سایت",
    subheading: "جمله ی توضیحی",
    logo: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  page: {
    title: "بدون عنوان",
    breadcrumb: null
  },
  client_secret: "CbrWpv5DqAnXiduZafBre9ZJHfT23OnDL1Mjur6f",
  client_id: "3",
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
    try {
      let cityData = await this.$axios.$get(cityMethod);
      commit('city/setData', cityData.data || []);
    } catch (error) {
      //console.log(error)
    }

    // guarantee resources
    try {
      let guaranteeData = await this.$axios.$get(guaranteeMethod);
      commit('guaranteeType/setData', guaranteeData.data || []);
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

    // settings resources
    try {
      let settingsData = await this.$axios.$get(settingsMethod);
      commit('settings/setAndProcessData', settingsData.data || []);
    } catch (error) {
      //console.log(error)
    }
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

  }
};
