<template>
  <AdvertCategory which="adverts" :initialItems="items" :initialPaginator="paginator"/>
</template>
<script>

  import AdvertCategory from "~/components/site/AdvertCategory"
  import Helper from "~/assets/js/helper.js"

  const number = 24

  export default {
    meta: {
      title: 'لیست تمام آگهی ها',
      breadcrumb: 'لیست'
    },
    data() {
      return {
        items: [],
        paginator: [],
      }
    },
    watch: {},
    // loading the first items from server
    async asyncData({app, store, params, error, $axios}) {
      let method = `/site/adverts`
      let commonComputedFilters = [];
      let computedFilters = [];
      let advertTypeName;
      let orderBy = 'priority:desc'
      try {
        commonComputedFilters = JSON.parse(_.get($route.query, 'commonComputedFilters', '{}'));
        computedFilters = JSON.parse(_.get($route.query, 'computedFilters', '{}'));
        advertTypeName = _.get($route.query, 'advertTypeName', 'adverts');
      } catch (err) {
        console.log({err})
        error({statusCode: 503, message: 'مشکل در اعمال فیلتر های صفحه'})
      }

      let query = Helper.getComputedFilters(commonComputedFilters, computedFilters, advertTypeName, true, number, orderBy)

      //console.log({query})
      try {
        let {data, paginator} = await
          app.$axios.$get(method, {
            params: query
          })
        return {items: data, paginator}
      } catch (err) {
        console.log(err);
        return {items: [], paginator: [], msg: 'مشکلی در گرفتن آگهی ها پیش آمد.', loading: false}
      }
    },
    components: {
      AdvertCategory
    }
  }
</script>
