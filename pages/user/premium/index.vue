<template>
  <v-container fluid grid-list-xs>
    <v-card class="py-5 px-4" color="white">
      <div>
        <h1
          class="font-14"
        >
          <v-icon class="px-1 grey-text pb-1 font-19">arrow_left</v-icon>
          اشتراک حساب
        </h1>
        <v-card v-if="!isUserPremium" flat>
          <v-alert type="warning">شما اشتراک فعالی ندارید!</v-alert>
          <v-alert type="info">برای تهیه ی اشتراک از زیر اقدام نمایید.</v-alert>
        </v-card>
        <v-card flat>
          <v-layout row wrap>
            <v-flex class="text-xs-center" sm="4" xs="12" lg="3" v-for="item in plans" :key="item.id">
              <v-card :raised="!!item.special" hover :to="`/user/premium/${item.id}`" ripple :flat="!item.special"
                      :color="item.special ? 'warning lighten-4' : 'grey lighten-4'">
                <v-card-title>
                  <h5 class="full text-center">{{item.title}}</h5>
                </v-card-title>
                <v-card-text>
                  <div class="py-2" v-html="item.text"></div>
                  <v-chip text-color="black" :color="item.special ? 'warning lighten-4' : 'grey lighten-3'"
                          class="my-1 text-center">
                    <strong>{{getPeriod(item.period)}}</strong></v-chip>
                  <section class="my-3">
                    <div class="full my-2" v-for="property in item.data" :key="property.title">
                      <div>
                        <small class="grey--text" v-if="property.title">{{property.title}}</small>
                      </div>
                      <div><span class="grey--text text--darken-3" v-if="property.desc" v-html="property.desc"></span>
                      </div>
                    </div>
                  </section>
                  <div class="pt-2" v-html="getPrice(item.price)"></div>
                </v-card-text>
                <v-card-actions>
                  <v-btn block :color="item.special ? 'danger' : 'success'">
                    <v-icon v-if="item.special" color="warning" class="px-1">star</v-icon>
                    <v-icon v-else color="white" class="px-1">verified_user</v-icon>
                    فعال سازی
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const
    page_title = "وضعیت اشتراک من",
    breadcrumb = "اشتراک حساب کاربری"

  export default {

    meta: {
      breadcrumb,
      title: page_title
    },
    data() {
      return {
        loader: false,
        form: '',
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
        return !!_.get(this.$store.state, 'user.hasSubscription', false);
      },
      redirectPath() {
        let path = _.get(this.$route, 'query.redirect', '');
        return decodeURI(path || "/user");
      }
    },
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
      ,
      getPrice(val) {
        return Helper.priceFormat(val);
      }
      ,
      getPeriod(val) {
        return val + ' ماهه';
      }
    },
    async asyncData({error, $axios, store}) {

      try {
        let {data} = await $axios.$get(plansMethod)
        return {plans: data}
      } catch (err) {
        //return error({statusCode: 503, message: "مشکلی در گرفتن داده ها رخ داد!"})
      }
    }

  }
</script>
