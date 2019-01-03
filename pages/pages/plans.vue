<template>
  <v-container grid-list>
    <v-layout row wrap>
      <v-flex xs="12">
        <v-card>
          <v-card-title class="full">
            <h3>اشتراک ها</h3>
          </v-card-title>
          <v-card-text>
            <div v-html="settings('pages.premiumText')"></div>
            <v-layout class="my-5" row wrap>
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
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const plansMethod = '/site/subscriptions',
    subscriptionMethod = '/user/subscriptions'

  export default {
    meta: {
      title: 'مشاهده‌ی اشتراک ها',
      breadcrumb:
        'اشتراک ها'
    }
    ,
    data() {
      return {
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
    }
    ,
    async asyncData({error, $axios}) {
      try {
        let {data} = await
          $axios.$get(plansMethod)
        return {plans: data}
      } catch (err) {
        //return error({statusCode: 503, message: "مشکلی در گرفتن داده ها رخ داد!"})
      }
    }
    ,
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
        return val + ' روزه';
      }
    }
    ,
    computed: {

      text() {
        return this.$store.state.temp.lorem
      }
    }
  }
</script>
