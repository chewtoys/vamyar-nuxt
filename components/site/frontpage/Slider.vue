<template>
  <v-container fluid>
    <v-subheader>
      {{ title }}
    </v-subheader>
    <v-card class="full">
      <no-ssr>
        <siema ref="siema" :options="options" auto-play class="siema">
          <v-card v-for="item in data" :key="item" class="slide">
            <AdvertCard :item="item"/>
          </v-card>
        </siema>
      </no-ssr>
    </v-card>
  </v-container>
</template>
<script>
  import AdvertCard from "~/components/site/adverts/Advert.vue"

  const path = "/site/adverts",
    title = "آگهی‌های فوری"
  export default {
    components: {AdvertCard},
    data() {
      return {
        msg: null,
        data: [],
        title,
        img: "http://placehold.it/2000x1000",
        options: {
          draggable: true,
          loop: true,
          duration: 200,
          easing: "ease-out",
          perPage: 3,
          startIndex: 0,
          multipleDrag: true,
          threshold: 20,
          rtl: true
        }
      }
    },
    mounted() {
      this.$axios.$get(path, {
        params: {include: "advertable,city,user.details", number: 12}
      }).then(res => {
        this.data = _.get(res, 'data', [])
      }).catch((err) => {
        console.log(err)
        this.msg = 'مشکلی در گرفتن آخرین آگهی ها پیش آمد'
        this.$store.commit(
          "snackbar/setSnack",
          "مشکلی در گرفتن آگهی ها پیش آمد.",
          "error"
        )
      })
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
