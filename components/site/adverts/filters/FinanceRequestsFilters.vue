<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex v-if="false" xs12 sm3 class="pr-1 pt-1 pb-1 pl-0">
          <div>
            <v-text-field
              v-model="filter.jobValue"
              :loading="loading.jobValue"
              solo-inverted
              label="شغل"
              append-icon="label"
              light
              flat
              clearable
              @change="emitToParent"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="amountList"
              item-text="name"
              item-value="value"
              v-model="filter.maxAmount"
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
        loading: {
          jobValue: false,
          maxAmount: false
        },
        filter: {
          jobValue: null,
          maxAmount: null,
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
        let value = _.get(this, 'maxAmount', null);
        if (_.has(value, 'min')) {
          _.set(this, 'filter.minMaxAmountValue', _.get(value, 'min', ''))
          _.set(this, 'filter.maxMaxAmountValue', _.get(value, 'max', value))
        } else {
          if (value === null) {
            _.set(this, 'filter.minMaxAmountValue', null)
            _.set(this, 'filter.maxMaxAmountValue', null)
          } else {
            _.set(this, 'filter.maxAmountValue', 0)
            _.set(this, 'filter.minMaxAmountValue', null)
            _.set(this, 'filter.maxMaxAmountValue', null)
          }
        }
        this.emitToParent();
      },
      emitToParent() {
        this.$emit("change", this.filter);
        return this.$emit("input", this.filter);
      },
    }
  }
</script>
