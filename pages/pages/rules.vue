<template>
  <v-container grid-list>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2>
              <v-icon class="pb-2">flag</v-icon>
              <span>قوانین</span></h2>
          </v-card-title>
          <v-card-text>
            <div v-html=" settings('pages.rulesText')"></div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    meta: {
      title: "قوانین",
      breadcrumb: "قوانین"
    },
    computed: {
      text() {
        return this.$store.state.temp.lorem
      }
    }, methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
    }
  }
</script>
