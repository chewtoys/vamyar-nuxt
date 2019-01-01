<template>
  <v-jumbotron
    :gradient="gradient"
    :src="Src"
    dark
  >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h1 class="font-50">{{settings('frontpage.headerText')}}</h1>
          <div><h2 class="font-22 pt-2">{{settings('frontpage.subHeaderText')}}</h2></div>
          <div class="mt-5 ">
            <v-btn large to="/user" color="deep-orange lighten-2">
              <v-icon class="pl-1">label_important</v-icon>
              به ما ملحق شوید
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
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
      }
    },
    methods: {
      settings(key, def = '') {
        return _.get(this.$store.state.settings.data, key, def)
      }
    }
  }
</script>
