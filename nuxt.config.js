module.exports = {
  /*
   ** Headers of the pageaxios
   */
  head: {
    title: "عنوان سایت",
    titleTemplate: "%s - وامیار",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width" },
      { hid: "description", name: "description", content: "Vamyar project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css"
      }
      // {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'},
      // {rel: 'stylesheet', href: 'http://kenwheeler.github.io/slick/slick/slick-theme.css'}
    ],
    script: [
      //   {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
      //  {src: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'}
    ]
  },
  /*
   ** Customize the progress bar color
   */
  modules: [
    "@nuxtjs/axios"
    // Simple usage'
  ],
  serverMiddleware: [
    // API middleware
    //'~/api/index.vue'
  ],
  axios: {
    //proxyHeaders: false,
    //changeOrigin: true,
    baseURL: "http://api.vamyar.tk:808"
    //debug: false,
    //proxyHeaders: false,
    //mode: 'no-cors',
    //credentials: false
  },
  loading: { color: "#3B8070" },
  plugins: [
    "~/plugins/vuetify.js",
    {
      src: "~/plugins/siema.js",
      ssr: false
    },
    "~/plugins/axios.js",
    "~/plugins/mixinCommonMethods.js"
  ],
  css: ["~assets/app.styl", "~assets/helper.styl", "~assets/font.styl"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     * /*/
    vendor: ["babel-polyfill", "axios", "vuetify"],

    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
         // loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
