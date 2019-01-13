<template>
  <AdvertCategory :which="type.type" :initialItems="items" :initialPaginator="paginator"/>
</template>
<script>
  //import axios from 'axios'
  // /site/adverts?advertableType=loan&include=advertable

  import AdvertCategory from "~/components/site/AdvertCategory"
  import Helper from "~/assets/js/helper.js"

  const number = 24,
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    meta: {
      title: 'لیست آگهی ها',
      breadcrumb: 'لیست'
    },
    data() {
      return {
        items: [],
        paginator: {},
        slug: '',
        type: null
      }
    },
    // loading the first items from server
    async asyncData({app, store, params, error, route, $axios}) {
      let slug = params.slug;
      let type = Helper.getTypeByAlias(slug);
      let method = `/site/${type.type}`
      let orderBy = 'advert.priority:desc'
      let commonComputedFilters = [];
      let computedFilters = [];
      let advertTypeName = type.type;

      try {
        commonComputedFilters = JSON.parse(_.get(route.query, 'commonComputedFilters', '{}'));
        computedFilters = JSON.parse(_.get(route.query, 'computedFilters', '{}'));
      } catch (err) {
        console.log({err})
        error({statusCode: 503, message: 'مشکل در اعمال فیلتر های صفحه'})
      }

      let query = Helper.getComputedFilters(commonComputedFilters, computedFilters, advertTypeName, false, number, orderBy)

      try {
        // city
        let cityData = await
          $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);
        let {data, paginator} = await
          app.$axios.$get(method, {
            params: query
          })
        let loading = false
        return {items: data, paginator, slug, type}
      } catch (err) {
        console.log(err);
        return {slug, type, items: [], paginator: [], msg: 'مشکلی در گرفتن آگهی ها پیش آمد.', loading: false}
      }
    }
    ,
    //watchQuery: ['advertTypeName', 'commonComputedFilters', 'computedFilters'],
    components: {
      AdvertCategory
    }
  }
</script>
