<template>
  <div>
    <dashboard/>
  </div>
</template>
<script>
import Dashboard from "~/components/user/dashboard/dashboard.vue"

export default {
  meta: {
    title: 'حساب کاربری',
    breadcrumb: 'پروفایل'
  },
  components: { Dashboard },
  layout: "user"
}
</script>
