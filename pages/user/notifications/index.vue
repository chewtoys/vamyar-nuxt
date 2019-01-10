<template>
  <v-container fluid grid-list-xs>
    <v-card class="py-5 px-4" color="white">
      <v-card-title>
      </v-card-title>
      <v-card-text>
        <v-alert :value="true" v-if="!notifications.length" color="info">
          <p>هیچ اعلانیه های ندارید</p>
        </v-alert>
        <v-timeline v-else>
          <v-timeline-item
            v-for="(item,i) in notifications"
            :key="i"
            :color="!item.seen ? `red lighten-2` : 'blue'"
            large
          >
            <span slot="opposite">
              <p>{{item.jCreatedAt || '-'}}</p>
              <p>{{item.type || '-'}}</p>
            </span>
            <v-card class="elevation-2 " :color="!item.seen ? `red lighten-5` : `blue lighten-5` ">
              <v-card-title class="font-18">{{item.title || '-'}}</v-card-title>
              <v-card-text :class="`font-14`  " v-html="nl2br(item.message || '-')">
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const
    page_title = "اعلانیه ها",
    breadcrumb = "لیست اعلانیه های شما",
    plansMethod = '/user/notifications'

  export default {
    meta: {
      breadcrumb,
      title: page_title
    },
    data() {
      return {
        loader: false,
      }
    },
    computed: {
      user() {
        return _.get(this.$store.state, 'user', [])
      },
      notifications() {
        return _.reverse(_.get(this.$store.state, 'notifications.data', []));
      },
    },
    mounted() {
      this.loadNotifs();
    },
    methods: {
      nl2br(text = '') {
        return Helper.nl2br(text)
      },
      readNotif(id) {
        if (!id) return null
        let method = `/user/notifications/${id}/seen`
        this.$axios.$put(method).then(res => {
          //this.notifications = _.get(res, 'data', [])
          this.loadNotifs();
        })
      },
      loadNotifs() {
        let method = '/user/notifications'
        let query = {orderBy: 'id:desc', number: 20000}
        this.$axios.$get(method, {params: query}).then(res => {
          let data = _.get(res, 'data', []);
          let unseen = [];
          _.forEach(data, (obj) => {
            if (!obj.seen) {
              unseen.push(obj)
              this.readNotif(obj.id);
            }
          });
          this.$store.commit('notifications/setData', data)
          this.$store.commit('notifications/setUnseen', unseen)
        })
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
    },
  }
</script>
