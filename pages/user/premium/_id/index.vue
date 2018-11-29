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
                  <td><strong>{{nl2br(getData(data, 'text', '-'))}}</strong></td>
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
                      placeholder="اگر کد تخفیف دارید اینجا وارد کنید"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <small>مبلغ</small>
                  </td>
                  <td><strong>{{getPrice(getData(data, 'price', 'اشتراک'))}}</strong></td>
                </tr>
                </tbody>
              </table>
              <v-btn @click="getForm" block color="success">
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
    plansMethod = '/subscriptions',
    subscriptionMethod = '/user/subscriptions',
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
        loader: false,
        info,
        id: '',
        form: '',
        coupon: '',
        plans: [
          {
            id: 1,
            title: 'پلن اول !',
            price: '100000',
            text: 'توضیحات',
            period: '4',
            special: 0,
            data: [
              {title: 'ویژگی اول', desc: 'توضیح اول'},
              {title: "ویژگی دوم", desc: 'توضیح دوم'}
            ],
          },
          {
            id: 2,
            title: 'پلن دوم !',
            price: '60000',
            text: 'توضیحات',
            period: '1',
            special: 1,
            data: [
              {title: 'ویژگی اول', desc: 'توضیح اول'},
              {title: "ویژگی دوم", desc: 'توضیح دوم'}
            ],
          },
          {
            id: 3,
            title: 'پلن سوم !',
            price: '10000000',
            text: 'توضیحات',
            period: '9',
            special: 0,
            data: [
              {title: 'ویژگی اول', desc: 'توضیح اول'},
              {title: "ویژگی دوم", desc: 'توضیح دوم'}
            ],
          },
          {
            id: 4,
            title: 'پلن چهارم !',
            text: 'توضیحات',
            price: '9000000',
            period: '1',
            special: 0,
            data: [
              {title: 'ویژگی اول', desc: 'توضیح اول'},
              {title: "ویژگی دوم", desc: 'توضیح دوم'}
            ],
          },
        ]
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
        return this.$store.state.user.hasSubscription;
      }
    },
    methods: {
      getData(item, path, def) {
        return _.get(item, path, def);
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
      ,
      nl2br(val) {
        return Helper.nl2br(val);
      },
      getPrice(val) {
        return Helper.priceFormat(val);
      }
      ,
      getPeriod(val) {
        return val + ' ماهه';
      },
      getForm() {
        this.loader = true;
        let query = {
          port: 'zarinpal',
          coupon: this.coupon,
          subscription: this.id,
          //data: {redirect: this.redirectPath}
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
    },
    async asyncData({params, error, $axios, store}) {
      let id = params.id
      try {
        let {data} = await $axios.$get(`${plansMethod}/${id}`)
        return {
          plans: data,
          id
        }
      } catch (err) {
        //console.log(`${plansMethod}/${id}`)
        return {
          id,
          data: {
            id,
            title: 'پلن چهارم !',
            text: 'توضیحات',
            price: '9000000',
            period: '1',
            special: 0,
            data: [
              {title: 'ویژگی اول', desc: 'توضیح اول'},
              {title: "ویژگی دوم", desc: 'توضیح دوم'}
            ],
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
