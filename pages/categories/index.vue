<template>
  <AdvertCategory which="adverts" :initialItems="items" :initialPaginator="paginator"/>
</template>
<script>

  import AdvertCategory from "~/components/site/AdvertCategory"
  import Helper from "~/assets/js/helper.js"

  const number = 25

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
      let cursor
      cursor = 0
      let include = 'advertable,city,user.details,loanType,guaranteeTypes';
      let query = {
        orderBy: 'priority:desc',
        number,
        include
      }
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
