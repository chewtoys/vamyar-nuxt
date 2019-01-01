<template>
  <AdvertCategory :which="type.type" :initialItems="items" :initialPaginator="paginator"/>
</template>
<script>
  //import axios from 'axios'
  // /site/adverts?advertableType=loan&include=advertable

  import AdvertCategory from "~/components/site/AdvertCategory"
  import Helper from "~/assets/js/helper.js"

  const number = 25,
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    meta: {
      title: 'لیست همه ی آگهی ها',
      breadcrumb: 'همه ی آگهی ها'
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
    async asyncData({app, store, params, error, $axios}) {
      let slug = params.slug;
      let type = Helper.getTypeByAlias(slug);
      let method = `/site/${type.type}`
      let cursor
      cursor = 0
      let include = 'advert,city,user.details,loanTypes,guaranteeTypes';
      let query = {
        number,
        include
      }
      try {
        // city
        let cityData = await $axios.$get(cityMethod);
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
    },
    components: {
      AdvertCategory
    }
  }
</script>
