import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueClipboard from "vue-clipboard2";
import fa from 'vee-validate/dist/locale/fa';
import VeeValidate, {Validator} from 'vee-validate';
// Translation provided by Vuetify (typescript)
import farsi from 'vuetify/src/locale/fa.ts'

import vueSmoothScroll from 'vue-smooth-scroll'
//// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('fa', fa);

// Install the Plugin.
Vue.use(VeeValidate);

//import PDatePicker from "vue2-persian-datepicker";
//import tinymce from "vue-tinymce-editor";

//Vue.component('tinymce', tinymce)
//Vue.component('pdatepicker', PDatePicker)
//Vue.use(vueSmoothScroll)

Vue.use(VueClipboard);

Vue.use(Vuetify, {
  rtl: true,
  lang: {
    locales: {farsi},
    current: 'farsi'
  },
  theme: {
    primary: colors.cyan.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.green.base // #3F51B5
  }
  //iconfont: 'md' || 'mdi' || 'fa' || 'fa4'
})
