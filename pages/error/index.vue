<template>
  <div>
    <v-card>
      <v-card-title>
        خطا
      </v-card-title>
      <v-card-text>
        {{error}}
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        error: 'متاسفانه مشکلی رخ داد :('
      }
    },
    layout: 'site'
  }
</script>
