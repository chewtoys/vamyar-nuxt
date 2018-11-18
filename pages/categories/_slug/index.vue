<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-subheader>
        فیلتر کنید
      </v-subheader>
      <v-card class="pa-5" light color="grey lighten-4">
        <div class="text-xs-right">
          <v-layout row wrap inverse>
            <v-flex xs12 md12>
              <Filters/>
            </v-flex>
            <v-flex xs12 sm12 v-if="getFilter('amount')">
              <div class="ltr">
                <v-range-slider
                  :tick-labels="range_labels"
                  v-model="range_search"
                  :min="range_search_min"
                  :max="range_search_max"
                  thumb-label
                  class="ltr"
                  light
                  thumb-size="100"
                  @change="loadAgain()"
                >
                  <template
                    slot="thumb-label"
                    slot-scope="props"
                  >
                    <span>
                      {{ rangeLabels(4 - props.value) }}
                    </span>
                  </template>
                </v-range-slider>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
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

  const number = 4,
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'


  export default {


    data() {
      return {


        page: 1,
        size: "sm",
        paginator: {},
        loading: true,
        btn_loading: false,
        city_items: [],
        range_loading: false,
        range_search_min: 0,
        category_items: [
          "همه",
          "دسته بندی اول",
          "دسته بندی دوم",
          "دسته بندی سوم",
          "دسته بندی چهارم"
        ],
        category_search: null,
        range_labels: [
          "کمترین",
          "تا 10 میلیون ",
          "تا 50 میلیون",
          "تا 500 میلیون",
          "بیشتر از 500 میلیون"
        ],
        range_search_max: 4,
        range_search: [0, 4],
        range_values: [0, 10e7, 50 * 10e7, 500 * 10e7, 10e15],
        city_loading: false,
        city_search: null,
        city_select: null,
        title_loading: false,
        title_search: null,

      }
    }
    ,
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

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);

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
      city_states() {
        let states = _.get(this.$store.state, 'city.arrayList')
        return states
      },

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
    // watch if city changed
    watch: {
      city_search(val) {
        val && val !== this.city_select && this.querySelections(val)
      }
      ,
      title_search(val) {
        this.title_loading = true
        setTimeout(() => {
          this.title_loading = false
        }, 3000)
      }, instant(val) {
        this.instantLoading = true
        setTimeout(() => {
          this.instantLoading = false
        }, 3000)
      }
    }
    ,
    // method used in page
    methods: {
      getFilter(type, filter = null) {
        return _.get(Helper.getFiltersByType, [type, filter], false);
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      city: function () {
        if (this.allCities) return 0;
        let list = this.$store.state.city.data;
        let index = _.findIndex(list, {'name': this.cityName});
        let item = list[index];
        return _.get(item, 'id', 0);
      },
      // select the proper city
      querySelections(v) {
        this.city_loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.city_items = this.city_states.filter(e => {
            return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          })
          this.city_loading = false
        }, 200)
      }
      ,
      rangeLabels(val) {
        return this.range_labels[val]
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

      loadAgain() {
        this.loading = true
        this.items = []

        let range = this.range_search
        let min = this.range_values[range[1]],
          max = this.range_values[range[0]]
        let city = this.city_search
        let city_key = this.city_search
        let title = this.title_search
        let method = `/site/adverts`
        let cursor = 0
        let include = 'advertable,city,user.details';
        let filter = `advertableType=${this.type.advertType}`;
        let query = {
          include,
          number,
          filter
        }
        //console.log({query})
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
