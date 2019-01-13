<template>
  <v-flex xs12 md12>
    <v-subheader>{{getLabel}}</v-subheader>
    <v-card class="elevation-0 pa-2" flat color="transparent" light>
      <v-layout rwo wrap>
        <v-flex xs12>
        </v-flex>
        <v-flex v-if="getChooseType" xs12 sm4 class="pa-1">
          <div>
            <v-autocomplete
              :items="getAdvertTypeList"
              item-value="type"
              item-text="title"
              v-model="filter.advertTypeName"
              :loading="loading.advertType"
              :menu-props="{contentClass:'farsi mx-3'}"
              label="نوع آگهی"
              light
              clearable
              flat
              hide-details
              solo-inverted
              append-icon="list"
              @change="updateAdvertTypeName"
            />
          </div>
        </v-flex>
        <v-flex v-if="!isAdmin" xs12 sm3 class="pa-1 ">
          <div>
            <v-text-field
              v-model="filter.text"
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
              :loading="loading.province"
              :items="province_items"
              item-text="name"
              item-value="id"
              v-model="filter.provinceIdValue"
              append-icon="location_on"
              clearable
              light
              no-data-text="استانی یافت نشد"
              label="انتخاب استان"
              flat
              solo-inverted
              @change="updateprovince"
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
            label="تمام استانها"
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

  const provinceMethod = '/provinces?number=3000'

  export default {
    props: ['value', 'label', 'isAdmin', 'chooseType'],
    data() {
      return {
        search: '',
        loading: {
          search: false,
          advertType: false,
          title: false,
          instant: false,
          transferable: false,
          province: true,
        },
        filter: {
          advertTypeName: null,
          advertTypeValue: null,
          provinceIdValue: null,
          instant: false,
          text: '',
          instantValue: false,
          transferableValue: false,
          transferable: false,
          titleValue: null,
          textValue: null,
        },
        province_search: null,
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
        let list = Helper.getTypes();
        //return list;
        let titles = [];
        _.forEach(list, (item) => {
          titles.push({title: item.filterTitle, type: item.type})
        })
        return titles
      },
      province_items() {
        return _.get(this.$store.state, 'province.data')
      },
    },
    watch: {
      value(val) {
        _.forEach(val, (value, key) => {
          //console.log(7, value, key)
          _.set(this, ['filter', key.replace('Value', '')], value);
          _.set(this, ['filter', key], value);
          _.set(this, key.replace('Value', ''), value);
          _.set(this, key, value);
        })
      }
    },
    mounted() {
      _.set(this.loading, 'province', true)

      //load initial data - province
      this.$axios.$get(provinceMethod).then(resp => {
        this.$store.commit('province/setAndProcessData', resp.data || []);
        _.set(this.loading, 'province', false)
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      updateSearch(val) {
        _.set(this, 'filter.titleValue', val);
        _.set(this, 'filter.textValue', val);
        this.emitToParent();
      },
      updateAdvertTypeName(val) {
        _.set(this, 'filter.advertTypeValue', val);
        _.set(this, 'filter.advertTypeName', val);
        _.set(this, 'filter.advertTypeNameValue', val);
        this.emitToParent();
      },
      updateInstant(val) {
        _.set(this.filter, 'instantValue', !!val);
        this.emitToParent();
      },
      updateTransferable(val) {
        _.set(this.filter, 'transferableValue', !!val);
        this.emitToParent();
      },
      updateprovince() {
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
