<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-subheader>
        فیلتر کنید
      </v-subheader>
      <Filters v-model="filter"/>
    </v-flex>
    <v-flex xs12 sm12>
      <v-card color="transparent" flat>
        <v-container grid-list-lg fluid>
          <div v-if="loading">
            <v-progress-linear :indeterminate="loading"/>
          </div>
          <v-layout v-if="!loading" row wrap>
            <v-flex
              v-for="item in items"
              :key="item.id"
              :sm6="!!settings('adverts.isImageAllowed')"
              :sm4="!settings('adverts.isImageAllowed')"
              lg4
              xl2
            >
              <AdvertCard :item="item"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex v-if="paginator&&paginator.cursor && paginator.cursor.nextURL" xs12 sm12>
      <div class="my-5 text-xs-center">
        <v-btn :loading="btn_loading" round large outline color="info" @click="loadMore">
          <span><v-icon class="px-1">arrow_drop_down</v-icon>نمایش بیشتر</span>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
  //import axios from 'axios'
  // /site/adverts?advertableType=loan&include=advertable

  import ItemCard from "~/components/site/adverts/Loan.vue"
  import AdvertCard from "~/components/site/adverts/Advert.vue"
  import Filters from "~/components/site/adverts/Filters.vue"
  import Helper from "~/assets/js/helper.js"

  const number = 4

  export default {


    data() {
      return {
        filter: {},
        page: 1,
        size: "sm",
        paginator: {},
        loading: true,
        btn_loading: false,
      }
    }
    ,
    watch: {
      filter() {
        this.loadAgain(this.filter)
      }
    },
    // loading the first items from server
    async asyncData({app, store, params, error, $axios}) {
      let slug = params.slug
      let type = Helper.getTypeByAlias(slug)

      let method = `/site/adverts`
      let cursor
      cursor = 0

      const breadcrumb = Helper.getBreadcrumb(type.title),
        page_title = Helper.getPageTitle(type.title);
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
      store.commit("navigation/setTitle", page_title);

      let include = 'advertable,city,user.details';
      let filter = `advertableType=${type.advertType}`;

      let query = {
        number,
        include,
        filter
      }
      //console.log({query})

      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);


        let {data, paginator} = await
          app.$axios.$get(method, {
            params: query
          })
        let loading = false
        return {items: data, paginator, loading, type, slug}
      } catch (err) {
        console.log(err);
        //error({statusCode: 404, message: "این صفحه فعال نمی باشد."})
        return {items: [], paginator: [], loading: false, type, slug}
      }
    }
    ,
    computed: {

      // meta
      title: function () {
        return "مشاهده‌ی آگهی‌‌های" + this.type.title
      }
      ,
      breadcrumb: function () {
        return "مشاهده‌ی " + this.type.title
      }
    }

    ,
    // method used in page
    methods: {

      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
      ,
      // load more items
      loadMore: async function () {
        this.btn_loading = true
        try {

          let method = this.paginator.cursor.nextURL
          let {data, paginator} = await this.$axios.$get(method, {
            params: {number}
          })
          data.forEach((e, i) => {
            this.items.push(e)
          })

          this.btn_loading = false

          this.paginator = paginator
        } catch (err) {
          this.paginator.cursor.nextURL = false
          this.$store.commit("snackbar/setSnack", "آگهی بیشتری وجود ندارد.")
        }
        this.btn_loading = false
      }
      ,
      // reload as filter changed

      loadAgain(filters = {}) {

        this.loading = true
        this.items = []

        let method = `/site/adverts`
        let include = 'advertable,city,user.details';
        let filterArray = [`advertableType=${this.type.advertType}`]
        _.forEach(filters, function (value, key) {
          filterArray.push(`${key}=${value}`)
        })
        let filter = _.split(filterArray, '`');
        let query = {
          include,
          number,
          filter
        }
        console.log({query})
        this.$axios.$get(method, {
          params: query
        }).then(response => {
          console.log(response)
          this.items.push(_.get(response, 'data', []))
          this.paginator = _.get(response, 'paginator', [])
        }).catch((err) => {
          console.log(err)
          this.$store.commit(
            "snackbar/setSnack",
            "مشکلی در گرفتن آگهی ها پیش آمد."
          )
        })
        //this.items = data;
        this.loading = false
        return true
      }
    },
    components: {
      Filters,
      ItemCard,
      AdvertCard
    }
  }
</script>
