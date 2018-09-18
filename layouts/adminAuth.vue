<template>
  <v-app>
    <nuxt/>
    <v-footer>
      <div class="footer">
        <nuxt-link to="/">خانه</nuxt-link>
      </div>
    </v-footer>
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
