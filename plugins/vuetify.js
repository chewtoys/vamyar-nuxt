import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueClipboard from "vue-clipboard2";
import VeeValidate from "vee-validate";
//import PDatePicker from "vue2-persian-datepicker";
//import tinymce from "vue-tinymce-editor";

//Vue.component('tinymce', tinymce)
//Vue.component('pdatepicker', PDatePicker)
Vue.use(VeeValidate)
Vue.use(VueClipboard);

Vue.use(Vuetify, {
    rtl: true,
    theme: {
        primary: colors.teal.darken1, // #E53935
        secondary: colors.blue.lighten4, // #FFCDD2
        accent: colors.indigo.base // #3F51B5
    }
    //iconfont: 'md' || 'mdi' || 'fa' || 'fa4'
})
