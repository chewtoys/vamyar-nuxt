<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="my-1">
          <v-card-title>
            <v-subheader>
              وضعیت حساب
            </v-subheader>
          </v-card-title>
          <v-progress-linear v-if="loader" :indeterminate="true"/>
          <v-card-text>
            <noSubscriptionAlert specialMsg="شما هنوز اشتراک فعالی ندارید!" v-if="!isUserPremium"/>
            <v-card v-else flat>
              <v-alert :value="true" color="lime accent-3" icon="star"><span
                class="px-1 grey--text text--darken-2">حساب شما دارای اشتراک فعال می باشد.</span>
              </v-alert>
              <v-alert :value="true" color="info" icon="network_check"><p>جزئیات اشتراک شما</p>
                <p>انقضای اشتراک : {{planExpireAll}}</p>
                <p> مدت زمان باقی مانده: {{leftDaysAll}}</p>
                <p>شروع اشتراک: {{planStart}}</p>
              </v-alert>
              <v-alert v-if="false" :value="true" color="blue"><p>
                برای تمدید اشتراک می توانید از لینک زیر اقدام نمایید.</p>
                <div>
                  <v-btn to="/user/premium">اشتراک ها</v-btn>
                  <v-btn :to="`/user/premium/${getPlan.id}`">تمدید همین اشتراک</v-btn>
                </div>
              </v-alert>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card class="my-1 hide">
          <v-card-title>
            <v-subheader>
              آمار شما
            </v-subheader>
          </v-card-title>
          <v-card-text>
            <v-chip color="success" text-color="white">
              کل آگهی ها
              <v-avatar class="success darken-4">{{getStatistics('adverts.all')}}</v-avatar>
            </v-chip>
            <v-chip color="success" text-color="white">
              تیکت ها
              <v-avatar class="success darken-4">{{getStatistics('tickets.all')}}</v-avatar>
            </v-chip>
            <v-chip color="success" text-color="white">
              مشاوره ها
              <v-avatar class="success darken-4">{{getStatistics('councils.all')}}</v-avatar>
            </v-chip>
          </v-card-text>
        </v-card>
        <v-card class="my-1">
          <v-card-title>
            <v-subheader>
              دسترسی سریع
            </v-subheader>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6 lg4 v-for="item in links" :key="item.id">
                <v-btn
                  large
                  round
                  dark
                  ripple
                  block
                  :to="`/user/adverts/${item.alias}/create`"
                  color="success"
                >
                  <v-icon class="px-1">{{item.icon || 'note_add' }}</v-icon>
                  {{item.panelLink}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card class="my-1">
          <v-card-title>
            <v-subheader>
              آخرین آگهی های شما
            </v-subheader>
          </v-card-title>
          <v-card-text>
            <v-expansion-panel popout focusable v-if="adverts.length">
              <v-expansion-panel-content
                v-for="(item,i) in adverts"
                :key="i"
              >
                <div slot="header" class="text-right">{{item.title || '-' }} {{item.instant}}</div>
                <v-card>
                  <v-card-text class="grey lighten-4 text-right">
                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                        <table>
                          <tbody class="oddTable">
                          <tr>
                            <td>نوع آگهی</td>
                            <td>{{item.type.title || '-'}}</td>
                          </tr>
                          <tr>
                            <td>وضعیت</td>
                            <td>{{item.tradeStatus || '-'}}</td>
                          </tr>
                          <tr>
                            <td>وضعیت بررسی</td>
                            <td>{{item.verified || '-'}}</td>
                          </tr>
                          <tr>
                            <td>تاریخ</td>
                            <td>{{item.jCreatedAt || '-'}}</td>
                          </tr>
                          </tbody>
                        </table>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <table>
                          <tbody>
                          <tr>
                            <td>
                              <v-btn color="success"
                                     :to="`/user/adverts/${item.type.alias }/show/${item.advertableId}`">
                                <v-icon class="px-1">navigate_before</v-icon>
                                مشاهده
                              </v-btn>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <v-btn color="warning"
                                     :to="`/user/adverts/${item.type.alias}/edit/${item.advertableId}`">
                                <v-icon class="px-1">edit</v-icon>
                                ویرایش
                              </v-btn>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-alert v-else type="warning" :value="true">
              <span>هیچ آگهی ثبت شده ای یافت نشد!</span>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'
  import Cookie from "js-cookie"
  import noSubscriptionAlert from "~/components/site/noSubscriptionAlert.vue"

  const path = "/user/adverts",
    checkLoginPath = '/user/loggedIn'

  export default {
    data() {
      return {
        loader: false,
        statistics: [],
        rawData: [],
        bookmarks: false,
        rawAdverts: [],
        totalAdverts: '-',
        totalTickets: '-',
        totalCouncils: '-',
      }
    },
    computed: {
      multipleSub() {
        return _.get(this.$store.state, 'user.subscriptions', '').length > 1
      },
      planTitle() {
        return _.get(this.$store.state, 'user.subscription.subscriptionPlan.title', '-')
      }, planPeriod() {
        return _.get(this.$store.state, 'user.subscription.subscriptionPlan.period', '-') + 'روزه'
      }, planStart() {
        return _.get(this.$store.state, 'user.subscription.jCreatedAt', '-')
      }, planPrice() {
        return Helper.priceFormat(_.get(this.$store.state, 'user.subscription.subscriptionPlan.price', '-'), '')
      }, getPlan() {
        return _.get(this.$store.state, 'user.subscription.subscriptionPlan', {})
      }, planInfo() {
        return _.get(this.$store.state, 'user.subscription', {})
      }, planExpire() {
        return _.get(this.$store.state, 'user.subscription.expireDate', '-')
      }, planExpireAll() {
        return Helper.dateFormat(_.get(_.last(_.get(this.$store.state, 'user.subscriptions', '-')), 'endDate.date', '-'), 'YYYY-M-D H:mm')
      }, leftDays() {
        return _.get(this.$store.state, 'user.subscription.left', '0‌') + ' روز'
      }, leftDaysAll() {
        return _.sum(_.map(_.get(this.$store.state, 'user.subscriptions', []), 'remainedDays')) + ' روز'
      },
      isUserPremium() {
        return !!_.get(this.$store.state, 'user.hasSubscription', false);
      },
      links() {
        return Helper.getTypes()
      },
      adverts() {
        let adverts = _.get(this, 'rawData', []);
        let final = [];
        _.forEach(adverts, (item, key) => {

          let pushyItem = {};
          //let pushyItem = Helper.computeAdvertData(item, this.$store, this.$axios);

          let statusList = _.get(this.$store.state, 'settings.adverts.tradeStatusList', '[]');
          pushyItem.id = _.get(item, 'id', 'بدون عنوان');
          pushyItem.advertableId = _.get(item, 'advertableId', '');
          pushyItem.advert = _.get(item, 'advert', []);
          pushyItem.title = _.get(item, 'title', 'بدون عنوان');
          pushyItem.instant = _.get(item, 'instant', false) ? 'فوری' : '';
          pushyItem.tradeStatus = statusList[_.get(item, 'tradeStatus', 0)];
          pushyItem.verified = _.get(item, 'verified', false) ? 'تایید شده' : 'هنوز تایید نشده';
          pushyItem.jCreatedAt = _.get(item, 'jCreatedAt', '-');
          pushyItem.advertType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''));
          pushyItem.type = Helper.getAdvertType(item, null, true);

          final.push(pushyItem)
        })
        //console.log({final})
        return final;
      }
    }
    ,
    methods: {
      getStatistics(path, def = '0') {
        return _.get(this, `statistics.${path}`, def);
      }
      ,
    }
    ,
    mounted() {
      this.loader = true

      this.$axios
        .$get(checkLoginPath)
        .catch
        (err => {
          let {status} = _.get(err, 'response', 0);
          //console.log({err, status})
          if (status === 404) {
            this.$store.commit("snackbar/setSnack", 'متاسفانه نشست شما منقضی شده است. لطفا دوباره وارد شوید.')
            this.$store.dispatch('user/logout')
            setTimeout(() => {
              this.$router.push('/user/auth')
            }, 500)
          }
        })


      this.$axios
        .$get(path, {params: {include: 'advertable,city,user.details', number: 5, orderBy: 'priority:desc'}})
        .then(response => {
          this.rawData = response.data;
          this.loader = false
        })
        .catch(err => {
          //this.$store.commit("snackbar/setSnack", err.message)
          this.rawData = [];
          this.loader = false
        })

      let statistics = '/user/statistics'
      this.$axios.$get(statistics).then(res => {
        this.statistics = _.get(res, 'data', '')
      })

      this.$axios.$get("/user/subscriptions", {params: {include: 'subscriptionPlan'}}).then(res => {
        if (_.has(res, 'data')) {
          this.$store.commit("user/updateUserSubscription", _.get(res, 'data', null))
        }
      })

      let bookmarks = Cookie.get();
      //console.log({bookmarks})
      this.bookmarks = bookmarks;
    }
    ,
    components: {
      noSubscriptionAlert
    }
    ,
  }
</script>

