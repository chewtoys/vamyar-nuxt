<template>
  <span>
    <no-ssr>
    <span>
    <v-snackbar
      v-model="show"
      :color="color"
      :multi-line="true"
      :vertical="true"
    >
      {{ message }}
      <v-btn dark flat @click.native="show = false">بستن
      </v-btn>
    </v-snackbar>
      </span>
     </no-ssr>
    </span>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        color: "primary",
        message: ""
      }
    },
    created: function () {
      this.$store.watch(
        state => state.snackbar.snack,
        () => {
          const msg = this.$store.state.snackbar.snack
          if (msg !== "") {
            this.show = true
            this.message = this.$store.state.snackbar.snack
            this.color = this.$store.state.snackbar.color
            this.$store.commit("snackbar/setSnack", "")
          }
        }
      )
    }
  }
</script>
