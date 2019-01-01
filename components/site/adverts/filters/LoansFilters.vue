<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="loanTypeList"
              v-model="filter.loanType"
              :loading="loading.loanType"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع وام"
              light
              flat
              clearable
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateLoanType"
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
              v-model="filter.amount"
              item-text="name"
              item-value="value"
              :loading="loading.amount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حدود قیمت"
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
        amount: '',
        loading: {
          paybackTime: false,
          loanType: false,
          amount: false
        },
        filter: {
          paybackTimeValue: null,
          amount: null,
          amountValue: null,
          loanType: null,
          loanTypeValue: null,
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
        return _.get(this.$store.state, 'loanType.arrayList')
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
      updateLoanType() {
        let value = _.get(this, 'amount', null);
        if (_.has(value, 'min')) {
          _.set(this, 'filter.minAmountValue', _.get(value, 'min', ''))
          _.set(this, 'filter.maxAmountValue', _.get(value, 'max', value))
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
        this.$emit("change", this.filter);
        return this.$emit("input", this.filter);
      },
    }
  }
</script>
