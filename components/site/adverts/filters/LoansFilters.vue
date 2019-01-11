<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-autocomplete
              :items="loanTypeList"
              item-text="name"
              item-value="id"
              v-model="filter.loanTypeIdValue"
              :loading="loading.loanType"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع وام"
              light
              flat
              clearable
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
              v-model="filter.paybackTimeValue"
              :loading="loading.paybackTime"
              solo-inverted
              label="حداکثر مدت بازپرداخت"
              append-icon="label"
              hint="سال به عدد"
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
              item-text="name"
              item-value="value"
              :loading="loading.amount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حدود مبلغ وام"
              light
              flat
              clearable
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
        amount: [],
        loading: {
          paybackTime: false,
          loanType: false,
          amount: false
        },
        filter: {
          paybackTimeValue: null,
          amountValue: null,
          minAmountValue: null,
          maxAmountValue: null,
          loanType: null,
          loanTypeIdValue: null,
        },

      }
    },
    computed: {
      getTypeOfLoan() {
        return !!this.typeOfLoan;
      },
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
      updateAmount(value) {
        _.set(this, 'filter.amountValue', null)
        _.set(this, 'filter.minAmountValue', null)
        _.set(this, 'filter.maxAmountValue', null)

        if (_.has(value, 'min') || _.has(value, 'max')) {
          _.set(this, 'filter.minAmountValue', _.get(value, 'min', null) || null)
          _.set(this, 'filter.maxAmountValue', _.get(value, 'max', null) || null)
        }
        if (_.isNumber(value)) {
          _.set(this, 'filter.amountValue', value)
        }
        this.emitToParent();
      },
      emitToParent() {
        let query = {}

        setTimeout(() => {
          _.forEach(this.filter, (val, title) => {
            if (val || _.isNumber(val)) _.set(query, title, val)
          })
          this.$emit("change", query);
          return this.$emit("input", query);
        }, 30);

      },
    }
  }
</script>
