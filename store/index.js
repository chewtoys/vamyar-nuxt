import cookieparser from "cookieparser";

export const state = () => ({
  temp: {
    lorem: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    loan: {
      item: {
        id: 2,
        title: 'وام',
        loan: '2,000,000 تومان',
        price: 'قیمت',
        date: '9 مرداد 97',
        city: 'تهران',
        loan_type: ' نوع وام',
        payback: 'سه ماهه',
        security: 'چک و سفته',
        other: 'مورد دیگر',
        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        urgent: true,
        has_image: true,
        image: 'http://placehold.it/2000x1000',
        user: 'نام کاربر',
        phone: "09123456789",
        mail: 'XXX@mds.xzx',
        address: "آدرس مراجعه",
      }
    }, loanRequest: {
      item: {
        id: 2,
        title: 'درخواست وام',
        loan: '2,000,000 تومان',
        price: 'قیمت',
        date: '9 مرداد 97',
        city: 'تهران',
        loan_type: ' نوع وام',
        payback: 'سه ماهه',
        security: 'چک و سفته',
        other: 'مورد دیگر',
        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        urgent: true,
        has_image: true,
        image: 'http://placehold.it/2000x1000',
        user: 'نام کاربر',
        phone: "09123456789",
        mail: "user@mail.com",
        address: "آدرس مراجعه",
      }
    }
  },
  admin: {
    auth: null
  },
  auth: null,
  debug: true,
  test: null,
  year: 1397,
  user: null,
  site: {
    notes_on_loans: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    notes_on_request_loans: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    users_count: 768,
    title: 'وامیار',
    heading: 'شعار سایت',
    subheading: 'جمله ی توضیحی',

    logo: 'https://randomuser.me/api/portraits/men/85.jpg'
  },
  page: {
    title: 'بدون عنوان',
    breadcrumb: null
  },
  secret: 'pt1BQC1dxHU9taQQovJlpgZzmx0tUNMxlTVIUWk4'
})


export const mutations = {
  setBreadcrumb(state, data) {
    state.page.breadcrumb = data
  }
  ,
  setPageTitle(state, data) {
    state.page.title = data
  }
  ,
  updateUserInfo(state, data) {
    state.user = data
  }
  ,
  updateToken(state, data) {
    state.auth = data
  }
  ,
  setPageData(state, data) {
    state.page = data
  }
  ,
  updateAdminToken(state, data) {
    state.admin.auth = data
  }
  ,
  debug(state, data) {
    state.debug = data
  }
  ,
  setTest(state, data) {
    state.test = data
  }
}

export const actions = {
  async nuxtServerInit({commit}, {$axios, route, redirect, req}) {
    //user
    let accessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.auth) {
        accessToken = parsed.auth
        //console.log('Token:', accessToken)
        //console.log('Route:', route)
        $axios.setHeader('Authorization', `Bearer ${accessToken}`)

        try {
          let {data} = await
            $axios.$get('/user/details');
          //console.log('Got data', data);
          if (data && data.details.firstName) {
            commit('updateUserInfo', data)
          }
          else if (data) {
            commit('updateUserInfo', data)
            //console.log('Router', route);
            let path = '/user/profile/edit';
            if (route.path !== path) redirect(path);
          }
        } catch (error) {
          //console.log('AUTH ERROR', error)
        }
        commit('updateToken', accessToken)
      }
    }
    //admin
    let adminAccessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.adminauth) {
        adminAccessToken = parsed.adminauth
        commit('updateAdminToken', adminAccessToken)
      }
    }
  }
  ,
  logout() {
    this.commit('updateAdminToken', null);
    this.commit('updateToken', null);
  }
  ,
  updateAdminAuth({req}) {
    let adminAccessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.adminauth) {
        adminAccessToken = parsed.adminauth
        commit('updateAdminToken', adminAccessToken)
      }
    }
  }
  ,
  updateAuth({req}) {
    let accessToken = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.auth) {
        accessToken = parsed.auth
        commit('updateToken', accessToken)
      }
    }
  }
}
