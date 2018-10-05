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
        title: this.$store.state.navigation.title
      }
    },
    middleware: ["authenticated", "navigation"],
    components: {
      ToolBar,
      Footer,
      Breadcrumb,
      Snackbar,
      Drawer
    }
  }
</script>
