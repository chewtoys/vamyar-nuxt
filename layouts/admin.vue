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
  import Breadcrumb from "~/components/admin/Breadcrumb.vue"
  import ToolBar from "~/components/admin/ToolBar.vue"
  import Drawer from "~/components/admin/Drawer.vue"
  import Snackbar from "~/components/Snackbar.vue"

  export default {
    head() {
      return {
        title: this.$store.state.navigation.title
      }
    },
    middleware: ["adminAuthenticated", "navigation"],
    components: {
      ToolBar,
      Drawer,
      Breadcrumb,
      Snackbar
    }
  }
</script>
