<template>
  <v-img
    contain
    :gradient="``"
    :src="Src"
    class="white--text"
  >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <no-ssr>
            <h1 :class="(isMobile ? 'font-18 pt-2' : 'font-33') +`iransans font-weight pt-5 `">
              {{settings('frontpage.headerText')}}</h1>
            <div v-if="!isMobile"><h2 :class="(isMobile ? 'font-14' : 'font-18') + `iransans pt-5`">
              {{settings('frontpage.subHeaderText')}}</h2></div>
            <div class="mt-5 ">
              <v-btn large to="/user" color="success lighten-1">
                <v-icon class="pl-1">label_important</v-icon>
                به ما ملحق شوید
              </v-btn>
            </div>
          </no-ssr>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>
<script>
  export default {
    computed: {
      Src() {
        return this.settings('frontpage.headerBgUrl', "bg/head1.jpg")
      },
      gradient: () => "to top, rgba(103,71,181, .3), rgba(55,72,172, .4)",
      count: function () {
        return this.$store.state.site.users_count || 789
      },
      isMobile() {
        if (process.browser) {
          return this.$vuetify.breakpoint.smAndDown
        } else {
          return false
        }
      },
    },
    methods: {
      settings(key, def = '') {
        return _.get(this.$store.state.settings.data, key, def)
      }
    }
  }
</script>
