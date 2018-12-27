<template>
  <v-container grid-list>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card width="100%">
          <v-card-title>
            <h2>
              <v-icon class="pb-2">help</v-icon>
              <span>مشاوره</span></h2>
          </v-card-title>
          <v-card-text>
            <div v-html="settings('pages.councilsHelpText')"></div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    meta: {
      title: "دریافت مشاوره",
      breadcrumb: "مشاوره",
    },
    computed: {
      text() {
        return this.$store.state.temp.lorem
      }
    },
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
    }
  }
</script>
