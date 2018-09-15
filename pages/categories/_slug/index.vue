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
              <v-card class="elevation-0 pa-2" color="transparent" light>
                <v-layout rwo wrap>
                  <v-flex xs12 sm4 class="pa-1">
                    <div>
                      <v-select
                        :items="category_items"
                        v-model="category_search"
                        :loading="city_loading"
                        label="نوع وام"
                        :menu-props="{contentClass:'farsi mx-3'}"
                        light
                        flat
                        hide-details
                        solo-inverted
                        append-icon="list"
                      ></v-select>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm4 class="pa-1">
                    <div>
                      <v-autocomplete
                        :menu-props="{contentClass:'farsi mx-3'}"
                        append-icon="location_on"
                        :loading="city_loading"
                        :items="city_items"
                        :search-input.sync="city_search"
                        v-model="city_select"
                        clearable
                        light
                        no-data-text="شهری یافت نشد"
                        label="جست و جوی شهر"
                        flat
                        hide-no-data
                        hide-details
                        solo-inverted
                      ></v-autocomplete>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm4 class="pr-1 pt-1 pb-1 pl-0">
                    <div>
                      <v-text-field
                        v-on:change="loadAgain()"
                        solo-inverted
                        v-model="title_search"
                        label="عنوان"
                        append-icon="label"
                        :loading="title_loading"
                        light
                        flat
                        clearable
                      ></v-text-field>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12>
              <div class="ltr">
                <v-range-slider
                  v-on:change="loadAgain()"
                  :tick-labels="range_labels"
                  v-model="range_search"
                  :min="range_search_min"
                  :max="range_search_max"
                  thumb-label
                  class="ltr"
                  light
                  thumb-size="100"
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

      <v-subheader>
        لیست آگهی ها
        {{type.title}}
      </v-subheader>
      <v-card color="transparent" flat>
        <v-container grid-list-lg fluid>
          <div v-if="loading">
            <v-progress-linear :indeterminate="loading"></v-progress-linear>
          </div>
          <v-layout v-if="!loading" row wrap>
            <v-flex
              v-for="item in items"
              :key="item.id"
              sm6
              lg4
              xl2
            >
              <AdvertCard :item="item"></AdvertCard>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 v-if="paginator&&paginator.cursor && paginator.cursor.nextURL">
      <div class="my-5 text-xs-center">
        <v-btn round large outline color="info" @click="loadMore" :loading="btn_loading">
          <span><v-icon class="px-1">arrow_drop_down</v-icon>نمایش بیشتر</span>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
  //import axios from 'axios'
  // /site/adverts?advertableType=loan&include=advertable

  import ItemCard from '~/components/site/adverts/Loan.vue'
  import AdvertCard from '~/components/site/adverts/Advert.vue'
  import Helper from '~/assets/js/helper.js'

  const
    number = 4,
    include = "advertable"

  export default {

    meta: function () {
      return {
        title: this.title,
        breadcrumb: this.breadcrumb
      }
    }
    ,
    data() {
      return {
        // meta
        title: 'Ti',
        breadcrumb: 'Br',
        page: 1,
        size: 'sm',
        paginator: {},
        loading: true,
        btn_loading: false,
        city_items: [],
        range_loading: false,
        range_search_min: 0,
        category_items: ['همه', 'دسته بندی اول', 'دسته بندی دوم', 'دسته بندی سوم', 'دسته بندی چهارم'],
        category_search: null,
        range_labels: ['کمترین', 'تا 10 میلیون ', 'تا 50 میلیون', 'تا 500 میلیون', 'بیشتر از 500 میلیون'],
        range_search_max: 4,
        range_search: [0, 4],
        range_values: [0, 10e7, 50 * 10e7, 500 * 10e7, 10e15],
        city_loading: false,
        city_search: null,
        city_select: null,
        title_loading: false,
        title_search: null,
        city_states: [
          'قم',
          'تهران'
        ]
      }
    }
    ,

    // loading the first items from server
    async asyncData({app, params, error}) {
      let slug = params.slug;
      let type = Helper.getTypeByAlias(slug);

      let method = `/site/${slug}`;
      let cursor, must
      cursor = 0;

      if (!must) {
        must = 'advertableType=' + type.type + ',verified=true'
      }

      let query = {
        number,
        include,
        must
      };

      try {
        let {data, paginator} = await app.$axios.$get(method, {
          params: query
        });
        let loading = false;
        return {items: data, paginator, loading, type, slug}
      } catch (err) {
        error({statusCode: 404, message: 'این صفحه فعال نمی باشد.'})
        return {items: [], paginator: [], loading: false, type, slug}
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
        this.title_loading = true;
        setTimeout(() => {
          this.title_loading = false;
        }, 3000)
      }
    }
    ,
    // method used in page
    methods: {
      // select the proper city
      querySelections(v) {
        this.city_loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.city_items = this.city_states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          });
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

        this.btn_loading = true;
        try {
          let method = this.paginator.cursor.nextURL;
          let {data, paginator} = await this.$axios.$get(method, {params: {number}});
          data.forEach((e, i) => {
            this.items.push(e);
          })

          this.btn_loading = false;

          this.paginator = paginator;
        } catch (err) {
          this.paginator.cursor.nextURL = false;
          this.$store.commit('snackbar/setSnack', 'آگهی بیشتری وجود ندارد.');
        }
        this.btn_loading = false;
      }
      ,

      // reload as filter changed

      async loadAgain() {

        this.loading = true;
        this.items = [];

        let range = this.range_search;
        let min = this.range_values[range[1]], max = this.range_values[range[0]];
        let city = this.city_search;
        let city_key = this.city_search;
        let title = this.title_search;

        let method = `/site/${this.slug}`;
        let advertableType = this.type.type;
        let cursor, must
        cursor = 0;

        if (!must) {
          must = 'city=' + advertableType + ',amount>' + min - 1 + ',amount<' + max + 1
        }

        let query = {
          number,
          must
        };
        //if (this.$store.state.debug) console.log(query)

        try {
          let {data, paginator} = await
            this.$axios.$get(method, {
              params: query
            });
        } catch (err) {
          let data = [], paginator = []
          this.store.commit('snackbar/setSnack', 'مشکلی در گرفتن آگهی ها پیش آمد.')
        }

        this.items.push(data);
        //this.items = data;
        this.loading = false;

        this.paginator = paginator;
        return true;

      }
    }
    ,
    computed: {
      // meta
      ttitle: function () {
        return 'مشاهده‌ی آگهی‌‌های' + this.type.title;
      }
      ,
      bbreadcrumb: function () {
        return 'مشاهده‌ی ' + this.type.title
      }
    }
    ,
    components: {
      ItemCard, AdvertCard
    }
  }
</script>
