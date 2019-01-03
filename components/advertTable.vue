<template>
  <div>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
          <v-spacer/>
          <v-btn
            v-if="!isAdverts"
            color="red" outline light round class="mb-2"
            @click="deleteItems">
            <v-icon
              class="mx-1"
              small
            >delete
            </v-icon>
            حذف انتخاب شده ها
          </v-btn>
          <v-btn v-if="!isAdverts" :to="uri+`/create`" color="green" outline light round class="mb-2">
            <v-icon class="mx-1" small>create</v-icon>
            ثبت جدید
          </v-btn>
        </v-toolbar>
        <v-card-title>
          جست‌و‌جو
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="search"
            label="جست و جو در عنوان و متن توضیحات"
            single-line
            hide-details
          ></v-text-field>

          <AdvertFilters :chooseType="isAdverts" label="فیلتر کنید" v-model="advertFilters"
                         @change="loadAgainCommonAdvertFilter"/>
          <LoansFilters v-if="canShow('loans')" label="فیلتر وام " v-model="filter"
                        @change="loadAgainAdvertFilter"/>
          <LoanRequestsFilters v-if="canShow('loanRequests')" label="فیلتر در خواست وام " v-model="filter"
                               @change="loadAgainAdvertFilter"/>
          <CoSignersFilters v-if="canShow('coSigners')" label="فیلتر ضامن ها" v-model="filter"
                            @change="loadAgainAdvertFilter"/>
          <CoSignerRequestsFilters v-if="canShow('coSignerRequests')" label="فیلتر درخواست ضامن"
                                   v-model="filter" @change="loadAgainAdvertFilter"/>
          <FinancesFilters v-if="canShow('finances')" label="فیلتر سرمایه گذاری ها" v-model="filter"
                           @change="loadAgainAdvertFilter"/>
          <FinanceRequestsFilters v-if="canShow('financeRequests')" label="فیلتر درخواست سرمایه گذاری " v-model="filter"
                                  @change="loadAgainAdvertFilter"/>


        </v-card-title>
        <v-data-table
          v-if="isAdverts"
          hide-actions
          v-model="selected"
          item-key="id"
          :headers="headers"
          :loading="tableLoader"
          :items="list"
          :pagination.sync="pagination"
          :total-items="totalData"
          :rows-per-page-items="[10,25,100]"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">

            <td :class="`text-xs-left ${isDeleted(props.item) ? 'deletedAdvert' :''}`">{{ getProperty(props, 'item.id')
              }}
            </td>
            <td v-if="isAdmin" class="text-xs-left">{{ sender(props) }}</td>
            <td v-if="isAdmin" class="text-xs-left">{{ getProperty(props, 'item.description', '') }}</td>
            <td class="text-xs-right">{{ getProperty(props, 'item.title', '-') }}</td>
            <template>
              <td class="text-xs-left">{{ getProperty(props, 'item.city.name', '') }}</td>
              <td class="text-xs-left">
                {{ getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'title', 'نامشخص') }}
              </td>
            </template>
            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  :disabled="!isAdmin && instant(getProperty(props, 'item'),true)"
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ instant(getProperty(props, 'item')) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeInstant(getProperty(props, 'item.id'),1,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>فوری</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeInstant(getProperty(props, 'item.id'),0,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>غیر فوری</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ tradeStatus(getProperty(props, 'item', [])) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),getProperty(props, 'item'),0)"
                  >
                    <v-list-tile-title>باز</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),getProperty(props, 'item'),1)"
                  >
                    <v-list-tile-title>در حال معامله</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),getProperty(props, 'item'),2)"
                  >
                    <v-list-tile-title>بسته شده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  :disabled="!isAdmin && ladderable(getProperty(props, 'item'),true)"
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ ladderable(getProperty(props, 'item')) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeLadderable(getProperty(props, 'item.id'),1,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>نردبان کردن</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeLadderable(getProperty(props, 'item.id'),0,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>برداشتن نردبان</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  :disabled="!isAdmin"
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ verified(getProperty(props, 'item')) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeVerified(getProperty(props, 'item.advertableId'),1,props.item)"
                  >
                    <v-list-tile-title>تایید شده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeVerified(getProperty(props, 'item.advertableId'),0,props.item)"
                  >
                    <v-list-tile-title>تایید نشده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
            <td>
              <nuxt-link title="مشاهده"
                         :to=" `${uri}/${getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', '')}/show/${props.item.advertableId}`"
                         class="mx-1">
                <v-icon
                  small
                >
                  pageview
                </v-icon>
              </nuxt-link>
              <nuxt-link title="ویرایش"
                         :to="`${uri}/${getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', '')}/edit/${props.item.advertableId}`"
                         class="mx-1">
                <v-icon
                  small
                >
                  edit
                </v-icon>
              </nuxt-link>
              <v-icon
                class="mx-1"
                small
                @click="deleteItem(props.item.advertableId,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
              >
                delete
              </v-icon>
            </td>
          </template>
        </v-data-table>

        <v-data-table
          v-else
          v-model="selected"
          item-key="id"
          select-all
          hide-actions
          :headers="headers"
          :loading="tableLoader"
          :items="list"
          :pagination.sync="pagination"
          :total-items="totalData"
          :rows-per-page-items="[10,25,100]"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td :class="`text-xs-left ${isDeleted(props.item) ? 'deletedAdvert' :''}`">{{ getProperty(props, 'item.id') }}</td>
            <td v-if="isAdmin" class="text-xs-left">{{ sender(props) }}</td>
            <td v-if="isAdmin" class="text-xs-left">{{ getProperty(props, 'item.advert.description', '-') }}</td>
            <td class="text-xs-right">{{ getProperty(props, 'item.advert.title', '-') }}</td>
            <template v-if="type.type=='loans'">
              <td class="text-xs-left">{{ getPrice(getProperty(props, 'item.price', '')) }}</td>
              <td class="text-xs-left">{{ getPrice(getProperty(props, 'item.amount', '')) }}</td>
            </template>
            <template v-if="type.type=='loanRequests'">
              <td class="text-xs-left">{{ getPrice(getProperty(props, 'item.amount')) }}</td>
            </template>
            <template v-if="type.type=='finances'">
              <td class="text-xs-left">{{ getPrice(getProperty(props, 'item.maxAmount', '')) }}</td>
            </template>
            <template v-if="type.type=='financeRequests'">
              <td class="text-xs-left">{{ getPrice(getProperty(props, 'item.amount', '')) }}</td>
              <td class="text-xs-left">{{ getProperty(props, 'item.job') }}</td>
            </template>
            <template v-if="type.type=='coSigners'">
              <td class="text-xs-left">{{ getForBank(props.item) }}</td>
              <td class="text-xs-left">{{ getForCourt(props.item) }}</td>
              <td class="text-xs-left">{{ getGuaranteeTypes(getProperty(props, 'item.guaranteeTypes')) }}</td>
            </template>
            <template v-if="type.type=='coSignerRequests'">
              <td class="text-xs-left">{{ getForBank(props.item) }}</td>
              <td class="text-xs-left">{{ getForCourt(props.item) }}</td>
              <td class="text-xs-left">{{ getGuaranteeTypes(getProperty(props, 'item.guaranteeTypes')) }}</td>
              <td class="text-xs-left">{{ getProperty(props, 'item.interestRate') }}</td>
              <td class="text-xs-left">{{ getProperty(props, 'item.bank') }}</td>
            </template>

            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ instant(getProperty(props, 'item')) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeInstant(getProperty(props, 'item.advert.id'),1,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>فوری</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeInstant(getProperty(props, 'item.advert.id'),0,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>غیر فوری</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ tradeStatus(getProperty(props, 'item', [])) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.advert.id'),getProperty(props, 'item'),0,getProperty(props, 'item.id'))"
                  >
                    <v-list-tile-title>باز</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.advert.id'),getProperty(props, 'item'),1,getProperty(props, 'item.id'))"
                  >
                    <v-list-tile-title>در حال معامله</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.advert.id'),getProperty(props, 'item'),2,getProperty(props, 'item.id'))"
                  >
                    <v-list-tile-title>بسته شده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>

            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ ladderable(getProperty(props, 'item')) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeLadderable(getProperty(props, 'item.advert.id'),1,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>نردبان</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeLadderable(getProperty(props, 'item.advert.id'),0,props.item,getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', ''))"
                  >
                    <v-list-tile-title>برداشتن نردبان</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
            <td class="text-xs-right">
              <v-menu offset-y>
                <v-btn
                  :disabled="!isAdmin"
                  slot="activator"
                  color="primary"
                  outline
                >
                  {{ verified(getProperty(props, 'item')) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeVerified(getProperty(props, 'item.id'),1,props.item)"
                  >
                    <v-list-tile-title>تایید شده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeVerified(getProperty(props, 'item.id'),0,props.item)"
                  >
                    <v-list-tile-title>تایید نشده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>

            <td>
              <nuxt-link title="مشاهده" :to=" uri + '/show/' + props.item.id" class="mx-1">
                <v-icon
                  small
                >
                  pageview
                </v-icon>
              </nuxt-link>
              <nuxt-link title="ویرایش" :to=" uri + '/edit/' + props.item.id" class="mx-1">
                <v-icon
                  small
                >
                  edit
                </v-icon>
              </nuxt-link>
              <v-icon
                class="mx-1"
                small
                @click="deleteItem(props.item.id)"
              >
                delete
              </v-icon>
            </td>

          </template>
          <template slot="no-data">
            <v-alert type="info">
              <p>هنوز موردی اضافه نشده است. برای افزودن از بالا بر روی جدید کلیک کنید.</p>
            </v-alert>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination total-visible="8" v-model="pagination.page"
                        :length="paginator.totalPages"></v-pagination>
        </div>
      </div>
    </v-card>
  </div>
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

  export default {
    props: ['slug', 'which', 'type', 'pageTitle'],
    data: () => ({
      list: [],
      totalData: 10,
      pagination: {}, //pagination is for vuetify - paginator is for API
      paginator: {totalPages: 1}, //pagination is for vuetify - paginator is for API
      selected: [],
      pages: 1,
      page: 1,
      commonComputedFilters: [],
      computedFilters: [],
      advertTypeName: null,
      advertFilters: {},
      filter: {},
      search: '',
      submit_loader: false,
      tableLoader: false,
    }),
    computed: {
      isAdverts() {
        return this.type.type === 'adverts'
      },
      panel() {
        return this.which === 'admin' ? 'admin' : 'user';
      },
      isAdmin() {
        return this.panel === 'admin';
      },
      uri() {
        return this.type.type === 'adverts' ? `/${this.panel}/adverts` : `/${this.panel}/adverts/${this.slug}`;
      },
      headers() {
        let id = {text: "شناسه", align: "right", value: 'id'};
        let owner = {text: "ثبت شده توسط", align: "right", value: 'advert.user.id'};
        let description = {text: "توضیح ادمین", value: "description", align: "left"};
        let result = [];
        result = Helper.getRawHeaders(this.type.type);
        // console.log(result.length)
        if (this.isAdmin && result[2].value !== 'description') result.unshift(description);
        if (this.isAdmin && result[1].value !== 'advert.user.id') result.unshift(owner);
        if (result[0].value !== 'id') result.unshift(id);
        return _.uniq(result);
      },
      info() {
        return {
          title: "لیست " + this.type.title + "‌ها"
        }
      }
    },
    mounted() {
      this.advertTypeName = this.type.type;
      this.pagination = {
        sortBy: 'id',
        page: 1,
        descending: true,
        rowsPerPage: 25,
      };
      this.switchPage()
    },
    watch: {
      search(val) {
        this.switchPage();
      },
      pagination: {
        handler() {
          //console.log(this.pagination.page)
          this.switchPage();
        },
        deep: true
      }
    },
    methods: {
      loadAgainCommonAdvertFilter(filter) {
        //console.log(filter);
        let typeName = _.get(filter, 'advertTypeName', null);
        if (typeName) {
          _.set(this, 'advertTypeName', typeName);
        }
        let computedFilter = Helper.getComputedFilter(filter);
        _.set(this, 'commonComputedFilters', computedFilter);
        //this.loadAgain();
      },
      loadAgainAdvertFilter(filter) {
        //console.log(1,{filter});
        let type = _.get(this, 'advertTypeName', this.which);
        let computedFilter = Helper.getComputedFilter(filter, type);
        _.set(this, 'computedFilters', computedFilter);
        //console.log(computedFilter)
        //this.loadAgain();
      },
      canShow(type) {
        return _.get(this, 'advertTypeName', '') === type;
      },
      getAdvertType(advertType) {
        return Helper.getTypeByAdvertType(advertType);
      },
      switchPage() {
        this.loading = true;
        let method = `/${this.panel}/${this.type.type}`;
        let advertableType = this.type.advertType;
        let filter;
        if (this.search) filter = `advert.mobile=${this.search},job=${this.search},price=${this.search},maxAmount=${this.search},amount=${this.search},advert.text=${this.search},advert.advertableId=${this.search},advert.id=${this.search},advert.description=${this.search},advert.city.name=${this.search},advert.user.mobile=${this.search},advert.user.email=${this.search}`
        if (this.type.type === 'adverts' && this.search) filter = `mobile=${this.search},advertable.job=${this.search},advertable.price=${this.search},advertable.maxAmount=${this.search},advertable.amount=${this.search},title=${this.search},text=${this.search},advertableId=${this.search},id=${this.search},description=${this.search},city.name=${this.search},user.mobile=${this.search},user.email=${this.search}`

        let include = 'advert.user.details,guaranteeType,guaranteeTypes,advert.city,loanType,loanTypes';
        if (this.type.type === 'adverts') include = 'user.details,guaranteeType,guaranteeTypes,city,loanType,loanTypes';
        let {sortBy, descending, page, rowsPerPage} = this.pagination;
        let query = {
          page,
          advertableType,
          include,
          filter,
          orderBy: `${sortBy || 'id'}:${descending ? 'desc' : 'asc'}`,
          number: rowsPerPage
        }
        this.tableLoader = true;
        //console.log({method, query, paginator: this.paginator}, {sortBy, descending, page, rowsPerPage});
        this.$axios.$get(method, {
          params: query
        }).then((response) => {
          this.paginator = _.get(response, 'paginator', {})
          this.list = _.get(response, 'data', [])
          this.totalData = _.get(response, 'paginator.totalCount', 0)
          //this.pages = _.get(response, 'paginator.totalPages', 0)
          this.tableLoader = false;
          //console.log('on response: ', this.paginator, this.pagination)
        }).catch((error) => {
          //console.log(error, method, query, this.paginator);
          this.tableLoader = false;
        });
      },
      changeTradeStatus(id, item, type, itemId = null) {
        //console.log(id, type, itemId)
        let val = type;
        if (this.isAdmin) {
          this.tableLoader = true;
          let itemType = Helper.getAdvertType(item, null, true);
          let advertId = _.get(item, 'advertableId', _.get(item, 'id', id))
          let data = {tradeStatus: val}
          let method = `/${this.panel}/${itemType.type}/${advertId}`;
          this.$axios.$put(method, data).then((res) => {
            let index = 0;
            if (this.isAdverts) {
              index = _.findIndex(this.list, {id: id});
            } else {
              index = _.findIndex(this.list, {id: advertId});
            }
            let path = this.isAdverts ? 'tradeStatus' : 'advert.tradeStatus'
            _.set(this.list[index], path, val);
            this.tableLoader = false;
          }).catch(err => {
            this.tableLoader = false;
          })
        } else {
          this.tableLoader = true;
          let method = `/${this.panel}/adverts/${id}/changeTradeStatus/${type}`
          this.$axios.$put(method).then((res) => {
            if (this.type.type === 'adverts') {
              let index = _.findIndex(this.list, {id: id});
              this.list[index].tradeStatus = type;
            } else if (itemId) {
              let index = _.findIndex(this.list, {id: itemId});
              this.list[index].advert.tradeStatus = type;
            }
            this.tableLoader = false;
          }).catch(err => {
            this.tableLoader = false;
          })
        }
      },
      getPrice(val) {
        return Helper.priceFormat(val)
      },
      getProperty(item = [], path = '', alias = '-') {
        return _.get(item, path, alias)
      },
      verified(item) {
        return _.get(item, 'verified', _.get(item, 'advert.verified', '')) ? 'تایید شده' : 'تایید نشده';
      },
      tradeStatus(item) {
        let list = this.$store.state.settings.adverts.tradeStatusList;
        return list[_.get(item, 'tradeStatus', _.get(item, 'advert.tradeStatus'), 0)];
      },
      instant(item, getBoolean = false) {
        return (getBoolean) ? ( !!_.get(item, 'advert.instant', _.get(item, 'instant', false))) :
          ( !!_.get(item, 'advert.instant', _.get(item, 'instant', false)) ? 'فوری' : 'غیر فوری')
      },
      ladderable(item, getBoolean = false) {
        return (getBoolean) ? ( !!_.get(item, 'advert.ladderable', _.get(item, 'ladderable', false))) :
          ( !!_.get(item, 'advert.ladderable', _.get(item, 'ladderable', false)) ? 'فعال' : 'غیر فعال')
      },
      changeInstant(id, val = 1, item = [], type = '') {
        if (this.isAdmin) {
          this.tableLoader = true;
          let itemType = Helper.getAdvertType(item, null, true);
          let advertId = _.get(item, 'advertableId', _.get(item, 'id', id))
          let data = {instant: val === 1}
          let method = `/${this.panel}/${itemType.type}/${advertId}`;

          //console.log(1, id, val, this.list, item, advertId, itemType)

          this.$axios.$put(method, data).then((res) => {

            let index = 0;
            if (this.isAdverts) {
              index = _.findIndex(this.list, {id: id});
            } else {
              index = _.findIndex(this.list, {id: advertId});
            }
            let path = this.isAdverts ? 'instant' : 'advert.instant'
            _.set(this.list[index], path, val);

            this.tableLoader = false;
          }).catch(err => {
            this.tableLoader = false;
          })

        } else if (val === 1 && confirm('آیا مطمئن هستید می خواهید این آگهی را فوری کنید؟')) {
          let method = val === 1 ? `/${this.panel}/adverts/${id}/instantPaymentLink` : `/${this.panel}/adverts/${id}/unInstantIt`;
          let query = {
            port: 'zarinpal'
          }
          this.$axios.$put(method, query).then((res) => {
            let link = _.get(res, 'data.paymentLink', '#')
            window.location = link
          }).catch(err => {
            this.tableLoader = false;
          })
        } else if (val === 2) {
          alert('امکان غیرفوری کردن وجود ندارد. در صورتی که مصمم هستید با پشتیبان تماس بگیرید.');
        }
      },
      changeLadderable(id, val = 1, item = [], type = '') {
        if (this.isAdmin) {
          this.tableLoader = true;
          let itemType = Helper.getAdvertType(item, null, true);
          let advertId = _.get(item, 'advertableId', _.get(item, 'id', id))
          let data = {ladderable: val === 1 ? 1 : 0}
          let method = `/${this.panel}/${itemType.type}/${advertId}`;
          this.$axios.$put(method, data).then((res) => {

            let index = 0;
            if (this.isAdverts) {
              index = _.findIndex(this.list, {id: id});
            } else {
              index = _.findIndex(this.list, {id: advertId});
            }

            let path = this.isAdverts ? 'ladderable' : 'advert.ladderable'
            _.set(this.list[index], path, val);
            this.tableLoader = false;
          }).catch(err => {
            this.tableLoader = false;
          })
        } else if (val === 1 && confirm('آیا مطمئن هستید می خواهید این آگهی را نردبان کنید؟')) {
          let method = val === 1 ? `/${this.panel}/adverts/${id}/ladderPaymentLink` : `/${this.panel}/adverts/${id}/unLadderIt`;
          let query = {
            port: 'zarinpal'
          }
          this.$axios.$put(method, query).then((res) => {
            let link = _.get(res, 'data.paymentLink', '#')
            window.location = link
          }).catch(err => {
            this.tableLoader = false;
          })
        } else if (val === 2) {
          alert('امکان برداشتن نردبان وجود ندارد. در صورتی که مصمم هستید با پشتیبان تماس بگیرید.');
        }
      },
      changeVerified(id, val, item, which = null) {
        if (this.isAdmin) {
          this.tableLoader = true;
          let itemType = Helper.getAdvertType(item, null, true);
          let advertId = id;
          let data = {verified: val === 1}
          let method = `/${this.panel}/${itemType.type}/${advertId}`;
          this.$axios.$put(method, data).then((res) => {
            let index = _.findIndex(this.list, {id: advertId});
            console.log(22, id, advertId, index)
            let path = this.isAdverts ? 'verified' : 'advert.verified'
            _.set(this.list[index], path, val);
            this.tableLoader = false;
          }).catch(err => {
            this.tableLoader = false;
          })
        }
      },
      sender(props) {
        let msg;
        if (_.has(props.item, 'advert.adminId') || _.has(props.item, 'adminId')) {
          let id = _.get(props.item, 'advert.adminId', _.get(props.item, 'adminId', 'نامشخص')) || '-';
          msg = `مدیر` + '\n' + 'شناسه: ' + id
        } else {
          msg = `کاربر` + '\n' + 'موبایل: ' + _.get(props.item, 'user.mobile', _.get(props.item, 'advert.user.mobile', '-'))
        }
        return msg;
      },
      getGuaranteeTypes(key) {
        let items = [];
        let list = this.$store.state.guaranteeType.data;
        _.forEach(key, (item) => {
          if (item) {
            items.push(item.name);
          }
        })
        return _.toString(items) || key;
      },
      getForBank(item) {
        return _.get(item, 'forBank', false) ? 'بله' : 'خیر'
      },
      getForCourt(item) {
        return _.get(item, 'forCourt', false) ? 'بله' : 'خیر'
      },
      isDeleted(item) {
        return !!(_.get(item, 'jDeletedAt', null) )
      },
      deleteItems(type = null) {
        if (confirm('آیا مطمئن هستید که می خواهید این موارد را حذف کنید؟')) {
          _.forEach(this.selected, (obj, key) => {
            this.deleteById(_.get(obj, 'id', ''), type);
          })
        }
      },
      deleteItem(id, type = null) {
        if (confirm('آیا مطمئن هستید که می خواهید این مورد را حذف کنید؟')) {
          this.deleteById(id, type)
        }
      },
      deleteById: function (id, type = null) {
        let deletePath = `/${this.panel}/${type ? type : this.type.type}/${id}`;
        _.remove(this.data, function (obj) {
          return _.get(obj, 'id', '') === id;
        });
        this.tableLoader = true;
        this.$axios.$delete(deletePath).then(() => {
          this.$store.commit('snackbar/setSnack', 'با موفقیت حذف شد', 'success')
          this.selected = [];
          this.tableLoader = false;
        }).catch((err) => {
          this.tableLoader = false;
          this.$store.commit('snackbar/setSnack', _.get(err, 'response.data.error.message', 'مشکلی در حذف کردن پیش آمد'), 'error')
        })
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
    }
  }
</script>
