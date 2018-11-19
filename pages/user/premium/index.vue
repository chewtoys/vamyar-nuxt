<template>
  <v-container fluid grid-list-xs>
    <v-card class="py-5 px-4" color="white">
      <div>
        <div>
          <h1
            v-if="info.title"
            class="font-14"
          >
            <v-icon class="px-1 grey-text pb-1 font-19">arrow_left</v-icon>
            {{ info.title }}
          </h1>
          <v-divider
            v-if="info.title"
            class="my-3"/>
          <v-card
            v-if="info.text"
            dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify">{{ info.text }}</p>
          </v-card>
          <v-divider
            v-if="info.text"
            class="my-3"/>
        </div>
        <div>
          <v-card v-if="!isPremium" flat>
            <v-card-title><h3>ارتقای حساب کاربری</h3></v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <div v-html="settings('pages.premiumText')">
                </div>
              </v-layout>
            </v-card-text>
            <v-card-actions center-align>
              <v-btn :loading="loader" @click="getForm" color="red" dark>
                <v-icon class="pl-1">shopping_cart</v-icon>
                ارتقای حساب
              </v-btn>
            </v-card-actions>
            <div v-html="form">
            </div>
          </v-card>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
  const gate_path = "/user/is-premium",
    //plans = "/admin/cities",
    page_title = "وضعیت اشتراک من",
    breadcrumb = "اشتراک حساب کاربری"
  const info = {
    title: "وضعیت اشتراک"
    //text: "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
    // heading: 'عنوان متن'
  }
  const benefits =
    "با ارتقای حساب کاربری به حساب ویژه از مزایای زیر برخود از مزایای زیر برخوردار خواهید شد:"
  export default {
    $_veeValidate: {
      validator: "new"
    },
    meta: {
      breadcrumb,
      title: page_title
    },
    data() {
      return {
        benefits,
        loader: false,
        info,
        form: ''
      }
    },
    computed: {
      user() {
        return _.get(this.$store.state, 'user', [])
      },
      isUserPremium() {
        return !!_.get(this.$store.state, 'user.info.details', false)
      },
      redirectPath() {
        let path = _.get(this.$route, 'query.redirect', '');
        return decodeURI(path || "/user");
      },
      isPremium() {
        return false
      }
    },
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      getForm() {
        this.loader = true;
        let query = {
          port: 'zarinpal',
          coupon: '123123',
          subscription: '1',
        }
        this.$axios.$post('/user/subscriptions', query).then(res => {
          this.form = res
          this.loader = false;
        }).catch((err) => {
          console.log(err)
          this.$store.commit('snackbar/setSnack', err)
          this.loader = false;
        })
      },
      upgrade() {
        if (!this.isPremium) {
          let data = this.$axios.get(gate_path)
          // get code and redirect to gate
        } else {
          // alert message
        }
      }
    }
  }
</script>
