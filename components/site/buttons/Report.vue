<template>
  <v-btn :loading="loading" :disabled="disabled" ripple class="elevation-2" color="warning" round @click="report">
    <v-icon>{{ icon }}</v-icon>
    <span class="px-1">{{ text }}</span>
  </v-btn>
</template>
<script>
import Cookie from "js-cookie"

export default {
  data() {
    return {
      text: "گزارش این آگهی",
      text2: "با تشکر! بررسی خواهد شد.",
      loading: false,
      disabled: false,
      icon: "report"
    }
  },
  mounted() {
    let key = "report:" + document.location.pathname
    let reported = Cookie.get(key)
    if (reported) {
      this.disabled = true
      this.icon = "queue"
      this.text = this.text2
    }
  },
  methods: {
    report() {
      this.loading = true
      // send to API
      setTimeout(() => {
        this.loading = false
        this.disabled = true
        this.icon = "queue"
        this.text = this.text2
        let key = "report:" + document.location.pathname
        Cookie.set(key, true)
      }, 200)
    }
  }
}
</script>
