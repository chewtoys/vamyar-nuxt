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
          <div>
            جست‌و‌جو
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              @change="initPage"
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
          :loading="loading"
          :hide-actions="hideActions"
          :pagination.sync="pagination"
          :total-items="totalItems"
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
            <td class="text-xs-right">{{ props.item.discount ? (props.item.discount + '%') : '-' }}</td>
            <td class="text-xs-right">{{ props.item.code }}</td>
            <td class="text-xs-right">
              <span v-if="props.item.userId">
              <p>شناسه:
                <nuxt-link :to="`/admin/users/edit/${props.item.userId}`">{{ props.item.userId }}</nuxt-link>
              </p>
              <p>موبایل:
                {{props.item.user.mobile }}
              </p></span><span v-else>
              <p>همه ی کاربران</p>
            </span>
            </td>
            <td class="text-xs-right">{{ (props.item.oneTimeUsage ? 'بله' : 'خیر') }}</td>
            <td class="text-xs-right">{{ jDate(props.item.expireDate) }}</td>
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

  const moment = require('moment-jalaali');
  const page_title = 'لیست تخفیف ها',
    fetchMethod = '/admin/coupons',
    breadcrumb = 'کوپون ها',
    indexPath = '/admin/coupons',
    createPath = '/admin/coupons/create',
    headers = [
      {text: '‌شناسه', value: 'id', align: 'right'},
      {text: 'تخفیف', value: 'discount', align: 'right'},
      {text: 'کد', value: 'code', align: 'right'},
      {text: 'کاربر', value: 'userId', align: 'right'},
      {text: 'یکبار مصرف؟', value: 'oneTimeUsage', align: 'right'},
      {text: 'انقضا', value: 'expireDate', align: 'right'},
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
      }
    },
    watch: {
      pagination: {
        handler() {
          this.initPage()
        },
        deep: true
      },
    },
    methods: {
      initPage() {
        this.loading = true;
        let method = fetchMethod;
        let {sortBy, descending, page, rowsPerPage} = this.pagination;
        let include = 'user'
        let filter;
        if (this.search) filter = `id=${this.search},code=${this.search},userId=${this.search},discount=${this.search}`
        let query = {
          page,
          filter,
          include,
          orderBy: `${sortBy || 'id'}:${descending ? 'desc' : 'asc'}`,
          number: rowsPerPage,
        }
        //console.log({method, query, paginator: this.paginator}, {sortBy, descending, page, rowsPerPage});
        this.$axios.$get(method, {
          params: query
        }).then((response) => {
          this.paginator = _.get(response, 'paginator', {})
          this.data = _.get(response, 'data', [])
          this.totalData = _.get(response, 'paginator.totalCount', 0)
          //  console.log('on response: ', this.totalData, this.paginator, this.data, {response})
        }).catch((error) => {
          //console.log(error, method, query, this.paginator);
        }).then(() => {
          this.loading = false;
        })
      },
      jDate(val) {
        if (!val) return '-';
        try {
          let m = moment(val, 'YYYY-M-D HH:mm:ss')
          return (m.isValid()) ? m.format('jYYYY/jM/jD HH:mm') : val;
        } catch (err) {
          //console.log(err, val)
          return val;
        }
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
