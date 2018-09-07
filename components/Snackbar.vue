<template>
  <v-snackbar
    v-model="show"
    color="red"
    :multi-line="true"

    :timeout="3000"
    :vertical="true"
  >
    {{message}}
    <v-btn dark
           flat color="red" @click.native="show = false">بستن
    </v-btn>
  </v-snackbar>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        message: ''
      }
    }
  }
</script>
