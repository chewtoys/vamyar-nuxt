<template>
  <v-btn :loading="loading" ripple class="elevation-2" color="error" round @click="bookmark">
    <v-icon>{{ icon }}</v-icon>
    <span class="px-1">{{ text }}</span>
  </v-btn>
</template>
<script>
import Cookie from "js-cookie"

export default {
  data() {
    return {
      text: "نشانه گذاری این آگهی",
      text1: "نشانه گذاری این آگهی",
      text2: "حذف نشانه گذاری",
      loading: false,
      disabled: false,
      icon: "bookmark",
      icon1: "bookmark",
      icon2: "remove",
      bookmarked: false
    }
  },
  computed: {
    key: () => {
      return "bookmark." + document.location.pathname
    }
  },
  mounted() {
    let key = this.key
    let bookmarked = Cookie.get(key)
    if (bookmarked) {
      this.bookmarked = true
      this.icon = this.icon2
      this.text = this.text2
    }
  },
  methods: {
    bookmark() {
      if (this.bookmarked) {
        this.bookmarked = false
        this.loading = true
        setTimeout(() => {
          let key = this.key
          Cookie.remove(key)
          this.icon = this.icon1
          this.text = this.text1
          this.loading = false
        }, 2000)
      } else {
        this.loading = true
        // send to API
        setTimeout(() => {
          this.bookmarked = true
          this.loading = false
          this.disabled = true
          this.icon = this.icon2
          this.text = this.text2
          let key = this.key
          Cookie.set(key, true)
        }, 1000)
      }
    }
  }
}
</script>
