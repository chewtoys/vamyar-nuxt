<template>
  <v-container fluid grid-list-lg>
    <v-subheader>
      {{ title }}
    </v-subheader>
    <v-spacer/>

    <v-card color="transparent" flat>

      <v-card-text>
        <v-alert  :value="!!msg" type="warning">
          <span class="p-b--2">خطا: {{msg}}</span>
        </v-alert>
        <div class="text-xs-center">
          <v-progress-circular
            v-if="cardLoader"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-layout row wrap fluid>
          <v-flex v-for="item in data" :key="item.id" sm4 lg3 xs6>
            <AdvertCard :item="item"/>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="pl-3">
        <v-spacer/>
        <v-btn outline to="/categories" color="info ml-2" round>
          <span>همه ی آگهی ها</span>
          <v-icon>arrow_left</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  import AdvertCard from "~/components/site/adverts/Advert.vue"

  const path = "/site/adverts?include=advertable",
    title = "آخرین آگهی ها"
  export default {
    components: {AdvertCard},
    data() {
      return {
        cardLoader: true,
        msg: null,
        title,
        data: []
      }
    },
    mounted() {
      this.$axios.$get(path, {
        params: {include: "advertable,city,user.details", number: 12}
      }).then(res => {
        this.data = _.get(res, 'data', [])
        this.cardLoader = false;
      }).catch((err) => {
        console.log(err)
        this.msg = 'مشکلی در گرفتن آخرین آگهی ها پیش آمد.'
        this.$store.commit(
          "snackbar/setSnack",
          "مشکلی در گرفتن آگهی ها پیش آمد.",
          "error"
        )
        this.cardLoader = false;
      })

    }
  }
</script>
