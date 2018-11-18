<template>
  <v-card class="pa-5" light color="grey lighten-4">
    <div class="text-xs-right">
      <v-layout row wrap inverse>
        <v-flex xs12 md12>

          <v-card class="elevation-0 pa-2" color="transparent" light>
            <v-layout rwo wrap>
              <v-flex xs12 sm4 class="pa-1">
                <div>
                  <v-select
                    :items="['همه','فقط فوری']"
                    v-model="isInstant"
                    :loading="instantLoading"
                    :menu-props="{contentClass:'farsi mx-3'}"
                    label="فوری"
                    light
                    flat
                    hide-details
                    solo-inverted
                    append-icon="list"
                  />
                </div>
              </v-flex>
              <v-flex xs12 sm4 class="pa-1">
                <div>
                  <v-autocomplete
                    :menu-props="{contentClass:'farsi mx-3'}"
                    :loading="city_loading"
                    :items="city_items"
                    :search-input.sync="city_search"
                    v-model="city_select"
                    append-icon="location_on"
                    clearable
                    light
                    no-data-text="شهری یافت نشد"
                    label="جست و جوی شهر"
                    flat
                    hide-no-data
                    hide-details
                    solo-inverted
                  />
                </div>
              </v-flex>
              <v-flex xs12 sm4 class="pr-1 pt-1 pb-1 pl-0">
                <div>
                  <v-text-field
                    v-model="title_search"
                    :loading="title_loading"
                    solo-inverted
                    label="عنوان"
                    append-icon="label"
                    light
                    flat
                    clearable
                    @change="chargeValue()"
                  />
                </div>
              </v-flex>
            </v-layout>
          </v-card>

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
              @change="chargeValue()"
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
</template>
<script>
  import Helper from "~/assets/js/helper.js"

  const cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'


  export default {
    props: ["value"],
    data() {
      return {
        title: '',
        isInstant: 0,
        instantLoading: false,
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
    },
    computed: {
      city: {
        get() {
          if (this.allCities) return 0;
          let list = this.$store.state.city.data;
          let index = _.findIndex(list, {'name': this.cityName});
          let item = list[index];
          return _.get(item, 'id', 0);
        },
        set(val) {

        }
      },
      city_states() {
        let states = _.get(this.$store.state, 'city.arrayList')
        return states
      },
    },
    methods: {
      chargeValue() {
        let filedList = ['title', 'city'];
        let filterList = {}
        _.forEach(filedList, (key) => {
          _set(filterList, key, _.get(this, key))
        })
        this.value = filterList;
      },
      getFilter(type, filter = null) {
        return _.get(Helper.getFiltersByType, [type, filter], false);
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
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
      }, rangeLabels(val) {
        return this.range_labels[val]
      }
      ,
    },
    mounted() {
      // city
      this.$axios.$get(cityMethod).then(resp => {
        this.$store.commit('city/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })

      this.$axios.$get(guaranteeMethod).then(resp => {
        this.$store.commit('guaranteeType/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })

      this.$axios.$get(loanTypeMethod).then((resp) => {
        this.$store.commit('loanType/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })

    },
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
  }


</script>
