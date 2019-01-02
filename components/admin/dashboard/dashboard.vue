<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title>
        <v-subheader>
          خلاصه وضعیت و آمار سایت
        </v-subheader>
      </v-card-title>
      <v-progress-linear v-if="loader" :indeterminate="true"/>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <table class="oddTable">
              <tbody>
              <tr>
                <td>آگهی ها
                </td>
                <td>{{getStatistics('adverts.all')}}</td>
              </tr>
              <tr>
                <td>کاربران
                </td>
                <td>{{getStatistics('users.all')}}</td>
              </tr>
              <tr>
                <td>اشتراک های خریداری شده
                </td>
                <td>{{getStatistics('subscriptions.all')}}</td>
              </tr>
              <tr>
                <td>مطالب
                </td>
                <td>{{getStatistics('posts.all')}}</td>
              </tr>
              </tbody>
            </table>
          </v-flex>
          <v-flex xs12 sm6>
            <table class="oddTable">
              <tbody>
              <tr>
                <td>آگهی های تایید نشده
                </td>
                <td>{{getStatistics('adverts.nonVerified')}}</td>
              </tr>
              <tr>
                <td>تیکت های باز
                </td>
                <td>{{getStatistics('tickets.open')}}</td>
              </tr>
              <tr>
                <td>مشاوره های پرداخت شده
                </td>
                <td>{{getStatistics('councils.all')}}</td>
              </tr>
              <tr>
                <td>وضعیت سایت
                </td>
                <td>{{settings('site.isSiteClosed') ? 'بسته' : 'باز'}}</td>
              </tr>
              </tbody>
            </table>
          </v-flex>
        </v-layout>
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
              :to="'/admin/'+item.link"
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
          آخرین آگهی های ثبت شده
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
                                 :to="`/admin/adverts/${item.advertType }s/show/${item.advertableId}`">
                            <v-icon class="px-1">navigate_before</v-icon>
                            مشاهده
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <v-btn color="warning"
                                 :to="`/admin/adverts/${item.advertType}s/edit/${item.advertableId}`">
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
    <v-card>
      <v-card-title>
        <v-subheader>
          آخرین تیکت های ثبت شده
        </v-subheader>
      </v-card-title>
      <v-card-text>
        <v-expansion-panel focusable>
          <v-expansion-panel-content
            v-for="(item,i) in tickets"
            :key="i"
          >
            <div slot="header" class="text-right">{{item.title}}
            </div>
            <v-card>
              <v-card-text class="grey lighten-4 text-right">
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <table>
                      <tbody class="oddTable">
                      <tr>
                        <td>اهمیت</td>
                        <td>{{ticketMethodsPriority(item.priority)}}</td>
                      </tr>
                      <tr>
                        <td>وضعیت</td>
                        <td>{{ticketMethodsStatus(item.status)}}</td>
                      </tr>
                      <tr>
                        <td>دسته بندی</td>
                        <td>{{ticketMethodsCategory(item.categoryId)}}</td>
                      </tr>
                      <tr>
                        <td>آخرین بروزرسانی</td>
                        <td>{{item.jUpdatedAt }}</td>
                      </tr>
                      <tr>
                        <td>پیام</td>
                        <td>
                          <div class="py-4 px-3 font-14 text-justify" v-html="nl2br(item.message)"></div>
                        </td>
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
                                 :to="`/admin/tickets/show/${item.id}`">
                            <v-icon class="px-1">navigate_before</v-icon>
                            مشاهده و پاسخ
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
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const path = "/admin/adverts",
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes',
    ticketCategoriesMethod = '/ticketCategories'

  export default {
    data() {
      return {
        loader: false,
        statistics: [],
        rawData: [],
        rawAdverts: [],
        rawTickets: [],
        totalAdverts: '-',
        totalTickets: '-',
        totalCouncils: '-',
      }
    },
    computed: {
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
      },
      tickets() {
        let tickets = _.get(this, 'rawTickets', []);
        let final = [];
        _.forEach(tickets, (item, key) => {
          let pushyItem = {};
          pushyItem.id = _.get(item, 'id', 'بدون شناسه');
          pushyItem.title = _.get(item, 'title', 'بدون عنوان');
          pushyItem.message = _.get(item, 'message', 'بدون پیام');
          pushyItem.status = (_.get(item, 'status', ''));
          pushyItem.priority = (_.get(item, 'priority', ''));
          pushyItem.category = _.get(item, 'categoryId', '');
          pushyItem.jUpdatedAt = _.get(item, 'jCreatedAt', '-');

          final.push(pushyItem)
        })
        //console.log({final})
        return final;
      }
    },
    async asyncData({params, store, $axios, error}) {
      try {
        // loan types
        let ticketCategories = await
          $axios.$get(ticketCategoriesMethod);
        store.commit('ticketCategory/setAndProcessData', ticketCategories.data || []);
      } catch (error) {
        console.log('error', error)
      }

      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);

      } catch (err) {
        //console.log('error', error)
        //return error({statusCode: 404, message: 'آگهی یافت نشد :('})
      }
    },
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      getStatistics(path, def = '-') {
        return _.get(this, `statistics.${path}`, def);
      },
      nl2br(text) {
        return Helper.nl2br(text)
      },
      ticketMethodsPriority(id) {
        return _.get(this.$store.state.settings.tickets.prioritiesArray, id, '')
      },
      ticketMethodsUserName(item) {
        return _.get(item, 'user.details.name', props.item.userId)
      },
      ticketMethodsCategory(id) {
        let list = _.get(this.$store.state, 'ticketCategory.data', []);
        let index = _.findIndex(list, {id});
        let item = list ? list[index] : {};
        return _.get(item, 'name', '-');
      },
      ticketMethodsStatus(key) {
        let list = _.get(this.$store.state, 'settings.tickets.ticketStatus', []);
        let index = _.findIndex(list, {id: key});
        let item = list ? list[index] : {};
        return _.get(item, 'name', '-');
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

      let statistics = '/admin/statistics'
      this.$axios.$get(statistics).then(res => {
        this.statistics = _.get(res, 'data', '')
      })
      let tickets = '/admin/tickets?number=10'
      this.$axios.$get(tickets).then(res => {
        this.rawTickets = _.get(res, 'data', [])
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
