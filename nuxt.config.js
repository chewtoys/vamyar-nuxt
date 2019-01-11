//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const pkg = require('./package')
const nodeExternals = require('webpack-node-externals')
import webpack from 'webpack'
import https from 'https'

export default {

  mode: 'universal',

  head: {
    title: "عنوان سایت",
    titleTemplate: "%s - وامیار",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width"},
      {hid: "description", name: "description", content: "Vamyar project"}
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      },
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
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
      //{        rel: "stylesheet",        href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css"      }
      // {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'},
      // {rel: 'stylesheet', href: 'http://kenwheeler.github.io/slick/slick/slick-theme.css'}
    ],
    script: [
      //   {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
      //  {src: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'}
    ]
  },

  loading: {color: '#1BF'},
  css: ["~assets/app.styl", "~assets/helper.styl", "~assets/font.styl",
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
  ],

  plugins: [
    {
      src: '~/plugins/editor',
      ssr: false
    },
    {
      src: '~/plugins/datepicker.js',
      ssr: false
    },
    "~/plugins/vuetify.js",
    {
      src: "~/plugins/siema.js",
      ssr: false
    },
    "~/plugins/axios.js",
    "~/plugins/lodash.js",
    "~/plugins/mixinCommonMethods.js"
  ],

  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  axios: {
    //proxyHeaders: false,
    //changeOrigin: true,
    changeOrigin: true,
    baseURL: "https://api.vamyar.org",
    //port: 443,
    debug: false,
    //proxyHeaders: false,
    //mode: 'no-cors',
    //credentials: false
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    //cache: true,
    //parallel: true,
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash',
        '$': 'jquery',
        jQuery: 'jquery'
      })
    ],
    extend(config, ctx) {
    }
  }
}
