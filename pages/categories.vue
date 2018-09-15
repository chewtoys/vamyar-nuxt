<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
  const title = 'صفحه نخست', breadcrumb = 'صفحه نخست'
  export default {
    meta: {
      title,
      breadcrumb,
      link: this.link
    },
    mounted() {
      this.link = window.location;
    },
    layout: 'site'
  }
</script>
