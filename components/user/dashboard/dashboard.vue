<template>
  <v-container grid-list>
    <v-layout row wrap>
      <v-flex xs12>
        <v-progress-linear v-if="loader" :indeterminate="true"/>
        <AdvertCard v-if="!loader" :items="adverts"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AdvertCard from "~/components/user/dashboard/advert.vue"

const path = "/user/adverts"
export default {
  components: { AdvertCard },
  data() {
    return {
      loader: false,
      rawData: [],
      rawAdverts: []
    }
  },
  computed: {
    adverts() {
      return this.rawData
    }
  },
  mounted() {
    this.loader = true

    return this.$axios
      .get(path)
      .then(response => {
        return {
          rawData: response.data,
          loader: false
        }
      })
      .catch(err => {
        this.$store.commit("snackbar/setSnack", err.message)
        return {
          rawData: [],
          loader: false
        }
      })
  }
}
</script>
