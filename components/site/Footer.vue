<template>
  <v-footer
    dark
    cyan
    height="auto"
  >

    <v-card
      flat
      tile
      width="100%"
      class="indigo lighten-1 white--text text-center"
    >

      <v-card-text class="white--text pt-0">
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex sm12 md12>
              <v-btn v-for="item in access" :key="item.id" :to="item.to" outline depress
                     flat
                     round>
                <v-icon class="px-1 font-20">{{ item.icon || 'arrow_left' }}</v-icon>
                <span>{{ item.title }}</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <br/>
      <div v-html="settings('site.footerText')" ></div>
      <v-divider/>

      <v-card-text class="white--text">
        &copy;2018 — <strong>Vamyar</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({}),
    computed: {
      access() {
        return [
          {id: 0, title: "صفحه ی نخست", icon: "home", to: "/"},
          {id: 1, title: "تماس با ما", icon: "phone", to: "/pages/contact-us"},
          {id: 2, title: "درباره ما", icon: "subject", to: "/pages/about-us"},
          {id: 3, title: "قوانین", icon: "event_note", to: "/pages/rules"},
          {id: 4, title: "آموزش ها", icon: "local_library", to: "/posts/instructions"},
          {id: 5, title: "اخبار", icon: "whatshot", to: "/posts/news"}
        ]
      }
    }, methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
    }
  }
</script>
