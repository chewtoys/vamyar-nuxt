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
      title: this.$store.state.navigation.title
    }
  },
  middleware: "navigation",
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
