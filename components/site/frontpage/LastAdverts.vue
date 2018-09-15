<template>
  <v-container fluid grid-list-lg>
    <v-subheader>
      {{title}}
    </v-subheader>
    <v-spacer></v-spacer>

    <v-card color="transparent" flat>
      <v-card-text>
        <v-layout row wrap fluid>
          <v-flex sm4 lg3 xs6 v-for="item in data" :key="item.id">
            <AdvertCard :item="item"></AdvertCard>
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
  import AdvertCard from '~/components/site/adverts/Advert.vue'

  const path = '/site/adverts', title = "آخرین آگهی ها"
  export default {
    data() {
      return {
        title,
        data: []
      }
    },
    components: {AdvertCard},
    async mounted() {
      try {
        this.data = await this.$axios.$get(path, {params: {include: 'advertable', number: 12}})
      } catch (err) {
        this.store.commit('snackbar/setSnack', 'مشکلی در گرفتن آگهی ها پیش آمد.', 'error')
        this.data = [];
      }
    }
  }
</script>
