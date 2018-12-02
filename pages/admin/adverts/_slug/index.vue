<template>
  <div>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ page_title }}</v-toolbar-title>
          <v-spacer/>
          <v-btn
            color="red" outline light round class="mb-2"
            @click="deleteItems">
            <v-icon
              class="mx-1"
              small
            >delete
            </v-icon>
            حذف انتخاب شده ها
          </v-btn>
          <v-btn :to="uri+`/create`" color="green" outline light round class="mb-2">
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
          v-model="selected"
          item-key="id"
          select-all
          :headers="headers"
          :items="list"
          :pagination.sync="pagination"
          :total-items="totalData"
          :search="search"
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
            <td class="text-xs-left">{{ sender(props) }}</td>
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
              <td class="text-xs-left">{{ getType(getProperty(props, 'item.type')) }}</td>
              <td class="text-xs-left">{{ getGuaranteeTypes(getProperty(props, 'item.guaranteeTypes')) }}</td>
            </template>
            <template v-if="type.type=='coSignerRequests'">
              <td class="text-xs-left">{{ getType(getProperty(props, 'item.type')) }}</td>
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
                  {{ tradeStatus(getProperty(props, 'item', [])) }}
                </v-btn>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.advert.id'),0)"
                  >
                    <v-list-tile-title>باز</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.advert.id'),1)"
                  >
                    <v-list-tile-title>در حال معامله</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeTradeStatus(getProperty(props, 'item.advert.id'),2)"
                  >
                    <v-list-tile-title>بسته شده</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

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
                    @click="changeInstant(getProperty(props, 'item.advert.id'),1,props.item)"
                  >
                    <v-list-tile-title>فوری</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile
                    @click="changeInstant(getProperty(props, 'item.advert.id'),0,props.item)"
                  >
                    <v-list-tile-title>غیر فوری</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-menu offset-y>
                <v-btn
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
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
  import Helper from "~/assets/js/helper.js"

  const
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    data: () => ({
      list: [],
      totalData: 10,
      pagination: {page: 1}, //pagination is for vuetify - paginator is for API
      paginator: {totalPages: 1}, //pagination is for vuetify - paginator is for API
      slug: '',
      selected: [],
      search: '',
      submit_loader: false,
    }),
    async asyncData({params, app, store, $axios}) {
      let slug = params.slug;
      let type = Helper.getTypeByAlias(slug);
      const breadcrumb = Helper.getBreadcrumb(type.title),
        page_title = Helper.getPageTitle(type.title);
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
      store.commit("navigation/setTitle", page_title);
      try {
        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);
        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);
      } catch (err) {
        //error({statusCode: 'این صفحه فعال نمی باشد.'})
      }
      return {
        breadcrumb,
        page_title,
        type,
        slug
      }
    },
    computed: {
      pages() {
        return _.get(this, 'paginator.totalPages', 1)
      },
      uri() {
        return `/admin/adverts/${this.slug}`;
      },
      headers() {
        let id = {text: "شناسه", align: "right", value: 'id'};
        let owner = {text: "ثبت شده توسط", align: "right", value: 'advert.user.id'};
        let result = [];
        result = Helper.getRawHeaders(this.type.type);
        result.unshift(owner);
        result.unshift(id);
        return result;
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
        descending: true,
        rowsPerPage: 25,
      }
    },
    watch: {
      pagination: {
        handler() {
          this.loading = true;
          let method = `/admin/${this.type.type}`;
          let advertableType = this.type.advertType;
          let include = 'advert.user.details';
          let {sortBy, descending, page, rowsPerPage} = this.pagination;
          let query = {
            page,
            advertableType,
            include,
            orderBy: `${sortBy || 'id'}:${descending ? 'desc' : 'asc'}`,
            number: rowsPerPage
          }
          //console.log({method, query, paginator: this.paginator}, {sortBy, descending, page, rowsPerPage});
          this.$axios.$get(method, {
            params: query
          }).then((response) => {

            this.paginator = _.get(response, 'paginator', {})
            this.list = _.get(response, 'data', [])
            this.totalData = _.get(response, 'paginator.totalCount', 0)

            //  console.log('on response: ', this.totalData, this.paginator, this.data, {response})
          }).catch((error) => {
            //console.log(error, method, query, this.paginator);

          }).then(() => {
            this.loading = false;
          })
        },
        deep: true
      },
    },
    methods: {
      chageTradeStatus(id, type) {
        let method = `/admin/adverts/${id}/changeTradeStatus/${type}`
        this.$axios.$put(method).then((res) => {

        }).catch(err => {

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
        return list[item.tradeStaus || 0];
      },
      instant(item) {
        return !!_.get(item, 'advert.instant', _.get(item, 'instant', false)) ? 'فوری' : 'غیر فوری'
      },
      changeInstant(id, val) {
        let method = `/admin/adverts/${id}/instantIt`
        this.$axios.$put(method, {instant: val}).then((res) => {
          item.instant = val;
        }).catch(err => {
        })
      },
      changeVerified(id, val, item) {
        let method = `/admin/${this.type.type}/${id}`
        this.$axios.$put(method, {verified: val}).then((res) => {
          item.verified = val;
        }).catch(err => {
        })
      },
      sender(props) {
        return _.get(props.item, 'advert.user.details.firstName',
          _.get(props.item, 'advert.user.mobile',
            _.get(props.item, 'advert.user.email',
              _.get(props.item, 'advert.user.id', 'بدون مشخصات'))))
      },
      getGuaranteeTypes(key) {
        let items = [];
        let list = this.$store.state.guaranteeType.data;
        _.forEach(key, (id) => {
          let index = _.findIndex(list, {id});
          let item = list[index];
          items.push(item.name)
        })
        return _.toString(items) || key;
      },
      getType(key) {
        let list = this.$store.state.settings.coSigner.types;
        let index = _.findIndex(list, {id: key});
        let item = list[index];
        return _.get(item, 'name', '');
      },
      deleteItems() {
        if (confirm('آیا مطمئن هستید که می خواهید این موارد را حذف کنید؟')) {
          _.forEach(this.selected, (obj, key) => {
            this.deleteById(_.get(obj, 'id', ''));
          })
        }
      },
      deleteItem(id) {
        if (confirm('آیا مطمئن هستید که می خواهید این مورد را حذف کنید؟')) {
          this.deleteById(id)
        }
      },
      deleteById: function (id) {
        let deletePath = `/admin/${this.type.type}/${id}`;
        _.remove(this.data, function (obj) {
          return _.get(obj, 'id', '') === id;
        });

        this.$axios.$delete(deletePath).then(() => {
          this.$store.commit('snackbar/setSnack', 'با موفقیت حذف شد', 'success')
          this.selected = [];
        }).catch((err) => {
          this.$store.commit('snackbar/setSnack', _.get(err, 'response.data.error.message', 'مشکلی در حذف کردن پیش آمد'), 'error')
        })
      }
    },
    $_veeValidate: {
      validator: "new"
    }
  }
</script>
