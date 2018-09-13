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
  import ToolBar from '~/components/site/ToolBar.vue';
  import Snackbar from '~/components/Snackbar.vue'

  export default {
    data() {
      return {
        title: ""
      }
    },
    components: {
      ToolBar, Snackbar
    },
    computed: {}
  }
</script>
<style>

</style>
