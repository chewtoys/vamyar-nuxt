<template>
  <v-app>
    <Toolbar/>
    <nuxt/>
  </v-app>
</template>
<script>
  import Toolbar from "~/components/site/ToolBar.vue"

  export default {
    head() {
      return {
        title: this.$store.state.navigation.title,
        titleTemplate: _.get(this.$store.state, 'settings.data.site.siteTitle', ''),
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
    components: {Toolbar},
    computed: {},
    middleware: ['isSiteOpen']
  }
</script>
