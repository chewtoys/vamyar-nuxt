<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="amountList"
              item-text="name"
              item-value="value"
              v-model="maxAmount"
              :loading="loading.maxAmount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حداکثر سرمایه"
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
        maxAmount: '',
        loading: {
          maxAmount: false
        },
        filter: {
          maxAmountValue: null,
          maxMaxAmountValue: null,
          minMaxAmountValue: null,
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
        return data;
      },
    },

    watch: {
      value(filters) {
        //console.log('start filter')
        _.forEach(filters, (val, key) => {
          // console.log('filter - watch) ', val, key)
          if (key === 'amount') {
            _.set(this, 'amount', val)
          }
        })
      }
    },
    mounted() {
      //load initial data - loanTypes
      this.$axios.$get(loanTypeMethod).then((resp) => {
        this.$store.commit('loanType/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {

      updateMaxAmount(value) {
        _.set(this, 'filter.maxAmountValue', null)
        _.set(this, 'filter.minMaxAmountValue', null)
        _.set(this, 'filter.maxMaxAmountValue', null)

        if (_.has(value, 'min') || _.has(value, 'max')) {
          _.set(this, 'filter.minMaxAmountValue', _.get(value, 'min', null))
          _.set(this, 'filter.maxMaxAmountValue', _.get(value, 'max', null))
        } else if (_.isNumber(value)) {
          _.set(this, 'filter.maxAmountValue', value)
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
