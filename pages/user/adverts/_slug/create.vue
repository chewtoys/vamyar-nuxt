<template>
  <AdvertForm :formType="formType" :data="data" action="create" panel="user"/>
</template>
<script>

  import Helper from '~/assets/js/helper'
  import AdvertForm from '~/components/AdvertForm'

  const cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'
  export default {
    data: () => ({
      data: [],
      formType: null ,
      slug: null,
    }),
    async asyncData({params, store, $axios, error}) {
      let slug = params.slug;
      let formType = Helper.getTypeByAlias(slug);
      const breadcrumb = Helper.getBreadcrumb(formType.title),
        page_title = Helper.getPageTitle(formType.title);
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
      store.commit("navigation/setTitle", page_title);

      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);

        //console.log('get:', getPath, {params: query}, data)
        return {
          formType,
          slug,
        }
      } catch (err) {
        console.log(err)
        return error({statusCode: 503, message: 'آگهی یافت نشد :('})
      }
    },
    components: {AdvertForm}
  }
</script>
