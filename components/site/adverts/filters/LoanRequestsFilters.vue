<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
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
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-text-field
              v-model="filter.paybackTime"
              :loading="loading.paybackTime"
              solo-inverted
              label="حداکثر مدت بازپرداخت"
              append-icon="label"
              light
              flat
              clearable
              @change="emitToParent"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm4 class="pr-1 pt-1 pb-1 pl-0">
          <div>
            <v-select
              :items="amountList"
              v-model="amount"
              :loading="loading.amount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حدود قیمت"
              light
              flat
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateAmount"
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
    props: ['value', 'label'],
    data() {
      return {
        loanType: null,
        amount: null,
        loading: {
          paybackTime: false,
          minAmount: false,
          maxAmount: false,
          instant: false,
          loanTypeId: false,
        },
        filter: {
          paybackTime: null,
          amount: null,
          minAmount: null,
          maxAmount: null,
          loanTypeId: null,
          instant: null,
          title: null,
        },
        city_search: null,
        city_items: [],


      }
    },
    watch: {
      loanType(val) {
        let list = _.get(this.$store.state, 'loanType.data', []);
        let index = _.findIndex(list, {'name': val});
        let id = 0;
        if (index > 0) {
          let item = list[index];
          id = _.get(item, 'id', 0);
        }
        _.set(this, 'filters.loanTypeId', id)
      },
      amount(val) {
        let list = _.get(this.$store.state, 'settings.adverts.filters.amountArray', []);
        let index = _.findIndex(list, {'name': val});
        let value = null;
        if (index > 0) {
          let item = list[index];
          value = _.get(item, 'value', null);
        }
        _.set(this, 'filters.amount', value)
      }
    },
    computed: {
      getLabel() {
        return this.label;
      },
      loanTypeList() {
        return _.get(this.$store.state, 'loanType.arrayList')
      },
      amountList() {
        let data = _.get(this.$store.state, 'settings.adverts.filters.amount', []);
        let all = _.map(data, function (owner) {
          return _.pick(owner, ['value', 'name'])
        });
        let arrayList = _.map(all, 'name');
        this.$store.commit('settings/setAmountArray', arrayList);
        return arrayList;
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
      updateAmount() {
        let value = _.get(this, 'filter.amount');
        let list = _.get(this.$store.state, 'settings.adverts.filters.amount', []);
        let index = _.findIndex(list, {'name': value});
        let amount = null;
        if (index > 0) {
          let item = list[index];
          amount = _.get(item, 'value', null);
        }
        _.set(this, 'filter.amountValue', amount)
        this.emitToParent();
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

  /*
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
   */
</script>
