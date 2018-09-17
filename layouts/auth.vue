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
  components: {
    ToolBar,
    Snackbar
  },
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
