<template>
  <span>
    <v-navigation-drawer
      right
      app
      permanent=""
    >        <v-list>
      <v-list-tile>
        <v-list-tile-avatar>
          <img :src="site.logo">
        </v-list-tile-avatar>
        <v-list-tile-title class="text-justify rtl"><a target="_blank" color="transparent" class="red--text" flat href="/">{{ site.title }}</a></v-list-tile-title>
      </v-list-tile>
      <v-list-group
        no-action
        sub-group
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">آگهی</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="item in adverts"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

        </v-list-tile>
      </v-list-group>
      <v-list-group
        sub-group
        value="false"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">تیکت ها</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="item in tickets"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

        </v-list-tile>
      </v-list-group>
      <v-list-group
        sub-group
        value="true"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">کاربران</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="item in accounts"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>

        </v-list-tile>
      </v-list-group>
      <v-list-group
        sub-group
        value="false"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">تنظیمات سایت</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="item in settings"
          :key="item.title"
          :to="item.link"
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
export default {
  data: () => ({
    drawer: true,
    mini: true,
    right: null,

    tickets: [
      { title: "کل تیکت های ثبت شده", icon: "inbox", link: "/admin/tickets" }
    ],
    accounts: [
      { title: "کل کاربران", icon: "inbox", link: "/admin/users" },
      { title: "ایجاد کاربر جدید", icon: "inbox", link: "/admin/users/create" },
      { title: "کل مدیران", icon: "inbox", link: "/admin/admins" },
      { title: "مدیر جدید", icon: "build", link: "/admin/admins/create" },
      { title: "خروج", icon: "exit_to_app", link: "/admin/logout" }
    ],
    adverts: [
      {
        title: "وام",
        icon: "keyboard_arrow_left",
        link: "/admin/adverts/loans"
      },
      {
        title: "درخواست وام",
        icon: "keyboard_arrow_left",
        link: "/admin/adverts/loan-request"
      },
      {
        title: "ضامن",
        icon: "keyboard_arrow_left",
        link: "/admin/adverts/co-signer"
      },
      {
        title: "درخواست ضامن",
        icon: "keyboard_arrow_left",
        link: "/admin/adverts/co-signer-request"
      },
      {
        title: "سرمایه گذاری",
        icon: "keyboard_arrow_left",
        link: "/admin/adverts/finances"
      },
      {
        title: "درخواست سرمایه گذاری",
        icon: "keyboard_arrow_left",
        link: "/admin/adverts/finance-requests"
      }
    ],
    settings: [
      {
        title: "تنظیمات عمومی سایت",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/general"
      },
      {
        title: "صفحات سایت",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "انواع وام",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "انواع ضامن",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "تنظیمات وام",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "لیست شهر ها",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "تماس با ما",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/contacts"
      },
      { title: "آموزش ها", icon: "keyboard_arrow_left", link: "/admin/teaches" }
    ]
  }),
  computed: {
    fullname: function() {
      return this.$store.state.fullname
    },
    welcome: function() {
      return this.fullname + " خوش آمدید!"
    },
    user: function() {
      return this.$store.state.user
    },
    site: function() {
      return this.$store.state.site
    }
  },
  methods: {
    goTo: function(to) {
      this.$router.push(to)
    }
  }
}
</script>
