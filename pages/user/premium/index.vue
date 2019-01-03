<template>
  <v-container fluid grid-list-xs>
    <v-card class="py-5 px-4" color="white">
      <v-card-title>
        <h1
          class="font-14"
        >
          <v-icon class="px-1 grey-text pb-1 font-19">arrow_left</v-icon>
          اشتراک حساب کاربری
        </h1>
      </v-card-title>
      <div>
        <v-card v-if="!isUserPremium" flat>
          <v-alert :value="true" type="warning">شما اشتراک فعالی ندارید!</v-alert>
          <v-alert :value="true" type="info">برای تهیه ی اشتراک از زیر اقدام نمایید.</v-alert>
        </v-card>
        <template v-else flat>
          <v-card flat>
            <v-alert :value="true" type="success">اشتراک شما فعال می باشد.</v-alert>
            <v-alert :value="true" type="info">اشتراک {{planName}} شما تا تاریخ {{expireDate}} معتبر می باشد.</v-alert>
          </v-card>
          <v-label>لیست اشتراک های شما:</v-label>
          <v-alert v-for="sub in subscriptions" :key="sub.id" :value="true" color="info">
            <p>عنوان اشتراک: {{planTitle(sub)}}</p>
            <p>دوره ی اشتراک: {{planPeriod(sub)}}</p>
            <p>شروع اشتراک: {{planStart(sub)}}</p>
            <p>انقضای اشتراک: {{planExpire(sub)}}</p>
            <p>هزینه ی اشتراک: {{planPrice(sub)}}</p>
            <p>روز باقی مانده: {{leftDays(sub)}}</p>
          </v-alert>
        </template>
        <br>
        <v-divider/>
        <br>
        <v-card flat>
          <v-card-text>
            <div v-html="settings('pages.panelPremiumText')"></div>
            <br>
          </v-card-text>
          <v-layout row wrap>
            <v-flex class="text-xs-center" sm="4" xs="12" lg="3" v-for="item in plans" :key="item.id">
              <v-card :raised="!!item.special" hover
                      :to="`/user/premium/${item.id}/?redirect=${encodeURI(redirectPath)}`" ripple :flat="!item.special"
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
  import VLabel from "vuetify/lib/components/VLabel/VLabel";

  const
    page_title = "وضعیت اشتراک من",
    breadcrumb = "اشتراک حساب کاربری",
    plansMethod = '/site/subscriptions'

  export default {

    components: {VLabel},
    meta: {
      breadcrumb,
      title: page_title
    },
    data() {
      return {
        loader: false,
        form: '',
        plans: []
      }
    },
    computed: {
      user() {
        return _.get(this.$store.state, 'user', [])
      },
      isUserPremium() {
        return !!_.get(this.$store.state, 'user.hasSubscription', false);
      },
      expireDate() {
        return _.get(this.$store.state, 'user.subscription.expireDate', 'نامشخص');
      },
      subscriptions() {
        return _.get(this.$store.state, 'user.subscriptions', []);
      },
      planName() {
        return _.get(this.$store.state, 'user.subscription.title', 'نامشخص');
      },
      redirectPath() {
        let path = _.get(this.$route, 'query.redirect', '');
        return decodeURI(path || "/user");
      }
    },
    methods: {

      planTitle(sub) {
        return _.get(sub, 'title', '-')
      }, planPeriod(sub) {
        return _.get(sub, 'info.period', '-')
      }, planStart(sub) {
        return _.get(sub, 'info.jCreatedAt', '-')
      }, planPrice(sub) {
        return Helper.priceFormat(_.get(sub, 'price', '-'), '')
      }, getPlan(sub) {
        return sub
      }, planInfo(sub) {
        return _.get(sub, 'info', {})
      }, planExpire(sub) {
        return Helper.dateFormat(_.get(sub, 'info.endDate.date', '-'), 'YYYY/M/D HH:mm:ss', 'jYYYY/jM/jD HH:mm:ss');
      }, leftDays(sub) {
        return _.get(sub, 'info.remainedDays', '0‌') + ' روز'
      },
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
    async asyncData({error, params, $axios, store}) {
      let id = params.id;
      try {
        let {data} = await $axios.$get(`${plansMethod}`)
        return {plans: data}
      } catch (err) {
        //return error({statusCode: 503, message: "مشکلی در گرفتن داده ها رخ داد!"})
      }
    }

  }
</script>
