<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    right
    dark
    app
  >
    <v-list color="second">
      <v-list-tile class="pb-2" to="/">
        <v-list-tile-avatar>
          <img :src="siteLogo">
        </v-list-tile-avatar>
        <v-list-tile-title class="text-justify rtl">صفحه‌ی نخست</v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile>
        <v-list-tile-title class="text-justify rtl">کل آگهی ها</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        to="/admin/adverts"
      >
        <v-list-tile-action>
          <v-icon></v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="text-justify rtl" v-text="'آخرین آگهی ها'"/>
      </v-list-tile>
      <v-list-tile
        v-for="item in advertTypes"
        :key="item.title"
        :to="`/admin/adverts/${item.alias}`"
      >
        <v-list-tile-action>
          <v-icon></v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="text-justify rtl" v-text="item.siteLink"/>
      </v-list-tile>
      <v-divider/>
      <v-list-group
        v-if="true"
        group
        value="false"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">کاربران</v-list-tile-title>
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
      <v-divider/>
      <v-list-group
        v-if="true"
        group
        value="false"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">مطالب</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="item in content"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-text="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-title class="text-justify rtl" v-text="item.title"/>
        </v-list-tile>
      </v-list-group>
      <v-divider/>
      <v-list-group
        v-if="true"
        group
        value="false"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title class="text-justify rtl">مدیریت</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="item in adminSection"
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
        {title: "تنظیمات سایت", icon: "settings", to: "/settings"},
        {title: "تنظیمات سرور", icon: "inbox", to: "/settings/configuration"},
        {title: "خروج", icon: "exit_to_app", to: "/admin/logout"}
      ],
      panel: [
        {title: "لیست کاربران", icon: "inbox", to: "/admin/users"},
        {title: "لاگ کاربران", icon: "inbox", to: "/admin/users/logs"},
        {title: "لیست نوتیفیکیشن ها", icon: "inbox", to: "/admin/notifications"},
        //{title: "لیست اشتراک های خریداری شده", icon: "inbox", to: "/admin/users/subscriptions"},
        {title: "تیکت ها", icon: "inbox", to: "/admin/tickets"},
        //{title: "لاگ کاربران", icon: "inbox", to: "/users/logs"},
        {title: "درخواست های مشاوره", icon: "inbox", to: "/admin/councils"},
        {title: "انتقادات و پیشنهادها", icon: "inbox", to: "/admin/contact-us"},
        //{title: "لیست کاربران", icon: "inbox", to: "/users"},
      ],
      content: [
        {title: "لیست مطالب", icon: "inbox", to: "/admin/posts"},
        {title: "افزودن مطلب", icon: "inbox", to: "/admin/posts/create"},
        {title: "دسته بندی مطالب", icon: "inbox", to: "/admin/posts/categories"},
      ],
      adminSection: [
        {title: "لیست اشتراک ها", icon: "inbox", to: "/admin/subscriptions"},
        {title: "لیست کوپون ها", icon: "inbox", to: "/admin/coupons"},
        {title: "لیست پرداخت ها", icon: "inbox", to: "/admin/receipts"},
        {title: "دسته بندی تیکت ها", icon: "inbox", to: "/admin/tickets/categories"},
        {
          title: "انواع مشاوره ها" + "", icon: "inbox", to: "/admin/councils/categories"
        },
        {title: "لیست انواع وام", icon: "inbox", to: "/admin/settings/loan-types"},
        {title: "مدیرها", icon: "inbox", to: "/admin/moderators"},
      ],
      access: [
        {title: "سایت", icon: "book", to: "/user/adverts/vam"},
        {title: "راهنما", icon: "book", to: "/user/adverts/zamen"},
        {title: "سوالات متداول", icon: "book", to: "/user/adverts/sarmaye"}
      ]
    }),
    methods: {
      getSettings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
    },
    computed: {
      siteLogo() {
        return this.getSettings('site.siteLogo');
      },
      advertTypes: function () {
        return Helper.getTypes();
      },
      drawer: {
        get() {
          return !!this.$store.state.navigation.drawer
        },
        set(value) {
          this.$store.commit('navigation/setDrawer', value)
        }
      },
      site: function () {
        return this.$store.state.site
      }
    }
  }
</script>
