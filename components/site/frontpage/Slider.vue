<template>
  <v-container fluid>
    <v-subheader>
      {{title}}
    </v-subheader>
    <v-card class="full">
      <no-ssr>
        <siema auto-play ref="siema" class="siema" :options="options">
          <v-card class="slide" v-for="item in data" :key="item">
            <AdvertCard :item="item"></AdvertCard>
          </v-card>
        </siema>
      </no-ssr>
    </v-card>
  </v-container>
</template>
<script>

  import AdvertCard from '~/components/site/adverts/Advert.vue'

  const path = '/site/adverts', title = 'آگهی‌های فوری'
  export default {
    components: {AdvertCard},
    async mounted() {
      try {
        this.data = await this.$axios.$get(path, {params: {include: 'advertable'}})
      } catch (err) {
        this.store.commit('snackbar/setSnack', 'مشکلی در گرفتن آگهی ها پیش آمد.', 'error')
        this.data = [];
      }
    }
    ,
    data() {
      return {
        data: [],
        title,
        img: 'http://placehold.it/2000x1000',
        options: {
          draggable: true,
          loop: true,
          duration: 200,
          easing: 'ease-out',
          perPage: 3,
          startIndex: 0,
          multipleDrag: true,
          threshold: 20,
          rtl: true,
        }
      }
    }
  }

</script>

<style>
  .wrp {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .slide {
    max-height: 600px;
    background: #ccc;
  }

</style>
