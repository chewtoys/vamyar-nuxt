<template>
  <AdvertForm :formType="formType" :data="data" action="edit" :id="id" panel="user"/>
</template>
<script>

  import Helper from '~/assets/js/helper'
  import AdvertForm from '~/components/AdvertForm'

  const provinceMethod = '/provinces?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    data: () => ({
      formType: null,
      id: null,
      data: [],
      slug: null,
    }),
    async asyncData({params, store, $axios, error}) {
      let id = params.id;
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

        // get advert data
        let getPath = `/user/${formType.type}/${id}`;
        let query = {
          include: 'guaranteeTypes,advertable,provinces,loanTypes,advert'
        }
        let {data} = await $axios.$get(getPath, {params: query});
        //console.log('get:', getPath, {params: query}, data)

        return {
          page_title,
          formType,
          data,
          slug,
          id
        }

      } catch (err) {
        return error({statusCode: 404, message: 'آگهی یافت نشد :('})
      }

    },
    components: {AdvertForm}
  }
</script>
