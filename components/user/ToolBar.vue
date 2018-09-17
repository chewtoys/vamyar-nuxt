<template>
  <span>
    <v-toolbar
      color="white lighten-5"
      app
    >
      <v-toolbar-side-icon v-if="isMobile" white--text @click.stop="drawer = !drawer"/>
      <v-toolbar-title>
        <v-btn to="/user" flat color="transparent"><span class="red--text"><v-icon
          class="px-1">dashboard</v-icon>داشبورد</span></v-btn>
      </v-toolbar-title>
      <v-spacer/>
      <v-menu :nudge-width="100" left class="right-text">
        <v-toolbar-title slot="activator">
          <v-icon class="px-1 font-19 grey-text mb-2">settings</v-icon>
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
    <v-navigation-drawer
      :disable-route-watcher="false"
      v-model="drawer"
      :temporary="isMobile"
      :hide-overlay="!isMobile"
      :permanent="!isMobile"
      right
      app
    >
      <v-list color="second">
        <v-list-tile class="pb-2" to="/">
          <v-list-tile-avatar>
            <img :src="site.logo">
          </v-list-tile-avatar>
          <v-list-tile-title class="text-justify rtl">صفحه ی نخست</v-list-tile-title>
        </v-list-tile>
        <v-divider/>

        <v-list-tile>
          <v-list-tile-title class="text-justify rtl">وام</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="item in loans"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

        </v-list-tile>
        <v-divider/>
        <v-list-tile>
          <v-list-tile-title class="text-justify rtl">ضامن ها</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="item in coSigner"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

        </v-list-tile>
        <v-divider/>
        <v-list-tile>
          <v-list-tile-title class="text-justify rtl">سرمایه گذاران</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="item in finances"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

        </v-list-tile>
        <v-list-group
          v-if="true"
          group
          value="false"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title class="text-justify rtl">پنل کاربری</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="item in panel"
            :key="item.title"
            :to="item.to"
          >
            <v-list-tile-action>
              <v-icon v-text="item.icon"/>
            </v-list-tile-action>
            <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>
<script>
import Helper from "~/assets/js/helper"

export default {
  data: ({ $store }) => ({
    drawer: true,
    right: null,
    settings: [
      { title: "اشتراک من", icon: "inbox", to: "/user/premium" },
      { title: "ویرایش پروفایل", icon: "build", to: "/user/profile/edit" },
      { title: "خروج", icon: "exit_to_app", to: "/user/logout" }
    ],
    panel: [
      { title: "تیکت ها", icon: "inbox", to: "/user/tickets" },
      { title: "کل فاکتورها", icon: "inbox", to: "/user/factors" }
      //{title: 'صندوق پیام ها', icon: 'inbox', to: '/user/settings'},
    ],
    loans: [
      { title: "وام برای فروش", icon: "book", to: "/user/loans" },
      { title: "درخواست وام", icon: "book", to: "/user/loan-requests" }
    ],
    coSigner: [
      { title: "ضامن", icon: "book", to: "/user/co-signers" },
      { title: "درخواست ضامن", icon: "book", to: "/user/co-signer-requests" }
    ],
    finances: [
      { title: "سرمایه گذاری", icon: "book", to: "/user/finances" },
      { title: "درخواست سرمایه", icon: "book", to: "/user/finance-requests" }
    ],
    access: [
      { title: "سایت", icon: "book", to: "/user/adverts/vam" },
      { title: "راهنما", icon: "book", to: "/user/adverts/zamen" },
      { title: "سوالات متداول", icon: "book", to: "/user/adverts/sarmaye" }
    ]
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    site: function() {
      return this.$store.state.site
    },
    user: function() {
      return this.$store.state.user.info
    },
    welcome: function() {
      return this.user.details
        ? this.user.details.firstName + " خوش آمدید!"
        : "ابتدا مشخصات خود را تکمیل کنید"
    }
  },
  mounted() {
    this.drawer = !this.isMobile
  },
  methods: {
    goTo: function(to) {
      //if (this.$store.state.debug) alert('go to:' + to)
      this.$router.push(to)
    }
  }
}
</script>
