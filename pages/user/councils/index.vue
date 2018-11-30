<template>
  <div>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-alert
            :value="true"
            color="info"
            icon="info"
          >{{ page_title }}
          </v-alert>
          <v-divider class="my-3"/>
          <v-card dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
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
            درخواست مشاوره
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
          :loading="loading"
          :search="search"
          :pagination.sync="pagination"
          :total-items="totalData"
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
            <td class="text-xs-right">{{ getCity(props.item) }}</td>
            <td class="text-xs-right">{{ props.item.job }}</td>
            <td class="text-xs-right">{{ requestType(props.item.requestType) }}</td>
            <td class="text-xs-right">
              <div v-html="nl2br(props.item.job)"></div>
            </td>
            <td class="text-xs-right">{{ props.item.jUpdatedAt }}</td>
            <td class="text-xs-left">
              <a title="مشاهده و پاسخ" :href=" uri + '/show/' + props.item.id" class="mx-1">
                <v-icon
                  small
                >
                  reply
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

  const page_title = 'درخواست مشاوره',
    breadcrumb = 'لیست مشاوره',
    indexPath = '/user/councils',
    createPath = '/user/councils/create',
    councilRequestTypes = '/councilRequestTypes',
    cityMethod = '/cities?number=3000'

  headers = [
    {text: 'شناسه', value: 'id', align: 'right'},
    {text: 'شهر', value: 'city', align: 'right'},
    {text: 'شغل', value: 'job', align: 'right'},
    {text: 'نوع', sortable: false, type: 'requestType', align: 'right'},
    {text: 'متن درخواست', value: 'status', sortable: true, align: 'right'},
    {text: 'تاریخ ثبت', value: 'jUpdatedAt', sortable: true, align: 'right'},
    {text: 'عملیات', sortable: false, align: 'left'},
  ]

  export default {
    meta: {
      title: page_title,
      breadcrumb: breadcrumb
    },
    data: () => ({
      headers,
      data: [],
      totalData: 0,
      loading: true,
      pagination: {page: 1}, //pagination is for vuetify - paginator is for API
      paginator: {totalPages: 1}, //pagination is for vuetify - paginator is for API
      page_title,
      selected: [],
      search: '',
    }),
    computed: {
      getCity(item) {
        return _.get(item, 'city.name');
      },
      getType(item) {

      },
      pages() {
        return _.get(this.paginator, 'totalPages', 1)
      },
      uri() {
        return indexPath;
      },
      headers() {
        return headers;
      }
    },
    mounted() {
      return this.pagination = {
        sortBy: 'id',
        descending: true,
        rowsPerPage: _.get(this.$store.state.settings, 'tickets.count', 10)
      }
    },
    watch: {
      pagination: {
        handler() {
          this.loading = true;
          let method = indexPath;
          let {sortBy, descending, page, rowsPerPage} = this.pagination;
          let query = {
            page,
            orderBy: `${sortBy || 'id'}:${descending ? 'desc' : 'asc'}`,
            number: rowsPerPage
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
        deep: true
      },

    },
    async asyncData({params, store, $axios}) {
      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);

        // loan types
        let councilTypes = await
          $axios.$get(councilRequestTypes);
        store.commit('councilTypes/setAndProcessData', councilTypes.data || []);
      } catch (error) {
        console.log('error', error)
      }
      return {
        cities: _.get(store.state, 'city.arrayList', []),
        requestTypeList: _.get(store.state, 'councilTypes.arrayList', []),
      }
    },
    methods: {

      requestType(id) {
        let list = this.$store.state.councilTypes.data;
        let index = _.findIndex(list, {id});
        let item = list[index];
        return _.get(item, 'title', '');
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
        let deletePath = `${indexPath}/${id}`;
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
      },
      getLink(id) {
        return `${index}/${id}`
      }
    }
  }
</script>
