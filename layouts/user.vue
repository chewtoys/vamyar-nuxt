<template>
  <v-app>
    <ToolBar/>
    <Drawer/>
    <v-content>
      <v-container fluid>
        <Breadcrumb/>
        <nuxt/>
        <Snackbar/>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  import Breadcrumb from "~/components/user/Breadcrumb.vue"
  import ToolBar from "~/components/user/ToolBar.vue"
  import Drawer from "~/components/user/Drawer.vue"
  import Footer from "~/components/user/Footer.vue"
  import Snackbar from "~/components/Snackbar.vue"


  export default {
    head() {
      return {
        title: this.$store.state.navigation.title,
        titleTemplate: 'پنل کاربری ' + _.get(this.$store.state, 'settings.data.site.siteTitle', '') + '- %s ',
        meta:
          [
            {name: 'keywords', content: "حساب کاربری, سایت وامیار, user"},
            {name: 'description', content: "حساب کاربری سایت وامیار"},
          ]
      }
    },
    middleware: ["httpToHttps", "updateSettings", "authenticated", "navigation", "userEditProfile", 'isSiteOpen'],
    components: {
      ToolBar,
      Footer,
      Breadcrumb,
      Snackbar,
      Drawer
    }
  }
</script>
