<template>
  <span>
    <no-ssr>
      <span>
  <v-toolbar
    color="white lighten-5"
    fixed
    app
  >
    <v-toolbar-side-icon class='deep-purple--text ' @click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <v-btn to="/user" flat color="transparent"><span class="deep-purple--text"><v-icon
        class="px-1">dashboard</v-icon>داشبورد</span></v-btn>
    </v-toolbar-title>
    <v-toolbar-title>
      <v-btn class="pt-1 " to="/user/notifications" flat color="transparent">
       <v-badge :color=" (notifToread > 0 ? `red` : `deep-purple`) ">
        <v-icon :class=" (notifToread > 0 ? `red--text` : `deep-purple--text`) ">mail</v-icon>
         <span class="font-8 pa-0" slot="badge">{{notifToread}}</span>
        </v-badge>
      </v-btn>
      </v-toolbar-title>
    <v-toolbar-title>
       <v-btn to="/user/premium" flat color="transparent"><span class="yellow--text text--darken-4"><v-icon
         class="px-1">star</v-icon>اشتراک من</span></v-btn>
      </v-toolbar-title>
    <v-spacer/>
    <v-menu :nudge-width="100" left class="right-text">
      <v-toolbar-title class="deep-purple--text " slot="activator">
        <v-icon class="px-1 font-19 deep-purple--text mb-2">settings</v-icon>
        <span class="font-12">{{ welcome }}</span>
      </v-toolbar-title>
      <v-list class="farsi">
        <v-list-tile
          v-for="item in settings"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-title v-text="item.title"/>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
      </span>
    </no-ssr>
  </span>
</template>
<script>
  import Helper from "~/assets/js/helper"

  export default {
    data: ({$store}) => ({
      notifications: [
        {id: 0, message: 'بدون پیام'},
      ],
      settings: [
        {title: "ویرایش پروفایل", icon: "build", to: "/user/profile/edit"},
        {title: "خروج", icon: "exit_to_app", to: "/user/logout"}
      ],
      panel: [
        {title: "تیکت ها", icon: "inbox", to: "/user/tickets"},
        {title: "کل فاکتورها", icon: "inbox", to: "/user/factors"}
        //{title: 'صندوق پیام ها', icon: 'inbox', to: '/user/settings'},
      ],
      loans: [
        {title: "ثبت وام برای فروش یا مشارکت", icon: "book", to: "/user/loans"},
        {title: "درخواست وام دارم", icon: "book", to: "/user/loan-requests"}
      ],
      coSigner: [
        {title: "ثبت ضمانت (ضامن هستم)", icon: "book", to: "/user/co-signers"},
        {title: "درخواست ضامن دارم", icon: "book", to: "/user/co-signer-requests"}
      ],
      finances: [
        {title: "ثبت سرمایه (سرمایه گذار هستم)", icon: "book", to: "/user/finances"},
        {title: "درخواست سرمایه دارم", icon: "book", to: "/user/finance-requests"}
      ],
      access: [
        {title: "سایت", icon: "book", to: "/user/adverts/vam"},
        {title: "راهنما", icon: "book", to: "/user/adverts/zamen"},
        {title: "سوالات متداول", icon: "book", to: "/user/adverts/sarmaye"}
      ]
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown
      },
      notifToread() {
        return _.get(this.$store.state, 'notifications.unseen', []).length || 0;
      },
      drawer: function () {
        return this.$store.state.navigation.drawer
      },
      site: function () {
        return this.$store.state.site
      },
      user: function () {
        return this.$store.state.user.info
      },
      welcome: function () {
        return (this.user && this.user.details)
          ? this.user.details.firstName + " خوش آمدید!"
          : "ابتدا مشخصات خود را تکمیل کنید"
      }
    },
    mounted() {
      this.loadNotifs();
      this.$store.commit('navigation/setDrawer', !this.isMobile);
    },
    methods: {
      loadNotifs() {
        let method = '/user/notifications'
        let query = {orderBy: 'id:desc', number: 20000}
        this.$axios.$get(method, {params: query}).then(res => {
          let data = _.get(res, 'data', []);
          let unseen = [];
          _.forEach(data, (obj) => {
            if (!obj.seen) unseen.push(obj)
          });
          this.$store.commit('notifications/setData', data)
          this.$store.commit('notifications/setUnseen', unseen)
        })
      },
      toggleDrawer: function () {
        this.$store.commit('navigation/setDrawer', !this.drawer);
      },
      goTo: function (to) {
        //if (this.$store.state.debug) alert('go to:' + to)
        this.$router.push(to)
      }
    }
  }
</script>
