<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pr-1 pt-1 pb-1 pl-0">
          <div>
            <v-select
              :items="amountList"
              v-model="amount"
              :loading="loading.amount"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="حداکثر سرمایه"
              light
              flat
              hide-details
              solo-inverted
              append-icon="list"
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

  export default {
    props: ['value', 'label'],
    data() {
      return {
        amount: null,
        loading: {
          maxAmount: false,
        },
        filter: {
          maxAmount: null,
        },
      }
    },
    watch: {
      amount(val) {
        let list = _.get(this.$store.state, 'settings.adverts.filters.amountArray', []);
        let index = _.findIndex(list, {'name': val});
        let value = null;
        if (index > 0) {
          let item = list[index];
          value = _.get(item, 'value', null);
        }
        _.set(this, 'filter.maxAmount', value)
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
    },
    methods: {
      emitToParent() {
        return this.$emit("input", this.filter);
      },
    }
  }

</script>
