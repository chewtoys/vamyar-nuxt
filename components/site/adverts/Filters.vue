<template>
  <v-card class="pa-5" light color="grey lighten-4">
    <v-subheader>{{getLabel}}</v-subheader>
    <div class="text-xs-right">
      <v-layout row wrap inverse>
        <v-flex xs12 sm12 v-if="getFilter('amount')">
          <div class="ltr">

          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-card>
</template>
<script>
  import Helper from "~/assets/js/helper.js"


  const
    guaranteeMethod = '/guaranteeTypes'


  export default {
    props: ["value", 'advertType', 'label'],
    data() {
      return {
        commonAdvertsFilter: null,
        title: '',
        isInstant: 0,
        instantLoading: false,
        range_loading: false,
        range_search_min: 0,
        category_items: [
          "همه",
          "دسته بندی اول",
          "دسته بندی دوم",
          "دسته بندی سوم",
          "دسته بندی چهارم"
        ],
        category_search: null,

        city_loading: false,
        city_search: null,
        city_select: null,
        title_loading: false,
        title_search: null,
      }
    },
    computed: {
      getLabel() {
        return _.get(this, 'label', 'فیلترها');
      },
      city: {
        get() {
          if (this.allCities) return 0;
          let list = _.get(this.$store.state, 'city.data', []);
          let index = _.findIndex(list, {'name': this.cityName}) || 0;
          if (index > 0) {
            let item = list[index];
            return _.get(item, 'id', 0);
          }
          return 0;
        },
        set(val) {

        }
      },
    },
    methods: {
      isAllowed(type) {
        return this.advertType === type;
      },
      chargeValue() {
        let filedList = ['title', 'city'];
        let filterList = {}
        _.forEach(filedList, (key) => {
          _.set(filterList, key, _.get(this, key))
        })
        this.value = filterList;
      },
      getFilter(type, filter = null) {
        return _.get(Helper.getFiltersByType, [type, filter], false);
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
    },
    mounted() {
      // city
      this.$axios.$get(guaranteeMethod).then(resp => {
        this.$store.commit('guaranteeType/setAndProcessData', resp.data || []);
      }).catch(err => {
        console.log(err)
      })


    },
    watch: {
      commonAdvertsFilter(val) {
        console.log(val)
        return this.$emit("input", val);
      },
      title_search(val) {
        this.title_loading = true
        setTimeout(() => {
          this.title_loading = false
        }, 3000)
      }, instant(val) {
        this.instantLoading = true
        setTimeout(() => {
          this.instantLoading = false
        }, 3000)
      }
    },
    components: {
      Loans,
      LoanRequests,
      CoSigners,
      CoSignerRequests,
      Finances,
      FinanceRequests,
      CommonAdverts
    }
  }
</script>
