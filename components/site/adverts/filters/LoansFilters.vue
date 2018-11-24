<template>
  <v-flex xs12 md12>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 class="pa-1">
          <div>
            <v-range-slider
              v-if="false"
              :tick-labels="range_labels"
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
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="loanTypeList"
              v-model="loanType"
              :loading="loading.loanTypeId"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع وام"
              light
              flat
              hide-details
              solo-inverted
              append-icon="list"
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

  const loanTypeMethod = '/loanTypes'

  export default {
    props: ['value'],
    data() {
      return {
        loanType: null,
        loading: {
          minAmount: 0,
          maxAmount: 10000,
          instant: false,
          loanTypeId: false,
        },
        filter: {
          loanTypeId: null,
          instant: null,
          title: null,
        },
        city_search: null,
        city_items: [],

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

      }
    },
    watch: {
      loanType(val) {
        let list = _.get(this.$store.state, 'loanType.data', []);
        let index = _.findIndex(list, {'name': this.loanTypeName});
        let id;
        if (index > 0) {
          let item = list[index];
          id = _.get(item, 'id', 0);
        }
        id = 0;
      }
    },
    computed: {
      loanTypeList() {
        return _.get(this.$store.state, 'loanType.arrayList')
      },
    },
    mounted() {
      _.forEach(this.value, (value, key) => {
        _.set(this, ['filter', key], value);
      })
      //load initial data - loanTypes
      this.$axios.$get(loanTypeMethod).then((resp) => {
        this.$store.commit('loanType/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })

    },
    methods: {
      rangeLabels(val) {
        return this.range_labels[val]
      },
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
