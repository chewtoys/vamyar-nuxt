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
            <v-card v-if="!isUserPremium" flat>
              <v-alert :value="!isUserPremium" type="warning">شما اشتراک فعالی ندارید!</v-alert>
              <v-alert :value="!isUserPremium" type="info"><p>برای تهیه ی اشتراک از لینک زیر اقدام نمایید.</p>
                <div>
                  <v-btn to="/user/premium">مشاهده ی اشتراک ها</v-btn>
                </div>
              </v-alert>
            </v-card>
            <v-card v-else flat>
              <v-alert type="success">حساب شما دارای اشتراک فعال می باشد.</v-alert>
              <v-alert type="info"><p>برای تمدید اشتراک از لینک زیر اقدام نمایید.</p>
                <div>
                  <v-btn to="/user/premium">اشتراک ها</v-btn>
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
              <v-avatar class="success darken-4">{{totalAdverts}}</v-avatar>
            </v-chip>
            <v-chip color="success" text-color="white">
              تیکت ها
              <v-avatar class="success darken-4">{{totalTickets}}</v-avatar>
            </v-chip>
            <v-chip color="success" text-color="white">
              مشاوره ها
              <v-avatar class="success darken-4">{{totalCouncils}}</v-avatar>
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
              <v-flex xs6 sm4 lg2 v-for="item in links" :key="item.id">
                <v-btn
                  large
                  round
                  dark
                  outline
                  ripple
                  block
                  :to="item.link"
                  :color="item.color"
                >
                  <v-icon class="px-1">{{item.icon || 'note_add' }}</v-icon>
                  {{item.title}}
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
            <v-expansion-panel focusable>
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

  const path = "/user/adverts"

  export default {
    components: {},
    data() {
      return {
        loader: false,
        rawData: [],
        rawAdverts: [],
        totalAdverts: '-',
        totalTickets: '-',
        totalCouncils: '-',
      }
    },
    computed: {
      isUserPremium() {
        return !!_.get(this.$store.state, 'user.hasSubscription', false);
      },
      links() {
        return [
          {title: 'ثبت وام', color: 'blue', link: '/adverts/loans/create', icon: 'note_add'},
          {title: 'ثبت درخواست وام', color: 'blue', link: '/adverts/loan-requests/create', icon: 'note_add'},
          {title: 'ثبت ضامن', color: 'blue', link: '/adverts/co-signers/create', icon: 'note_add'},
          {title: 'ثبت درخواست ضامن', color: 'blue', link: '/adverts/co-signer-requests/create', icon: 'note_add'},
          {title: 'ثبت سرمایه', color: 'blue', link: '/adverts/finances/create', icon: 'note_add'},
          {title: 'ثبت وام', color: 'blue', link: '/adverts/finance-requests/create', icon: 'note_add'},
        ]
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
        this.totalAdverts = _.get(res, 'data.adverts', '-')
        this.totalTickets = _.get(res, 'data.tickets', '-')
        this.totalCouncils = _.get(res, 'data.councils', '-')
      })

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
