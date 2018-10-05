<template>
  <v-navigation-drawer

    fixed
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

</template>
<script>
  import Helper from "~/assets/js/helper"

  export default {
    data: ({$store}) => ({
      settings: [
        {title: "اشتراک من", icon: "inbox", to: "/user/premium"},
        {title: "ویرایش پروفایل", icon: "build", to: "/user/profile/edit"},
        {title: "خروج", icon: "exit_to_app", to: "/user/logout"}
      ],
      panel: [
        {title: "تیکت ها", icon: "inbox", to: "/user/tickets"},
        {title: "کل فاکتورها", icon: "inbox", to: "/user/factors"}
        //{title: 'صندوق پیام ها', icon: 'inbox', to: '/user/settings'},
      ],
      loans: [
        {title: "وام برای فروش", icon: "book", to: "/user/loans"},
        {title: "درخواست وام", icon: "book", to: "/user/loan-requests"}
      ],
      coSigner: [
        {title: "ضامن", icon: "book", to: "/user/co-signers"},
        {title: "درخواست ضامن", icon: "book", to: "/user/co-signer-requests"}
      ],
      finances: [
        {title: "سرمایه گذاری", icon: "book", to: "/user/finances"},
        {title: "درخواست سرمایه", icon: "book", to: "/user/finance-requests"}
      ],
      access: [
        {title: "سایت", icon: "book", to: "/user/adverts/vam"},
        {title: "راهنما", icon: "book", to: "/user/adverts/zamen"},
        {title: "سوالات متداول", icon: "book", to: "/user/adverts/sarmaye"}
      ]
    }),
    computed: {
      drawer: function () {
        return this.$store.state.navigation.drawer
      },
      site: function () {
        return this.$store.state.site
      }
    },
    methods: {
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
