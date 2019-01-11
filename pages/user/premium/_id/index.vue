<template>
  <v-container fluid grid-list>
    <v-layout row wrap>
      <v-flex sm2></v-flex>
      <v-flex xs12 sm8>
        <v-card class="py-5 px-4 text-center" color="white">
          <div>
            <h1
              v-if="info.title"
              class="font-14"
            >
              <v-icon class="px-1 grey-text pb-1 font-19">receipt</v-icon>
              {{ info.title }}
            </h1>
            <v-divider
              v-if="info.title"
              class="my-3"/>
            <v-card-text>
              <table class="full oddTable">
                <tbody>
                <tr>
                  <td>
                    <small>عنوان</small>
                  </td>
                  <td><strong>{{getData(data, 'title', 'اشتراک')}}</strong></td>
                </tr>
                <tr>
                  <td>
                    <small>توضیحات</small>
                  </td>
                  <td><strong v-html="nl2br(getData(data, 'text', '-'))"></strong></td>
                </tr>
                <tr>
                  <td>
                    <small>مدت</small>
                  </td>
                  <td><strong>{{getPeriod(getData(data, 'period', ''))}}</strong></td>
                </tr>
                <tr>
                  <td>
                    <small>کد تخفیف</small>
                  </td>
                  <td>
                    <v-text-field
                      v-model="coupon"
                      :hint="couponHint"
                      placeholder="اگر کد تخفیف دارید اینجا وارد کنید"
                    />
                    <v-btn :loading="couponLoading" @click="checkCode" round outline color="info">
                      <v-icon class="px-1">
                        check
                      </v-icon>
                      بررسی کد تخفیف
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <small>مبلغ کل</small>
                  </td>
                  <td><strong>{{getPrice(getData(data, 'price', '-'))}}</strong></td>
                </tr>
                <tr v-if="discount > 0 ">
                  <td>
                    <small>تخفیف اعمال شده</small>
                  </td>
                  <td><strong class="red--text">%{{(discount)}} -</strong></td>
                </tr>
                <tr v-if="discount > 0 ">
                  <td>
                    <small>مبلغ قابل پرداخت</small>
                  </td>
                  <td><strong
                    class="green--text">{{getPrice((getData(data, 'price', '0') - discount / 100 * getData(data, 'price', '0')) > 0 ? 10 *( parseInt(getData(data, 'price', '0') - discount / 100 * getData(data, 'price', '0')) / 10) : 0)}}</strong>
                  </td>
                </tr>
                </tbody>
              </table>
              <v-btn :href="link" :disabled="!link || loader" block color="success">
                <v-icon class="px-1">forward</v-icon>
                <b>پرداخت</b>
              </v-btn>
              <div v-html="form"></div>
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const page_title = "فعال سازی اشتراک ",
    breadcrumb = "فعال سازی",
    plansMethod = '/site/subscriptionPlans',
    info = {
      title: "تایید فعال سازی اشتراک"
    }

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
        hintError: '',
        loader: false,
        info,
        id: '',
        couponLoading: false,
        discount: 0,
        link: '',
        form: '',
        coupon: '',
      }
    },
    computed: {
      couponHint() {
        if (!this.coupon) return 'کد تخفیف را وارد کنید'
        if (this.discount > 1) return Helper.priceFormat(this.discount);
      },
      getSecret() {
        let path = _.get(this.$route, 'query.redirect', '');
        return decodeURI(path || "/user");
      },
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
        return this.$store.state.settings.hasSubscription;
      }
    },
    mounted() {
      this.getForm();
    },
    methods: {
      checkCode() {
        this.hintError = ''
        let code = this.coupon;
        let method = `/coupons/${code}`
        this.couponLoading = true;
        this.$axios.$get(method).then(res => {
          this.discount = _.get(res, 'data.discount', 0);
          this.getForm();
        }).catch(err => {
          this.discount = 0;
          this.getForm();
          let msg = _.get(err, 'error.message', 'کد معتبر نمی باشد')
        }).finally(() => {
          this.couponLoading = false;
        })
      },
      getData(item, path, def) {
        return _.get(item, path, def) || (def || '');
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
      ,
      nl2br(val) {
        return Helper.nl2br(val) || '-';
      },
      getPrice(val) {
        return Helper.priceFormat(val);
      }
      ,
      getPeriod(val) {
        return val + ' روزه';
      },
      getForm() {
        this.loader = true;
        let query = {
          port: 'zarinpal',
          coupon: this.coupon,
          data: {redirect: this.getSecret},
          subscriptionPlan: this.id,
          //data: {redirect: this.redirectPath}
        }
        this.$axios.$get('/user/subscriptions/paymentLink', {params: query}).then(res => {
          // this.form = resa
          if (_.has(res, 'data.paymentLink')) {
            let link = _.get(res, 'data.paymentLink', '');
            this.link = link;
            //this.$axios.$post(link).then(res2 => {
            //  console.log(`'${res2}'`);
            //}).catch()
          }
          //console.log(res);
          this.loader = false;
        }).catch((err) => {
          //console.log({err})
          //this.$store.commit('snackbar/setSnack', err)
          this.loader = false;
        })
      },
    },
    async asyncData({params, error, $axios, store}) {
      let id = params.id
      try {
        let {data} = await $axios.$get(`${plansMethod}/${id}`)
        return {
          data,
          id
        }
      } catch (err) {
        //console.log(`${plansMethod}/${id}`)
        return {
          id,
          data: {
            id,
            title: 'اشتراک یافت نشد!',
            text: 'لطفا دوباره برگردید و یک گزینه ی صحیح انتخاب کنید',
            price: '-',
            period: '-',
            special: 0,
            data: [],
          }
        }
        //return error({statusCode: 503, message: "مشکلی در گرفتن داده ها رخ داد!"})
      }
    }
  }
</script>
<style>
  .oddTable td {
    padding: 10px;
  }

  .oddTable td:first-child {
    font-size: 12px;
    min-width: 120px;
  }

  .oddTable tr:nth-child(even) {
    background: rgba(0, 0, 0, .09);
  }
</style>
