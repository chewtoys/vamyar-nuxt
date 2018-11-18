<template>
  <v-app>
    <nuxt/>
  </v-app>
</template>

<script>
import ToolBar from "~/components/admin/ToolBar.vue"
export default {
  components: {
    ToolBar
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
