<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
        <v-flex v-if="getChooseType" xs12 sm3 class="pa-1">
          <div>
            <v-select
              :items="getAdvertTypeList"
              v-model="filter.advertType"
              :loading="loading.advertType"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع آگهی"
              light
              clearable
              flat
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateAdvertType"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm3 class="pa-1">
          <div>
            <v-select
              :items="['همه','فقط فوری']"
              v-model="filter.instant"
              :loading="loading.instant"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="فوری"
              light
              flat
              clearable
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateInstant"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm3 class="pa-1">
          <div>
            <v-autocomplete
              :menu-props="{contentClass:'farsi mx-3'}"
              :loading="loading.city"
              :items="city_items"
              :search-input.sync="city_search"
              v-model="filter.city"
              append-icon="location_on"
              clearable
              light
              no-data-text="شهری یافت نشد"
              label="همه‌ی شهر ها"
              flat
              hide-no-data
              hide-details
              solo-inverted
              @change="updateCity"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm3 class="pr-1 pt-1 pb-1 pl-0">
          <div>
            <v-text-field
              v-model="filter.titleValue"
              :loading="loading.title"
              solo-inverted
              label="عنوان"
              append-icon="label"
              light
              flat
              clearable
              @change="emitToParent"
            />
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const cityMethod = '/cities?number=3000'

  export default {
    props: ['value', 'label', 'chooseType'],
    data() {
      return {
        loading: {
          advertType: false,
          title: false,
          instant: false,
          city: true,
        },
        filter: {
          advertType: null,
          advertTypeName: null,
          advertTypeValue: null,
          city: null,
          cityIdValue: null,
          instant: null,
          instantValue: null,
          titleValue: null,
        },
        city_search: null,
        city_items: [],
      }
    },
    computed: {
      getLabel() {
        return this.label;
      },
      getChooseType() {
        return this.chooseType || false;
      },
      getAdvertTypeList() {
        let list = Helper.getTypeByAlias();
        //return list;
        let titles = [];
        _.forEach(list, (item) => {
          titles.push(item.title)
        })
        return titles

      },
      city_states() {
        return _.get(this.$store.state, 'city.arrayList')
      },
    },
    watch: {
      city_search(val) {
        val && val !== this.filter.city && this.querySelections(val)
      },
    },
    mounted() {
      _.set(this.loading, 'city', true)
      _.forEach(this.value, (value, key) => {
        _.set(this, ['filter', key], value);
      })

      //load initial data - city
      this.$axios.$get(cityMethod).then(resp => {
        this.$store.commit('city/setAndProcessData', resp.data || []);
        _.set(this.loading, 'city', false)
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      updateAdvertType() {
        if (_.get(this, 'filter.advertType', false)) {
          let type = _.get(_.find(Helper.getTypeByAlias(), {'title': _.get(this, 'filter.advertType', false)}), 'type', 'loan');
          _.set(this, 'filter.advertTypeName', type);
          _.set(this, 'filter.advertTypeValue', type);
        }
        this.emitToParent();
      },
      updateInstant() {
        if (_.get(this, 'filter.instant', false)) {
          if (_.get(this, 'filter.instant', null) === 'فقط فوری') {
            _.set(this.filter, 'instantValue', 1);
          }
          else {
            _.set(this.filter, 'instantValue', null);
          }
        }
        this.emitToParent();
      },
      updateCity() {
        if (_.get(this, 'filter.city', false)) {
          let city = _.get(this, 'filter.city', false);
          if (city) {
            let list = _.get(this.$store.state, 'city.data', []);
            let index = _.findIndex(list, {'name': city});
            if (index > 0) {
              let item = list[index];
              let id = _.get(item, 'id', null);
              _.set(this.filter, 'cityIdValue', id);
            }
          }
        }
        this.emitToParent();
      },
      emitToParent() {
        this.$emit("change", this.filter);
        return this.$emit("input", this.filter);
      },
      // select the proper city
      querySelections(v) {
        _.set(this.loading, 'city', true)
        // Simulated ajax query

        this.city_items = this.city_states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
        })
        _.set(this.loading, 'city', false)
      },
    }
  }
</script>
