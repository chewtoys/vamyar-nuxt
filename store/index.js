import cookieparser from "cookieparser"

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
  secret: "pt1BQC1dxHU9taQQovJlpgZzmx0tUNMxlTVIUWk4"
})

export const mutations = {
  setPageData(state, data) {
    state.page = data
  },
  debug(state, data) {
    state.debug = data
  }
}
export const actions = {
  async nuxtServerInit({ commit }, { $axios, route, redirect, req }) {
    // user
    let accessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.auth) {
        accessToken = parsed.auth
        $axios.setHeader("Authorization", `Bearer ${accessToken}`)
        try {
          let { data } = await $axios.$get("/user/details")
          if (data && data.details.firstName) {
            commit("user/updateUserInfo", data)
          } else if (data) {
            commit("user/updateUserInfo", data)
            //console.log('Router', route);
            let path = "/user/profile/edit"
            if (route.path !== path) redirect(path)
          }
        } catch (error) {
          //console.log('AUTH ERROR', error)
        }
        commit("user/updateToken", accessToken)
      }
    }

    //admin
    let adminAccessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.adminauth) {
        adminAccessToken = parsed.adminauth
        commit("admin/updateAdminToken", adminAccessToken)
      }
    }
  }
}
