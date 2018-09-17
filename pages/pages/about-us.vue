<template>
  <v-container grid-list>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2>
              <v-icon class="pb-2">flag</v-icon>
            <span>درباره‌ی ما</span></h2>
          </v-card-title>
          <v-card-text>
            <div>{{ text }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  meta: {
    title: "درباره‌ی ما"
  },
  layout: "site",
  computed: {
    text() {
      return this.$store.state.temp.lorem
    }
  }
}
</script>
