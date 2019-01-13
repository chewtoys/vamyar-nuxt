<template>
  <AdvertForm :formType="formType" :data="data" action="create" panel="admin"/>
</template>
<script>

  import Helper from '~/assets/js/helper'
  import AdvertForm from '~/components/AdvertForm'

  const provinceMethod = '/provinces?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'
  export default {
    data: () => ({
      data: [],
      formType: [],
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
        // province
        let provinceData = await $axios.$get(provinceMethod);
        store.commit('province/setAndProcessData', provinceData.data || []);

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);

      } catch (err) {
        console.log(err)
        //return error({statusCode: 503, message: 'مشکل در گرفتن داده های اولیه :('})
      }
      return {
        formType,
        slug,
      }
    },
    components: {AdvertForm}
  }
</script>
