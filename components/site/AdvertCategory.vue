<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-card color="white">
        <AdvertFilters :chooseType="isAdverts" label="" :value="advertFilters"
                       @change="loadAgainCommonAdvertFilter"/>
        <LoansFilters v-if="canShow('loans')" label="در بین آگهی های وام های فروشی و مشارکتی جست و جو کنید "
                      :value="filter"
                      @change="loadAgainAdvertFilter"/>
        <LoanRequestsFilters v-if="canShow('loanRequests')" label="در بین در خواست های وام جست و جو کنید"
                             :value="filter"
                             @change="loadAgainAdvertFilter"/>
        <CoSignersFilters v-if="canShow('coSigners')" label="در بین ضامن ها جست و جو کنید" :value="filter"
                          @change="loadAgainAdvertFilter"/>
        <CoSignerRequestsFilters v-if="canShow('coSignerRequests')" label="در بینم درخواست های ضمانت جست و جو کنید"
                                 :value="filter" @change="loadAgainAdvertFilter"/>
        <FinancesFilters v-if="canShow('finances')" label="در بین سرمایه گذار ها جست و جو کنید" :value="filter"
                         @change="loadAgainAdvertFilter"/>
        <FinanceRequestsFilters v-if="canShow('financeRequests')" label="در بین درخواست سرمایه گذاری جست و جو کنید"
                                :value="filter" @change="loadAgainAdvertFilter"/>

        <v-flex xs12 sm6 class="py-2">
          <v-subheader>مرتب سازی بر اساس</v-subheader>
          <v-btn-toggle v-model="sortBtn">
            <v-btn v-for="item in sortList" :key="item.value" color="info" class="grey--text text--darken-4"
                   @click="sortBy(item.value)"
                   v-if="allowedSort(item)" flat>
              {{item.title}}
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 v-if="showPremium">
      <noSubscriptionAlert :type="this.type"/>
    </v-flex>
    <v-flex xs12 sm12 v-if="!showPremium">
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
              <AdvertCard :item="item" :which="which"/>
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
            <div v-if="!loading && items.length < 1 " class="full text-xs-center">
              <v-alert :value="true" type="warning" icon="info">
                <span class="p-b--2">در حال حاضر آگهی ثبت شده ای موجود نمی باشد</span>
              </v-alert>
            </div>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex v-if="!loading && items.length && paginator&&paginator.cursor && paginator.cursor.nextURL" xs12 sm12>
      <div class="my-5 text-xs-center">
        <v-btn :loading="btn_loading" round large outline color="info" @click="loadMore">
          <span><v-icon class="px-1">arrow_drop_down</v-icon>نمایش بیشتر</span>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>


  import AdvertCard from "~/components/site/adverts/Advert.vue"
  import AdvertFilters from "~/components/site/adverts/filters/CommonAdverts.vue"
  import LoansFilters from "~/components/site/adverts/filters/LoansFilters"
  import LoanRequestsFilters from "~/components/site/adverts/filters/LoanRequestsFilters"
  import CoSignersFilters from "~/components/site/adverts/filters/CoSignersFilters"
  import CoSignerRequestsFilters from "~/components/site/adverts/filters/CoSignerRequestsFilters"
  import FinancesFilters from "~/components/site/adverts/filters/FinancesFilters"
  import FinanceRequestsFilters from "~/components/site/adverts/filters/FinanceRequestsFilters"
  import Helper from "~/assets/js/helper.js"
  import noSubscriptionAlert from "~/components/site/noSubscriptionAlert.vue"

  const number = 15

  export default {
    props: ['which', 'initialItems', 'initialPaginator'],
    data() {
      return {
        advertsSortList: [
          {title: 'جدیدترین', value: 'priority:desc'},
          {title: 'قدیمی ترین', value: 'id:asc'},
          {title: 'کمترین مبلغ وام', value: 'advertable.amount:asc', types: ['loans', 'loanRequests']},
          {title: 'بیشترین مبلغ وام', value: 'advertable.amount:desc', types: ['loans', 'loanRequests']},
          {title: 'بیشترین سرمایه', value: 'advertable.maxAmount:desc', types: ['finances']},
          {title: 'کمترین سرمایه', value: 'advertable.maxAmount:asc', types: ['finances']},
          {title: 'بیشترین نرخ سود', value: 'advertable.interestRate:desc', types: ['coSignerRequest']},
          {title: 'کمترین نرخ سود', value: 'advertable.interestRate:asc', types: ['coSignerRequest']},
        ],
        typeSortList: [
          {title: 'جدیدترین', value: 'advert.priority:desc'},
          {title: 'قدیمی ترین', value: 'id:asc'},
          {title: 'کمترین مبلغ وام', value: 'amount:asc', types: ['loans', 'loanRequests']},
          {title: 'بیشترین مبلغ وام', value: 'amount:desc', types: ['loans', 'loanRequests']},
          {title: 'بیشترین سرمایه', value: 'maxAmount:desc', types: ['finances']},
          {title: 'کمترین سرمایه', value: 'maxAmount:asc', types: ['finances']},
          {title: 'بیشترین نرخ سود', value: 'interestRate:desc', types: ['coSignerRequest']},
          {title: 'کمترین نرخ سود', value: 'interestRate:asc', types: ['coSignerRequest']},
        ],
        showPremium: false,
        type: '',
        sort: '',
        sortBtn: '',
        commonComputedFilters: [],
        computedFilters: [],
        advertTypeName: null,
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
        items: [],
        paginator: {},
        loading: true,
        btn_loading: false,
      }
    },
    mounted() {
      this.advertTypeName = this.which;
      this.replaceValues();
      this.sort = this.isAdverts ? 'priority:desc' : 'advert.priority:desc'
      this.items = this.initialItems;
      this.paginator = this.initialPaginator;
      this.loading = false;
    },
    computed: {
      decodedCommonComputedFilters() {
        return JSON.parse(_.get(this.$route.query, 'commonComputedFilters', '{}'));
      }, decodedComputedFilters() {
        return JSON.parse(_.get(this.$route.query, 'computedFilters', '{}'));
      }, decodedAdvertTypeName() {
        return _.get(this.$route.query, 'advertTypeName', '');
      },
      sortList() {
        return this.isAdverts ? this.advertsSortList : this.typeSortList;
      },
      isAdverts() {
        return (this.which === 'adverts');
      }
    }
    ,
    // method used in page
    methods: {
      replaceValues() {
        let commonComputedFilters = this.decodedCommonComputedFilters
        let computedFilters = this.decodedComputedFilters
        let advertTypeName = this.decodedAdvertTypeName || this.advertTypeName
        this.filter = Helper.reverseFilters(computedFilters, advertTypeName);
        this.advertFilters = Helper.reverseFilters(commonComputedFilters);
        console.log(1, this.filter, 2, this.advertFilters)
      },
      canShow(type) {
        return _.get(this, 'advertTypeName', '') === type;
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
      ,
      allowedSort(item) {
        if (_.has(item, 'types')) {
          let type = this.advertTypeName;
          return item.types.includes(type);
        }
        return true;
      },
      sortBy(val) {
        this.sort = val;
        this.loadAgain();
      },
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
          let {status} = _.get(err, 'response', 0);
          if (status === '401') {
            this.showPremium = true;
          }
          this.paginator.cursor.nextURL = false
          this.$store.commit("snackbar/setSnack", "آگهی بیشتری وجود ندارد.")
        }
        this.btn_loading = false
      },
      loadAgainCommonAdvertFilter(filter) {
        //console.log(filter);
        let typeName = _.get(filter, 'advertTypeName', 'adverts');
        if (this.isAdverts) _.set(this, 'advertTypeName', typeName);
        let computedFilter = Helper.getComputedFilter(filter);
        _.set(this, 'commonComputedFilters', computedFilter);
        this.$router.push({
          path: this.$route.path,
          query: {
            advertTypeName: typeName,
            commonComputedFilters: JSON.stringify(computedFilter),
            computedFilters: JSON.stringify(this.decodedComputedFilters)
          }
        })
        //this.loadAgain();
      },
      loadAgainAdvertFilter(filter) {
        ////console.log(1,{filter});
        //this.filter = ''
        //_.set(this, 'filter', filter);
        let type = _.get(this, 'advertTypeName', this.which);
        let computedFilter = Helper.getComputedFilter(filter, type);
        _.set(this, 'computedFilters', computedFilter);
        this.$router.push({
          path: this.$route.path,
          query: {
            advertTypeName: JSON.stringify(this.decodedAdvertTypeName),
            computedFilters: JSON.stringify(computedFilter),
            commonComputedFilters: JSON.stringify(this.decodedCommonComputedFilters)
          }
        })
        // console.log(JSON.stringify({filter, computedFilter}))
        //this.loadAgain();
      },

      // reload as filter changed
      loadAgain(filters = {}) {
        setTimeout(() => {
          // browser breath!
          this.loading = true
        }, 300);

        this.msg = null;
        this.items = []
        let method = `/site/${this.which}`
        let commonComputedFilters = [];
        let computedFilters = [];
        let advertTypeName = this.advertTypeName;

        try {
          commonComputedFilters = this.decodedCommonComputedFilters;
          computedFilters = this.decodedComputedFilters
          advertTypeName = this.decodedAdvertTypeName || this.advertTypeName
        } catch (err) {
          console.log({err})
          commonComputedFilters = this.commonComputedFilters
          computedFilters = this.computedFilters
        }
        let query = Helper.getComputedFilters(commonComputedFilters, computedFilters, advertTypeName, this.isAdverts, number, this.sort)

        this.$axios.$get(method, {
          params: query
        }).then(response => {
          //console.log(4, response)
          this.items = _.get(response, 'data', [])
          this.paginator = _.get(response, 'paginator', [])
        }).catch((err) => {
          //console.log(err)
          let {status} = _.get(err, 'response', 0);
          if (status === '401') {
            this.showPremium = true;
          }
        }).finally(() => {
          this.loading = false
        })
        return true
      }
    },
    //watchQuery: ['advertTypeName', 'commonComputedFilters', 'computedFilters'],
    watch: {
      decodedCommonComputedFilters() {
        this.loadAgain()
      },
      decodedComputedFilters() {
        this.loadAgain()
      },
      decodedAdvertTypeName() {
        this.loadAgain()
      },
      // $route: {
      //   handler() {
      //     this.loadAgain();
      //   },
      //   deep: true
      // },
      advertTypeName(val) {
        //console.log(val)
        this.filter = {}
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
      AdvertCard,
      noSubscriptionAlert
    }
  }
</script>
