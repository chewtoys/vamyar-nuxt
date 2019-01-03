<template>
  <div>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ page_title }}</v-toolbar-title>
          <v-spacer/>

          <v-btn :to="uri+`/create`" color="green" outline light round class="mb-2">
            <v-icon class="mx-1" small>create</v-icon>
            درخواست مشاوره
          </v-btn>
        </v-toolbar>

        <v-data-table
          v-model="selected"
          item-key="id"
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
            <td class="text-xs-right">
              <v-btn color="success" target="_blank" :href="props.item.link">لینک شما: {{ props.item.link }}</v-btn>
            </td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">
              <div v-html="nl2br(props.item.requestText)"></div>
            </td>
            <td class="text-xs-right">{{ getCity(props.item) }}</td>
            <td class="text-xs-right">{{ props.item.job }}</td>

            <td class="text-xs-right">{{ (props.item.requestType.title) }}</td>

            <td class="text-xs-right">{{ props.item.jUpdatedAt }}</td>

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
    cityMethod = '/cities?number=3000',
    headers = [
      {text: 'لینک', value: 'link', align: 'center'},
      {text: 'عنوان', value: 'title', align: 'right'},
      {text: 'متن درخواست', value: 'requestText', sortable: true, align: 'right'},
      {text: 'شهر', value: 'city', align: 'right'},
      {text: 'شغل', value: 'job', align: 'right'},
      {text: 'نوع', sortable: false, type: 'requestType', align: 'right'},
      {text: 'تاریخ ثبت', value: 'jUpdatedAt', sortable: true, align: 'right'},
    ]

  export default {
    meta: {
      title: page_title,
      breadcrumb: breadcrumb
    },
    data: () => ({
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
            number: rowsPerPage,
            include: 'city,requestType'
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
        // let councilTypes = await
        //   $axios.$get(councilRequestTypes);
        // store.commit('councilTypes/setAndProcessData', councilTypes.data || []);
      } catch (error) {
        console.log('error', error)
      }
    },
    methods: {
      nl2br(val) {
        return Helper.nl2br(val)
      },
      getCity(item) {
        return _.get(item, 'city.name', _.get(_.find(_.get(this.$store.state.city, 'data', []), {id: item.cityId}), 'name', item.cityId));
      },
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
