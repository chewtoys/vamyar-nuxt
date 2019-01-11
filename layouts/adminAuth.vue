<template>
  <v-app>
    <nuxt/>
  </v-app>
</template>

<script>
  import ToolBar from "~/components/admin/ToolBar.vue"

  export default {
    head() {
      return {
        title: 'ورود',
        titleTemplate: 'پنل مدیریت ' + _.get(this.$store.state, 'settings.data.site.siteTitle', '') + '- %s ',
        meta:
          [
            {name: 'keywords', content: "content"}
          ]
      }
    },
    components: {
      ToolBar
    },
    data() {
      return {
        title: ""
      }
    },
    middleware: ["httpToHttps",],
    computed: {}
  }
</script>
<style>
</style>
