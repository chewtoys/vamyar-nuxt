<template>
  <v-container fluid grid-list-lg>
    <v-subheader>
      {{ getTitle }}
    </v-subheader>
    <v-spacer/>

    <v-card color="transparent" flat>

      <v-card-text>
        <v-alert v-if="!showPremium" :value="!!msg " type="warning">
          <span class="p-b--2">خطا: {{msg}}</span>
        </v-alert>
        <v-alert v-if="showPremium" :value="!!msg" type="success">
          <span class="p-b--2">{{msg}}</span>
          <v-spacer/>
          <v-btn color="warning" :to="premiumLink">
            <v-icon class="px-1">shopping_cart</v-icon>
            خرید سریع اشتراک
          </v-btn>
          <v-btn to="/pages/plans">
            <v-icon class="px-1">list</v-icon>
            پلن ها
          </v-btn>
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
        <v-btn outline :to="getLink" color="info ml-2" round>
          <span>همه ی آگهی های این مجموعه</span>
          <v-icon>arrow_left</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  import AdvertCard from "~/components/site/adverts/Advert.vue"

  const
    path = "/site/adverts",
    link = "/categories",
    title = "آخرین آگهی ها",
    number = 12

  export default {
    props: ['title', 'path', 'number', 'link'],
    components: {AdvertCard},
    data() {
      return {
        showPremium: false,
        cardLoader: true,
        msg: null,
        data: []
      }
    },
    computed: {
      getLink() {
        return this.link || link
      },
      getTitle() {
        return this.title || title
      },
      getPath() {
        return this.path || path
      },
      getNumber() {
        return this.number || number
      },
      premiumLink() {
        return `/user/premium?redirect=${decodeURI(this.link)}`
      }
    },
    mounted() {
      this.$axios.$get(this.getPath, {
        params: {include: "advert,advert.city,advert.user.details", number: this.getNumber}
      }).then(res => {
        this.data = _.get(res, 'data', [])
        this.cardLoader = false;
      }).catch((err) => {
        let code = _.get(err, 'response.status', 404);

        if (code === 404) this.msg = ' چیزی یافت نشد!'
        if (code === 401 || code === 403) {
          this.msg = 'برای دین این آگهی ها باید اشتراک فعال داشته باشید.'
          this.showPremium = true;
        }

        this.cardLoader = false;
      })

    }
  }
</script>
