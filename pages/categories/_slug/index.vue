<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-card color="white">
        <AdvertFilters :chooseType="false" label="فیلتر کنید" v-model="advertFilters"/>
        <LoansFilters v-if="type.type==='loans'" label="فیلتر وام " v-model="loansFilters"/>
        <LoanRequestsFilters v-if="type.type==='loanRequests'" label="فیلتر در خواست وام "
                             v-model="loanRequestsFilters"/>
        <CoSignersFilters v-if="type.type==='coSigners'" label="فیلتر ضامن ها" v-model="coSignersFilters"/>
        <CoSignerRequestsFilters v-if="type.type==='coSignerRequests'" label="فیلتر درخواست ضامن"
                                 v-model="coSignerRequestsFilters"/>
        <FinancesFilters v-if="type.type==='finances'" label="فیلتر سرمایه گذاری ها" v-model="financesFilters"/>
        <FinanceRequestsFilters v-if="type.type==='financeRequests'" label="فیلتر درخواست سرمایه گذاری "
                                v-model="financeRequestsFilters"/>

        <v-flex xs12 sm6 class="py-2">
          <v-subheader>مرتب سازی بر اساس</v-subheader>
          <v-btn-toggle v-model="sort">
            <v-btn v-for="item in sortList" :key="item.value" color="info" class="grey--text text--darken-4" @click="sortBy(item.value)"
                   v-if="allowedSort(item)" flat>
              {{item.title}}
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12>
      <v-card color="transparent" flat>
        <v-container grid-list-lg fluid>
          <div v-if="loading">
            <v-progress-linear :indeterminate="loading"/>
          </div>
          <v-layout v-if="!loading" row wrap>
            <v-flex
              v-for="item in items"
              :key="item.id"
              :sm6="!!settings('adverts.isImageAllowed')"
              :sm4="!settings('adverts.isImageAllowed')"
              lg4
              xl2
            >
              <AdvertCard :item="item"/>
            </v-flex>
            <v-alert :value="!!msg" type="warning">
              <span class="p-b--2">خطا: {{msg}}</span>
            </v-alert>
            <div class="text-xs-center">
              <v-progress-circular
                v-if="loading"
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex v-if="paginator&&paginator.cursor && paginator.cursor.nextURL" xs12 sm12>
      <div class="my-5 text-xs-center">
        <v-btn :loading="btn_loading" round large outline color="info" @click="loadMore">
          <span><v-icon class="px-1">arrow_drop_down</v-icon>نمایش بیشتر</span>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
  //import axios from 'axios'
  // /site/adverts?advertableType=loan&include=advertable

  import AdvertCard from "~/components/site/adverts/Advert.vue"
  import AdvertFilters from "~/components/site/adverts/filters/CommonAdverts.vue"
  import LoansFilters from "~/components/site/adverts/filters/LoansFilters"
  import LoanRequestsFilters from "~/components/site/adverts/filters/LoanRequestsFilters"
  import CoSignersFilters from "~/components/site/adverts/filters/CoSignersFilters"
  import CoSignerRequestsFilters from "~/components/site/adverts/filters/CoSignerRequestsFilters"
  import FinancesFilters from "~/components/site/adverts/filters/FinancesFilters"
  import FinanceRequestsFilters from "~/components/site/adverts/filters/FinanceRequestsFilters"


  import Helper from "~/assets/js/helper.js"

  const number = 4,
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    meta: {
      title: 'لیست همه ی آگهی ها',
      breadcrumb: 'همه ی آگهی ها'
    },
    data() {
      return {
        sortList: [
          {title: 'جدیدترین', value: 'id:desc'},
          {title: 'قدیمی ترین', value: 'id:asc'},
          {title: 'کمترین قیمت', value: 'advertable.amount:asc', types: ['loans', 'loanRequests']},
          {title: 'بیشترین قیمت', value: 'advertable.amount:desc', types: ['loans', 'loanRequests']},
          {title: 'بیشترین سرمایه', value: 'advertable.maxAmount:desc', types: ['finances']},
          {title: 'کمترین سرمایه', value: 'advertable.maxAmount:asc', types: ['finances']},
          {title: 'بیشترین نرخ سود', value: 'advertable.interestRate:desc', types: ['coSignerRequest']},
          {title: 'کمترین نرخ سود', value: 'advertable.interestRate:asc', types: ['coSignerRequest']},
        ],
        type: '',
        sort: 'id:desc',
        advertFilters: {},
        filter: {},
        loansFilters: {},
        loanRequestsFilters: {},
        coSignersFilters: {},
        coSignerRequestsFilters: {},
        financesFilters: {},
        financeRequestsFilters: {},
        page: 1,
        msg: null,
        size: "sm",
        paginator: {},
        loading: true,
        btn_loading: false,
      }
    }
    ,
    watch: {
      filter() {
        this.loadAgain(this.filter)
      }
    },
    // loading the first items from server
    async asyncData({app, store, params, error, $axios}) {
      let method = `/site/adverts`
      let slug = params.slug;
      let type = Helper.getTypeByAlias(slug);
      let cursor
      cursor = 0
      let include = 'advertable,city,user.details';
      let query = {
        number,
        include
      }
      //console.log({query})
      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);
        let {data, paginator} = await
          app.$axios.$get(method, {
            params: query
          })
        let loading = false
        return {items: data, paginator, loading, slug, type}
      } catch (err) {
        console.log(err);
        //error({statusCode: 404, message: "این صفحه فعال نمی باشد."})
        return {slug, type, items: [], paginator: [], msg: 'مشکلی در گرفتن آگهی ها پیش آمد.', loading: false}
      }
    }
    ,
    computed: {}
    ,
    // method used in page
    methods: {
      allowedSort(item) {
        if (_.has(item, 'types')) {
          let type = this.type.type;
          return item.types.includes(type);
        }
        return true;
      },
      sortBy(val) {
        this.sort = val;
        this.loadAgain();
      },
      showFilter(type) {
        return true;
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
      ,
      // load more items
      loadMore: async function () {
        this.msg = null;
        this.btn_loading = true
        try {
          let method = this.paginator.cursor.nextURL
          let {data, paginator} = await this.$axios.$get(method, {
            params: {number}
          })
          data.forEach((e, i) => {
            this.items.push(e)
          })
          this.btn_loading = false
          this.paginator = paginator
        } catch (err) {
          this.paginator.cursor.nextURL = false
          this.$store.commit("snackbar/setSnack", "آگهی بیشتری وجود ندارد.")
        }
        this.btn_loading = false
      }
      ,
      // reload as filter changed
      loadAgain(filters = {}) {
        this.msg = null;
        this.loading = true
        this.items = []
        let method = `/site/adverts`
        let include = 'advertable,city,user.details';
        let filterArray = []
        _.forEach(filters, function (value, key) {
          filterArray.push(`${key}=${value}`)
        })
        let filter = _.split(filterArray, '`');
        let query = {
          include,
          number,
          orderBy: this.sort,
          filter
        }
        console.log({query})
        this.$axios.$get(method, {
          params: query
        }).then(response => {
          console.log(response)
          this.items.push(_.get(response, 'data', []))
          this.paginator = _.get(response, 'paginator', [])
        }).catch((err) => {
          console.log(err)
          this.$store.commit(
            "snackbar/setSnack",
            "مشکلی در گرفتن آگهی ها پیش آمد."
          )
        })
        //this.items = data;
        this.loading = false
        return true
      }
    },
    components: {
      AdvertFilters,
      LoansFilters,
      LoanRequestsFilters,
      CoSignersFilters,
      CoSignerRequestsFilters,
      FinancesFilters,
      FinanceRequestsFilters,
      AdvertCard
    }
  }
</script>
