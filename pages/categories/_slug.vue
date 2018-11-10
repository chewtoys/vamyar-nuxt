<template>
  <v-container grid-list fluid>
    <nuxt-child :key="$route.params.slug"/>
  </v-container>
</template>
<script>
  import Helper from "~/assets/js/helper.js"

  export default {
    meta: {
      title: 'آگهی ها',
      breadcrumb: 'آگهی ها'
    },
    computed: {}
  }
</script>
