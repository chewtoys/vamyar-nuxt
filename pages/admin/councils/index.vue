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
        </v-toolbar>
        <v-card-title>
          <div v-if="false">
            جست‌و‌جو
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="چیزی بنویسید"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-card-title>

        <v-data-table
          v-model="selected"
          item-key="id"
          select-all
          :headers="headers"
          :items="data"
          :hide-actions="hideActions"
          :pagination.sync="pagination"
          :total-items="totalItems"
          :loading="loading"
          :rows-per-page-items="[10,25,100]"
          no-results-text="هیچ موردی ثبت نشده است."
          class="elevation-1"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
              <span>
          {{ props.header.text }}
        </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">
              <p>شناسه:
                <nuxt-link :to="`/admin/users/edit/${props.item.userId}`">{{props.item.userId}}</nuxt-link>
              </p>
              <p>موبایل: {{props.item.user.mobile}}</p>
            </td>
            <td class="text-xs-right">{{ props.item.job }}</td>
            <td class="text-xs-right">{{ getprovince(props.item) }}</td>
            <td class="text-xs-right">{{ requestType(props.item.requestType) }}</td>
            <td class="text-xs-right" v-html="nl2br(props.item.requestText)"></td>

            <td class="text-xs-left">
              <v-icon
                class="mx-1"
                small
                @click="deleteItem(props.item.id)"
              >
                delete
              </v-icon>
            </td>
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

  const page_title = 'لیست درخواست مشاوره ها',
    fetchMethod = '/admin/councils',
    provinceMethod = '/provinces?number=3000',
    breadcrumb = 'مشاوره ها',
    indexPath = '/admin/councils',
    headers = [
      {text: '‌شناسه', value: 'id', align: 'right'},
      {text: 'عنوان', value: 'title', align: 'right'},
      {text: 'کاربر', value: 'userId', align: 'right'},
      {text: 'شغل', value: 'job', align: 'right'},
      {text: 'استان', value: 'province', align: 'right'},
      {text: 'نوع درخواست', value: 'requestType', align: 'right'},
      {text: 'متن درخواست', value: 'requestText', align: 'right'},
      {text: 'عملیات', sortable: false, align: 'left', width: '140px'},
    ]

  export default {
    meta: {
      title: page_title,
      breadcrumb: breadcrumb
    },
    data: () => ({
      data: [],
      totalData: 10,
      loading: true,
      pagination: {page: 1}, //pagination is for vuetify - paginator is for API
      paginator: {totalPages: 1}, //pagination is for vuetify - paginator is for API
      page_title,
      selected: [],
      search: '',
    }),
    computed: {
      totalItems() {
        return _.get(this, 'paginator.totalCount', 1000000) || 1000000;
      },
      hideActions() {
        return this.totalItems < 1 || this.totalItems >= 1000000;
      },
      pages() {
        return _.get(this.paginator, 'totalPages', 1)
      },
      uri() {
        return `${fetchMethod}`;
      },
      headers() {
        return headers;
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
          let method = fetchMethod;
          let {sortBy, descending, page, rowsPerPage} = this.pagination;
          let query = {
            page,
            orderBy: `${sortBy || 'id'}:${descending ? 'desc' : 'asc'}`,
            number: rowsPerPage,
            include: 'province,user,requestType',
          }
          //console.log({method, query, paginator: this.paginator}, {sortBy, descending, page, rowsPerPage});
          this.$axios.$get(method, {
            params: query
          }).then((response) => {
            this.paginator = _.get(response, 'paginator', {})
            this.data = _.get(response, 'data', [])
            this.totalData = _.get(response, 'paginator.totalCount', 0)
            //  console.log('on response: ', this.totalData, this.paginator, this.data, {response})
          }).catch((err) => {
            //console.log(error, method, query, this.paginator);
          }).then(() => {
            this.loading = false;
          })
        },
        deep: true
      },
    },
    async asyncData({params, store, $axios}) {
      try {
        // province
        let provinceData = await $axios.$get(provinceMethod);
        store.commit('province/setAndProcessData', provinceData.data || []);

        // loan types
        // let councilTypes = await
        //   $axios.$get(councilRequestTypes);
        // store.commit('councilTypes/setAndProcessData', councilTypes.data || []);
      } catch (error) {
        console.log('error', error)
      }
    },
    methods: {
      getprovince(item) {
        return _.get(item, 'province.name', _.get(_.find(_.get(this.$store.state.province, 'data', []), {id: item.provinceId}), 'name', item.provinceId));
      },
      requestType(req) {
        //let list = this.$store.state.councilTypes.data;
        //let index = _.findIndex(list, {id});
        //let item = list[index];
        return _.get(req, 'title', '');
      },
      nl2br(val) {
        return Helper.nl2br(val);
      },
      getPrice(price) {
        return Helper.priceFormat(price)
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
        let deletePath = `${fetchMethod}/${id}`;
        //console.log(deletePath)
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
    }
  }
</script>
