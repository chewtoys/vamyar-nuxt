<template>
  <div>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
          <v-spacer/>
          <v-btn
            v-if="type.type!=='adverts'"
            color="red" outline light round class="mb-2"
            @click="deleteItems">
            <v-icon
              class="mx-1"
              small
            >delete
            </v-icon>
            حذف انتخاب شده ها
          </v-btn>
          <v-btn v-if="type.type!=='adverts'" :to="uri+`/create`" color="green" outline light round class="mb-2">
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
            label="چیزی بنویسید"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-if="type.type==='adverts'"
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

            <td class="text-xs-left">{{ getProperty(props, 'item.id') }}</td>
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
                    @click="changeTradeStatus(getProperty(props, 'item.id'),0)"
                  >
                    <v-list-tile-title>باز</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),1)"
                  >
                    <v-list-tile-title>در حال معامله</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),2)"
                  >
                    <v-list-tile-title>بسته شده</v-list-tile-title>
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
              <a title="مشاهده"
                 :href=" `${uri}/${getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', '')}/show/${props.item.advertableId}`"
                 class="mx-1">
                <v-icon
                  small
                >
                  pageview
                </v-icon>
              </a>
              <a title="ویرایش"
                 :href="`${uri}/${getProperty(getAdvertType(getProperty(props, 'item.advertableType', '')), 'alias', '')}/edit/${props.item.advertableId}`"
                 class="mx-1">
                <v-icon
                  small
                >
                  edit
                </v-icon>
              </a>
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
            <td class="text-xs-left">{{ getProperty(props, 'item.id') }}</td>
            <td v-if="isAdmin" class="text-xs-left">{{ sender(props) }}</td>
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
                    @click="changeTradeStatus(getProperty(props, 'item.id'),0)"
                  >
                    <v-list-tile-title>باز</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),1)"
                  >
                    <v-list-tile-title>در حال معامله</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.id'),2)"
                  >
                    <v-list-tile-title>بسته شده</v-list-tile-title>
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
              <a title="مشاهده" :href=" uri + '/show/' + props.item.id" class="mx-1">
                <v-icon
                  small
                >
                  pageview
                </v-icon>
              </a>
              <a title="ویرایش" :href=" uri + '/edit/' + props.item.id" class="mx-1">
                <v-icon
                  small
                >
                  edit
                </v-icon>
              </a>
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
      search: '',
      submit_loader: false,
      tableLoader: false,
    }),
    computed: {
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

        let include = 'advert.user.details,guaranteeType,advert.city,loanType';
        if (this.type.type === 'adverts') include = 'user.details,guaranteeType,city,loanType';
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
      changeTradeStatus(id, type, item) {
        this.tableLoader = true;
        let method = `/${this.panel}/${this.type.type}/${id}/changeTradeStatus/${type}`
        this.$axios.$put(method).then((res) => {
          let index = _.findIndex(this.list, {id: id});
          this.list[index].tradeStatus = type;
          this.tableLoader = false;
        }).catch(err => {
          this.tableLoader = false;
        })
      },
      getPrice(val) {
        return Helper.priceFormat(val)
      },
      getProperty(item = [], path = '', alias = '-') {
        return _.get(item, path, alias)
      },
      verified(item) {
        return item.verified ? 'تایید شده' : 'تایید نشده';
      },
      tradeStatus(item) {
        let list = this.$store.state.settings.adverts.tradeStatusList;
        return list[item.tradeStatus || 0];
      },
      instant(item) {
        return !!_.get(item, 'advert.instant', _.get(item, 'instant', false)) ? 'فوری' : 'غیر فوری'
      },
      changeInstant(id, val) {
        this.tableLoader = true;
        let method = val === 1 ? `/${this.panel}/adverts/${id}/instantIt` : `/${this.panel}/adverts/${id}/unInstantIt`;
        this.$axios.$put(method).then((res) => {
          let index = _.findIndex(this.list, {id: id});
          this.list[index].instant = val;
          this.tableLoader = false;
          item.instant = val;
        }).catch(err => {
          this.tableLoader = false;
        })
      },
      changeVerified(id, val, item, which = null) {
        if (this.isAdmin) {
          this.tableLoader = true;
          let method = `/${this.panel}/${which ? which : this.type.type}/${id}`
          this.$axios.$put(method, {verified: val}).then((res) => {
            item.verified = val;
            this.tableLoader = false;
          }).catch(err => {
            this.tableLoader = false;
          })
        }
      },
      sender(props) {
        return _.get(props.item, 'advert.user.details.firstName',
          _.get(props.item, 'advert.user.mobile',
            _.get(props.item, 'advert.user.email',
              _.get(props.item, 'user.details.firstName',
                _.get(props.item, 'user.mobile',
                  _.get(props.item, 'user.email',
                    _.get(props.item, 'advert.user.id', 'بدون مشخصات')))))))
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
        return _.get(item, 'forBank', false) ? 'خیر' : 'بله'
      },
      getForCourt(item) {
        return _.get(item, 'forCourt', false) ? 'خیر' : 'بله'
      },
      getType(key) {
        let list = this.$store.state.settings.coSigner.types;
        let index = _.findIndex(list, {id: key});
        let item = list[index];
        return _.get(item, 'name', '');
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
    }
  }
</script>
