<template>
  <v-toolbar
    color="grey lighten-5"
    fixed
    app
  >
    <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <v-btn to="/admin" flat color="transparent"><span class="red--text"><v-icon
        class="px-1">dashboard</v-icon>پنل مدیریت</span></v-btn>
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
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown
      },
      drawer: function () {
        return this.$store.state.navigation.drawer
      },
      site: function () {
        return this.$store.state.site
      },
      admin: function () {
        return this.$store.state.admin.info
      },
      welcome: function () {
        return " خوش آمدید!";
      }
    },
    mounted() {
      this.$store.commit('navigation/setDrawer', !this.isMobile);
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
