<template>
  <div class="rtl __nuxt-error-page">
    <div class="error ">
      <div v-if="statusCode === 404" class="title iransans">
        {{(false && error && error.message ) ? error.message : 'آدرس مورد نظر یافت نشد!'}}
      </div>
      <div v-else-if="statusCode === 401" class="title iransans">
        {{(false && error && error.message ) ? error.message : 'شما به این صفحه دسترسی ندارید!'}}
      </div>
      <div v-else-if="statusCode === 403" class="title iransans">
        {{ (false && error && error.message ) ? error.message : 'آیپی شما مجاز نیست. در صورت استفاده از آیپی ایران با پشتیبانی تماس بگیرید.'}}
      </div>
      <div v-else-if="statusCode === 500" class="title iransans">
        {{ (false && error && error.message ) ? error.message : 'مشکل در ارتباط با سرور'}}
      </div>
      <div v-else-if="statusCode === 530" class="title iransans">
        {{ (false && error && error.message ) ? error.message : 'سایت بسته است'}}
      </div>
      <div v-else="" class="title iransans" v-html=" error.message "></div>
      <p class="description">
        <nuxt-link class="error-link vazir" to="/">برگشت به صفحه‌ی نخست</nuxt-link>
        <br/>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NuxtError",
    props: ["error"],
    head() {
      return {
        title: this.message,
        meta: [
          {
            name: "viewport",
            content:
              "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          }
        ]
      }
    },
    // Only on debug mode
    data() {
      return {
        mounted: false
      }
    },

    computed: {
      statusCode() {
        return (this.error && this.error.statusCode) || 500
      },
      message() {

        let code = this.statusCode
        if (code === 404) return "صفحه‌ی مورد نظر یافت نشد. ۴۰۴"
        if (code === 403) return "دسترسی امکان پذیر نیست. ۴۰۳"
        if (code === 401) return "عدم دسترسی. ۴۰۱"
        if (code === 500) return "سرور با مشکل روبرو شد. ۵۰۰"
        if (code === 530) return "سایت بسته است"
        return `مشکلی پیش آمد. ${code}`
      }
    },
    watch: {
      error(newErr) {
        if (newErr) {
          console.error(newErr)
        }
      }
    },
    mounted() {
      this.mounted = true
    },
    created() {
      console.error(this.error)
    }
  }
</script>

<style>
  .__nuxt-error-page {
    padding: 1rem;
    background: #f7f8fb;
    color: #47494e;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: sans-serif;
    font-weight: 100 !important;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .__nuxt-error-page .error {
    max-width: 450px;
  }

  .__nuxt-error-page .title {
    font-size: 1.5rem;
    margin-top: 15px;
    color: #47494e;
    margin-bottom: 8px;
  }

  .__nuxt-error-page .description {
    color: #7f828b;
    line-height: 21px;
    margin-bottom: 10px;
  }

  .__nuxt-error-page a {
    color: #7f828b !important;
    text-decoration: none;
  }

  .__nuxt-error-page .logo {
    position: fixed;
    left: 12px;
    bottom: 12px;
  }
</style>
