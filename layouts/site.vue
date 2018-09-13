<template>
  <v-app>
    <ToolBar/>
    <v-content>
      <v-container fluid>
        <Breadcrumb/>
        <nuxt/>
        <Snackbar/>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>


<script>
  import Snackbar from '~/components/Snackbar'
  import ToolBar from '~/components/site/ToolBar.vue';
  import Footer from '~/components/site/Footer.vue';

  export default {
    components: {
      ToolBar,
      Footer,
      Snackbar
    }
  }
</script>
<style>

</style>
