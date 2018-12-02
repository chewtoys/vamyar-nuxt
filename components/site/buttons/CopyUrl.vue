<template>
  <span>
    <no-ssr>
      <v-btn
        v-clipboard:copy="thingToCopy" v-clipboard:success="handleCopyStatus(true)"
        v-clipboard:error="handleCopyStatus(false)" :loading="loading" ripple
        class="elevation-2"
        color="success"
        round
        @click="copy"
      >
        <v-icon>{{ icon }}</v-icon>
        <span class="px-1">{{ text }}</span>
      </v-btn>
    </no-ssr>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        text: "کپی کردن آدرس صفحه",
        text1: "کپی آدرس صفحه",
        text2: "کپی شد",
        loading: false,
        disabled: false,
        icon: "file_copy",
        icon1: "file_copy",
        icon2: "check_circle",
        copySucceeded: false,
        thingToCopy: null
      }
    },
    mounted() {
      this.thingToCopy = document.location
    },
    methods: {
      handleCopyStatus(status) {
        this.copySucceeded = status
      },
      copy() {
        this.loading = true
        // send to API
        setTimeout(() => {
          this.icon = this.icon2
          this.text = this.text2
          this.loading = false
        }, 1000)
      }
    }
  }
</script>
