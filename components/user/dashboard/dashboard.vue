<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-subheader>
              پروفایل شما
            </v-subheader>
          </v-card-title>
          <v-progress-linear v-if="loader" :indeterminate="true"/>
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
          <v-progress-linear v-if="loader" :indeterminate="true"/>
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
          <v-progress-linear v-if="loader" :indeterminate="true"/>
          <v-card-text>
            <v-expansion-panel focusable>
              <v-expansion-panel-content
                v-for="item in adverts"
                :key="item.id"
              >
                <div slot="header" class="text-right">{{item.title}}</div>
                <v-card>
                  <v-card-text class="grey lighten-4 text-right">
                    <table>
                      <tbody width="50%" class="oddTable">
                      <tr>
                        <td>نوع</td>
                        <td>{{item.typeName}}</td>
                      </tr>
                      <tr>
                        <td>تاریخ</td>
                        <td>{{item.date}}</td>
                      </tr>
                      </tbody>
                      <tbody width="50%">
                      <tr>
                        <td>
                          <v-btn color="success" :to="`/user/adverts/${item.advertType}s/show/${item.id}`">
                            <v-icon>navigate_before</v-icon>
                            مشاهده
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <v-btn color="warning" :to="`/user/adverts/${item.advertType}s/edit/${item.typeName}`">
                            <v-icon>edit</v-icon>
                            مشاهده
                          </v-btn>
                        </td>
                      </tr>
                      </tbody>
                    </table>
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
          pushyItem.id = _.get(item, 'id', 'بدون عنوان');
          pushyItem.title = _.get(item, 'title', 'بدون عنوان');
          pushyItem.date = _.get(item, 'jCreatedAt', '-');
          pushyItem.advertType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''));
          pushyItem.typeName = Helper.getAdvertType(item);
          final.push(pushyItem)
        })
        return final;
      }
    },
    mounted() {
      this.loader = true
      this.$axios
        .$get(path, {params: {inclue: 'advertable', number: 10, orderBy: 'id:desc'}})
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
