<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" color="transparent" light>

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
        sort: 'id:desc'
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
      updateLoanType() {
        let value = _.get(this, 'filter.loanType');
        let list = _.get(this.$store.state, 'loanType.data', []);
        let index = _.findIndex(list, {'name': value});
        if (index > 0) {
          let item = list[index];
          let id = _.get(item, 'id', 0);
          _.set(this, 'filter.loanTypeValue', id)
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
