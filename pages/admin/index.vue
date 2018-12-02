<template>
  <div>
    <dashboard/>
  </div>
</template>
<script>
  import Dashboard from "~/components/admin/dashboard/dashboard.vue"

  const
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    meta: {
      title: 'داشبورد',
      breadcrumb: 'مدیریت'
    },
    async asyncData({params, store, $axios, error}) {
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


      } catch (err) {
        //console.log('error', error)
        //return error({statusCode: 404, message: 'آگهی یافت نشد :('})
      }
    },
    components: {Dashboard},
    layout: "admin"
  }
</script>
