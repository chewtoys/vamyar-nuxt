<template>
  <v-flex xs12 md12>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="['همه','فقط فوری']"
              v-model="filter.instant"
              :loading="loading.instant"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="فوری"
              light
              flat
              hide-details
              solo-inverted
              append-icon="list"
              @change="emitToParent"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm4 class="pa-1">
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
              label="جست و جوی شهر"
              flat
              hide-no-data
              hide-details
              solo-inverted
              @change="emitToParent"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm4 class="pr-1 pt-1 pb-1 pl-0">
          <div>
            <v-text-field
              v-model="filter.title"
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
    props: ['value'],
    data() {
      return {
        loading: {
          title: false,
          instant: false,
          city: true,
        },
        filter: {
          city: null,
          instant: null,
          title: null,
        },
        city_search: null,
        city_items: [],
      }
    },
    computed: {
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
      emitToParent() {
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
