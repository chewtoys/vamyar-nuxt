<template>
  <div>
    <dashboard/>
  </div>
</template>
<script>
  import Dashboard from "~/components/admin/dashboard/dashboard.vue"

  const
    provinceIdprovinceMethod = '/provinces?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    meta: {
      title: 'داشبورد',
      breadcrumb: 'مدیریت'
    },
    async asyncData({params, store, $axios, error}) {
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
        //console.log('error', error)
        //return error({statusCode: 404, message: 'آگهی یافت نشد :('})
      }
    },
    components: {Dashboard},
    layout: "admin"
  }
</script>
