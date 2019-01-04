<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-text-field
              v-model="filter.paybackTimeValue"
              :loading="loading.paybackTime"
              solo-inverted
              hint="سال به عدد"
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
              item-text="name"
              item-value="value"
              v-model="amount"
              :loading="loading.amount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حدود مبلغ وام"
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
          amount: false,
          instant: false,
          loanType: false,
        },
        filter: {
          paybackTimeValue: null,
          minAmountValue: null,
          maxAmountValue: null,
          loanTypeIdValue: null,
        },
        city_search: null,
        city_items: [],

      }
    },
    computed: {
      getLabel() {
        return this.label;
      },
      loanTypeList() {
        return _.get(this.$store.state, 'loanType.data')
      },
      amountList() {
        let data = _.get(this.$store.state, 'settings.adverts.filters.amount', []);
        let all = _.map(data, function (owner) {
          return _.pick(owner, ['value', 'name'])
        });
        let arrayList = _.map(all, 'name');
        this.$store.commit('settings/setAmountArray', arrayList);
        return data;
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
        let value = _.get(this, 'amount', null);
        _.set(this, 'filter.amountValue', null)
        if (_.has(value, 'min')) {
          _.set(this, 'filter.minAmountValue', _.get(value, 'min', null) || null)
          _.set(this, 'filter.maxAmountValue', _.get(value, 'max', null) || null)
        } else {
          if (value === null) {
            _.set(this, 'filter.minAmountValue', null)
            _.set(this, 'filter.maxAmountValue', null)
          } else {
            _.set(this, 'filter.amountValue', 0)
            _.set(this, 'filter.minAmountValue', null)
            _.set(this, 'filter.maxAmountValue', null)
          }
        }
        this.emitToParent();
      },
      emitToParent() {
        let query = {}
        _.forEach(this.filter, (val, title) => {
          if (val || _.isNumber(val)) _.set(query, title, val)
        })
        this.$emit("change", query);
        return this.$emit("input", query);
      },
    }
  }

</script>
