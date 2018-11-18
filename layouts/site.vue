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
  import Snackbar from "~/components/Snackbar"
  import ToolBar from "~/components/site/ToolBar.vue"
  import Footer from "~/components/site/Footer.vue"
  import Breadcrumb from "~/components/site/Breadcrumb.vue"

  export default {
    head() {
      return {
        title: this.$store.state.navigation.title,
        titleTemplate: this.settings('site.siteTitle') + '- %s ',
        meta:
          [
            {
              name: 'keywords',
              content: this.settings('site.siteKeywords') || " سایت وامیار, vamyar,وام,loan,درخواست ضامن آنلاین,فروش وام , درخواست سرمایه"
            },
            {
              name: 'description',
              content: this.settings('site.siteDescription') || "سایت وامیار پلتفرم جامعه خرید و فروش وام و خدمات جانبی"
            }
          ]
      }
    },
    middleware: "navigation",
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
    },
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
