<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-subheader>
              وضعیت حساب
            </v-subheader>
          </v-card-title>
          <v-progress-linear v-if="loader" :indeterminate="true"/>
          <v-card-text>
            <noSubscriptionAlert specialMsg="شما هنوز اشتراک فعالی ندارید!" v-if="!isUserPremium"/>
            <v-card v-else flat>
              <v-alert :value="true" type="success" icon="star"><span
                class="px-1">حساب شما دارای اشتراک فعال می باشد.</span>
              </v-alert>
              <v-alert :value="true" color="info"><p>جزئیات اشتراک شما</p>
                <p>عنوان اشتراک: {{planTitle}}</p>
                <p>دوره ی اشتراک: {{planPeriod}}</p>
                <p>شروع اشتراک: {{planStart}}</p>
                <p>انقضای اشتراک: {{planExpire}}</p>
                <p>هزینه ی اشتراک: {{planPrice}}</p>
                <p>روز باقی مانده: {{leftDays}}</p></v-alert>
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
        <v-card>
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
        <v-card>
          <v-card-title>
            <v-subheader>
              دسترسی سریع
            </v-subheader>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6 sm4 lg4 v-for="item in links" :key="item.id">
                <v-btn
                  large
                  round
                  dark
                  outline
                  ripple
                  block
                  :to="`/user/adverts/${item.alias}/create`"
                  color="info"
                >
                  <v-icon class="px-1">{{item.icon || 'note_add' }}</v-icon>
                  {{item.panelLink}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <v-subheader>
              آخرین آگهی های شما
            </v-subheader>
          </v-card-title>
          <v-card-text>
            <v-expansion-panel popout focusable>
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
                            <td>{{item.type || '-'}}</td>
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
                                     :to="`/user/adverts/${item.advertType }s/show/${item.advertableId}`">
                                <v-icon class="px-1">navigate_before</v-icon>
                                مشاهده
                              </v-btn>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <v-btn color="warning"
                                     :to="`/user/adverts/${item.advertType}s/edit/${item.advertableId}`">
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

  const path = "/user/adverts"

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
      planTitle() {
        return _.get(this.$store.state, 'user.subscription.title', '-')
      }, planPeriod() {
        return _.get(this.$store.state, 'user.subscription.period', '-')
      }, planStart() {
        return _.get(this.$store.state, 'user.subscription.info.jCreatedAt', '-')
      }, planPrice() {
        return Helper.priceFormat(_.get(this.$store.state, 'user.subscription.price', '-'),'')
      }, getPlan() {
        return _.get(this.$store.state, 'user.subscription', {})
      }, planInfo() {
        return _.get(this.$store.state, 'user.subscription.info', {})
      }, planExpire() {
        return _.get(this.$store.state, 'user.subscription.expireDate', '-')
      }, leftDays() {
        return _.get(this.$store.state, 'user.subscription.left', '0‌') + ' روز'
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
          pushyItem.type = Helper.getAdvertType(item);

          final.push(pushyItem)
        })
        //console.log({final})
        return final;
      }
    },
    methods: {
      getStatistics(path, def = '0') {
        return _.get(this, `statistics.${path}`, def);
      },
    },
    mounted() {
      this.loader = true
      this.$axios
        .$get(path, {params: {include: 'advertable,city,user.details', number: 5, orderBy: 'id:desc'}})
        .then(response => {
          this.rawData = response.data;
          this.loader = false
        })
        .catch(err => {
          this.$store.commit("snackbar/setSnack", err.message)
          this.rawData = [];
          this.loader = false
        })

      let statistics = '/user/statistics'
      this.$axios.$get(statistics).then(res => {
        this.statistics = _.get(res, 'data', '')
      })

      let bookmarks = Cookie.get();
      //console.log({bookmarks})
      this.bookmarks = bookmarks;
    },
    components: {noSubscriptionAlert},
  }
</script>

