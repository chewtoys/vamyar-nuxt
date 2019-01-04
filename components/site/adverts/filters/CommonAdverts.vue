<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12>
        </v-flex>
        <v-flex v-if="getChooseType" xs12 sm4 class="pa-1">
          <div>
            <v-select
              :items="getAdvertTypeList"
              v-model="filter.advertType"
              :loading="loading.advertType"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع آگهی"
              light
              clearable
              flat
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateAdvertType"
            />
          </div>
        </v-flex>
        <v-flex v-if="!isAdmin" xs12 sm3 class="pa-1 ">
          <div>
            <v-text-field

              v-model="filter.search"
              :loading="loading.search"
              solo-inverted
              label="جست و جو"
              append-icon="label"
              light
              flat
              clearable
              @change="updateSearch"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm2 class="pa-1">
          <div>
            <v-autocomplete
              :loading="loading.city"
              :items="city_items"
              item-text="name"
              item-value="id"
              v-model="filter.cityIdValue"
              append-icon="location_on"
              clearable
              light
              no-data-text="شهری یافت نشد"
              label="انتخاب شهر"
              flat
              solo-inverted
              @change="updateCity"
            />
          </div>
        </v-flex>
        <v-flex xs12 sm1>
          <v-checkbox
            v-model="filter.instant"
            :loading="loading.instant"
            label=" فوری"
            light
            flat
            hide-details
            solo-inverted
            @change="updateInstant"
          />
        </v-flex>
        <v-flex xs12 sm2>
          <v-checkbox
            v-model="filter.transferable"
            :loading="loading.value"
            label="تمام شهرها"
            light
            flat
            clearable
            hide-details
            solo-inverted
            @change="updateTransferable"
          />
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const cityMethod = '/cities?number=3000'

  export default {
    props: ['value', 'label', 'isAdmin', 'chooseType'],
    data() {
      return {
        loading: {
          search: false,
          advertType: false,
          title: false,
          instant: false,
          transferable: false,
          city: true,
        },
        filter: {
          advertType: null,
          advertTypeName: null,
          advertTypeValue: null,
          cityIdValue: null,
          instant: null,
          instantValue: null,
          transferableValue: null,
          transferable: null,
          titleValue: null,
          textValue: null,
        },
        search: '',
        city_search: null,
      }
    },
    computed: {
      getLabel() {
        return this.label;
      },
      getChooseType() {
        return this.chooseType || false;
      },
      getAdvertTypeList() {
        let list = Helper.getTypeByAlias();
        //return list;
        let titles = [];
        _.forEach(list, (item) => {
          titles.push(item.title)
        })
        return titles
      },
      city_items() {
        return _.get(this.$store.state, 'city.data')
      },
    },
    watch: {
    },
    mounted() {
      _.set(this.loading, 'city', true)
      _.forEach(this.value, (value, key) => {
        _.set(this, ['filter', key], value);
      })

      //load initial data - city
      this.$axios.$get(cityMethod).then(resp => {
        this.$store.commit('city/setAndProcessData', resp.data || []);
        _.set(this.loading, 'city', false)
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      updateSearch() {
        _.set(this, 'filter.titleValue', this.search);
        _.set(this, 'filter.textValue', this.search);
        this.emitToParent();
      },
      updateAdvertType() {
        if (_.get(this, 'filter.advertType', false)) {
          let type = _.get(_.find(Helper.getTypeByAlias(), {'title': _.get(this, 'filter.advertType', false)}), 'type', 'loan');
          _.set(this, 'filter.advertTypeName', type);
          _.set(this, 'filter.advertTypeValue', type);
        }
        this.emitToParent();
      },
      updateInstant() {
        if (_.get(this, 'filter.instant', false)) {
          _.set(this.filter, 'instantValue', 1);
        }
        else {
          _.set(this.filter, 'instantValue', null);
        }
        this.emitToParent();
      },
      updateTransferable() {
        if (_.get(this, 'filter.transferable', false)) {
          _.set(this.filter, 'transferableValue', 1);
        } else {
          _.set(this.filter, 'transferableValue', null);
        }
        this.emitToParent();
      },
      updateCity() {
        this.emitToParent();
      },
      emitToParent() {
        this.$emit("change", this.filter);
        return this.$emit("input", this.filter);
      },
    }
  }
</script>
