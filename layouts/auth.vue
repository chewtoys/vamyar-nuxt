<template>
  <v-app>
    <v-content>
      <ToolBar/>
      <nuxt/>
    </v-content>
    <Snackbar/>
  </v-app>
</template>

<script>
  import ToolBar from "~/components/site/ToolBar.vue"
  import Snackbar from "~/components/Snackbar.vue"

  export default {
    head() {
      return {
        title: 'ورود',
        titleTemplate: 'پنل کاربری ' + _.get(this.$store.state, 'settings.data.site.siteTitle', '') + '- %s ',
        meta:
          [
            {name: 'keywords', content: "content"}
          ]
      }
    },
    components: {
      ToolBar,
      Snackbar
    },
    middleware: ["httpToHttps",],
    data() {
      return {
        title: ""
      }
    },
    computed: {}
  }
</script>
<style>
</style>
