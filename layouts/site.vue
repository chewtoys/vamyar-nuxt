<template>
  <v-app>
    <ToolBar/>
    <v-content>
      <v-container grid-list-lg fluid>
        <Breadcrumb/>
        <nuxt/>
        <Snackbar/>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>


<script>
  import Snackbar from "~/components/Snackbar.vue"
  import ToolBar from "~/components/site/ToolBar.vue"
  import Footer from "~/components/site/Footer.vue"
  import Breadcrumb from "~/components/site/Breadcrumb.vue"

  export default {
    head() {
      return {
        title: _.get(this.$store.state.navigation, 'title', ''),
        titleTemplate: _.get(this.$store.state, 'settings.data.site.siteTitle', '') + '- %s ',
        meta:
          [
            {
              name: 'keywords',
              content: _.get(this.$store.state, 'settings.data.site.siteKeywords', '') || " سایت وامیار, vamyar,وام,loan,درخواست ضامن آنلاین,فروش وام , درخواست سرمایه"
            },
            {
              name: 'description',
              content: _.get(this.$store.state, 'settings.data.site.siteDescription', '') || "سایت وامیار پلتفرم جامع خرید و فروش وام و ضامن و سرمایه"
            }
          ]
      }
    },
    middleware: ["updateSettings", "navigation", 'isSiteOpen'],

    components: {
      Breadcrumb,
      ToolBar,
      Footer,
      Snackbar
    }
  }
</script>
<style>
</style>
