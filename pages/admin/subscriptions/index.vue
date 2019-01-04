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
          hide-actions
          :headers="headers"
          :items="data"
          :loading="loading"
          :search="search"
          hide-action
          :total-items="totalData"
          :rows-per-page-items="[25,100]"
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
            <td class="text-xs-right">
              <nuxt-link :to="uri + '/edit/' + props.item.id">{{ props.item.title || '-' }}</nuxt-link>
            </td>
            <td class="text-xs-right">{{ getPrice(props.item.price || '-') }}</td>
            <td class="text-xs-right">{{ (props.item.period || '-') + ' روز' }}</td>

            <td class="text-xs-left">
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
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            نتیجه ای برای "{{ search }}" یافت نشد.
          </v-alert>
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

  const page_title = 'لیست اشتراک ها',
    fetchMethod = '/admin/subscriptionPlans',
    breadcrumb = 'اشتراک ها',
    indexPath = '/admin/subscriptions',
    createPath = '/admin/subscriptions/create',
    headers = [
      {text: '‌شناسه', value: 'id', align: 'right'},
      {text: 'عنوان', value: 'title', align: 'right'},
      {text: 'قیمت', value: 'price', align: 'right'},
      {text: 'مدت', value: 'period', align: 'right'},
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
      pages() {
        return _.get(this.paginator, 'totalPages', 1)
      },
      uri() {
        return `${indexPath}`;
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
          this.loadAgain();
        },
        deep: true
      },
    },
    methods: {
      loadAgain() {

        this.loading = true;
        let method = fetchMethod;
        let {sortBy, descending, page, rowsPerPage} = this.pagination;
        let filter = `id=${this.search},period=${this.search},title=${this.search},description=${this.search}`
        let query = {
          page,
          filter,
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
          this.paginator = {}
          this.data = []
          this.totalData = 0
          //console.log(error, method, query, this.paginator);
        }).then(() => {
          this.loading = false;
        })
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
