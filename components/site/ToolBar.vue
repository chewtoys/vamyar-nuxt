<template>
  <span>
    <v-toolbar v-scroll="onScroll" flat :color="menuColor" class="white grey--text" app>
      <v-btn flat color="transparent" class="white--text" to="/">
        <v-icon class="deep-purple--text font-16 pl-1">polymer</v-icon>
        <v-toolbar-title>
          <h1 class="deep-purple--text font-18 text-shadow-3">{{ title }}</h1>
        </v-toolbar-title>
      </v-btn>
      <v-divider vertical/>
      <v-toolbar-items v-if="showQuickAccess">
        <v-btn to="/categories/loans" flat>وام ها</v-btn>
        <v-btn to="/categories/co-signers" flat>ضامن ها</v-btn>
        <v-btn to="/categories/finances" flat>سرمایه گذاری ها</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="!showQuickAccess && !isMobile">
        <v-menu :nudge-width="100">
          <v-btn slot="activator" flat>
            <span>دسته بندی ها</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          <v-list class="farsi">
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              :to="item.link"
            >
              <v-list-tile-title v-text="item.title"/>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn to="/pages/plans" flat>تعرفه ها</v-btn>
        <v-btn to="/posts" flat>اخبار</v-btn>
        <v-btn to="/user/councils/create" flat>مشاوره</v-btn>
        <v-btn to="/user" flat>حساب من</v-btn>
      </v-toolbar-items>
      <v-spacer/>
        <searchBar v-if="showQuickAccess"/>
      <v-spacer/>
      <v-toolbar-side-icon v-if="isMobile" white--text @click.stop="drawer = !drawer"/>
      <v-toolbar-items v-if="!showQuickAccess" class="hidden-sm-and-down">
        <v-btn flat to="/user/adverts/loans/create" class="deep-orange--text font-14">ثبت رایگان آگهی</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      v-if="isMobile"
      :disable-route-watcher="false"
      v-model="drawer"
      :temporary="isMobile"
      :hide-overlay="true"
      :permanent="!isMobile"
      right
      app
    >
      <v-list color="second">

        <v-list-tile class="pb-2" to="/">
          <v-list-tile-avatar>
            <v-icon v-text="'home'"/>
          </v-list-tile-avatar>
          <v-list-tile-title class="text-justify rtl">صفحه‌ی نخست</v-list-tile-title>
        </v-list-tile>
        <v-list-group
          v-if="true"
          :value="false"
          group
          no-action
        >
          <v-list-tile slot="activator" class="pr-1">
            <v-list-tile-action>
              <v-icon v-text="'list'"/>
            </v-list-tile-action>
            <v-list-tile-title class="text-right rtl" v-text="'دسته بندی ها'"/>
          </v-list-tile>

          <v-list-tile
            v-for="item in items"
            :key="item.title"
            :to="item.link"
          >
            <v-list-tile-action>
              <v-icon v-text="'arrow_left'"/>
            </v-list-tile-action>
            <v-list-tile-title class="text-right rtl" v-text="item.title"/>
          </v-list-tile>

        </v-list-group>

        <v-list-tile class="pb-2" to="/news">
          <v-list-tile-avatar>
            <v-icon v-text="'arrow_left'"/>
          </v-list-tile-avatar>
          <v-list-tile-title class="text-justify rtl">اخبار</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="pb-2" to="/education">
          <v-list-tile-avatar>
            <v-icon v-text="'arrow_left'"/>
          </v-list-tile-avatar>
          <v-list-tile-title class="text-justify rtl">آموزش ها</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="pb-2" to="/user/councils/create">
          <v-list-tile-avatar>
            <v-icon v-text="'lock'"/>
          </v-list-tile-avatar>
          <v-list-tile-title class="text-justify rtl">مشاوره</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="pb-2" to="/user">
          <v-list-tile-avatar>
            <v-icon v-text="'lock'"/>
          </v-list-tile-avatar>
          <v-list-tile-title class="text-justify rtl">حساب کاربری</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>
<script>

  import searchBar from '~/components/site/searchBar.vue'

  export default {
    data() {
      return {
        drawer: false,
        offsetTop: null,
        showQuickAccess: false
      }
    },
    computed: {
      menuColor() {
        return this.showQuickAccess ? 'lime lighten-4' : 'white'
      },
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown
      },
      title: function () {
        return this.$store.state.site.title
      },
      heading: function () {
        return this.$store.state.site.heading
      },
      subheading: function () {
        return this.$store.state.site.subheading
      },
      headingitems: function () {
        return this.$store.state.site.headingitems
      },
      items: function () {
        return [
          {title: "همه ی آگهی ها", hashtag: "all", link: "/categories"},
          {title: "وام", hashtag: "loan", link: "/categories/loans"},
          {
            title: "درخواست وام",
            hashtag: "loan-request",
            link: "/categories/loan-requests"
          },
          {title: "ضامن", hashtag: "co-signer", link: "/categories/co-signers"},
          {
            title: "درخواست ضامن",
            hashtag: "co-signer-request",
            link: "/categories/co-signer-requests"
          },
          {
            title: "سرمایه گذاری",
            hashtag: "finances",
            link: "/categories/finances"
          },
          {
            title: "درخواست سرمایه گذاری",
            hashtag: "finance-requests",
            link: "/categories/finance-requests"
          }
        ]
      }
    },
    mounted() {
      this.drawer = !this.isMobile
    },
    methods: {

      onScroll(e) {
        let top = this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        this.showQuickAccess = this.offsetTop > 500;
      },
      go: function (item) {
        this.$router.push(item.to)
      }
    },

    components: {
      searchBar
    }
  }
</script>
