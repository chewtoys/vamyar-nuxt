<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="typeList"
              v-model="type"
              :loading="loading.typeId"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع"
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
            <v-select
              :items="guaranteeTypesList"
              v-model="guaranteeTypes"
              :loading="loading.guaranteeTypes"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="ضمانت"
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

  const guaranteeMethod = '/guaranteeTypes'

  export default {
    props: ['value', 'label'],
    data() {
      return {
        type: null,
        guaranteeTypes: null,
        loading: {
          typeId: false,
          guaranteeTypes: false
        },
        filter: {
          guaranteeTypes: null,
          typeValue: null,
        },
      }
    },
    watch: {
      type(val) {
        let list = _.get(this.$store.state, 'settings.coSigner.types', []);
        let index = _.findIndex(list, {'name': val});
        let id = 0;
        if (index > 0) {
          let item = list[index];
          id = _.get(item, 'id', 0);
        }
        _.set(this, 'filter.loanTypeValue', id)
      },
      guaranteeTypes(val) {
        let list = _.get(this.$store.state, 'guaranteeType.data', []);
        let index = _.findIndex(list, {'name': val});
        let value = null;
        if (index > 0) {
          let item = list[index];
          value = _.get(item, 'id', null);
        }
        _.set(this, 'filter.guaranteeTypes', value)
      }
    },
    computed: {
      getLabel() {
        return this.label;
      },
      typeList() {
        return _.get(this.$store.state, 'settings.coSigner.typeArray')
      },
      guaranteeTypesList() {
        return _.get(this.$store.state, 'guaranteeType.arrayList', []);
      },
    },
    mounted() {
      _.forEach(this.value, (value, key) => {
        _.set(this, ['filter', key], value);
      })
      //load initial data
      // guaranteeMethod
      this.$axios.$get(guaranteeMethod).then(resp => {
        this.$store.commit('guaranteeType/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })

    },
    methods: {
      emitToParent() {
        this.$emit("change", this.filter);
        return this.$emit("input", this.filter);
      },

    }
  }
</script>
