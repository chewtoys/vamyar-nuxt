<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="amountList"
              v-model="filter.maxAmount"
              :loading="loading.maxAmount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حدود قیمت"
              light
              flat
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateMaxAmount"
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
          maxAmount: false
        },
        filter: {
          maxAmount: null,
          maxAmountValue: null
        },
      }
    },
    computed: {
      getLabel() {
        return this.label;
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

      updateMaxAmount() {
        let value = _.get(this, 'filter.maxAmount');
        let list = _.get(this.$store.state, 'settings.adverts.filters.amount', []);
        let index = _.findIndex(list, {'name': value});
        let amount = null;
        if (index > 0) {
          let item = list[index];
          amount = _.get(item, 'value', null);
        }
        _.set(this, 'filter.maxAmountValue', amount)
        this.emitToParent();
      },
      emitToParent() {
        this.$emit("change", this.filter);
        return this.$emit("input", this.filter);
      },
    }
  }
</script>
