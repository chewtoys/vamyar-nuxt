<template>
  <v-footer
    height="auto"
    color="primary lighten-1"
    app
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn
        v-for="item in links"
        :key="item.title"
        color="white"
        flat
        round
        @click="goTo(item.link)"
      >
        {{ item.title }}


      </v-btn>
      <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12

      >
        &copy;{{ year }} — <strong>وامیار</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: [
      { title: "خانه", link: "/" },
      { title: "پنل کاربری", link: "/user" },
      { title: "شکایات و انتقادات", link: "/contact-us" },
      { title: "آگهی ها", link: "/adverts" },
      { title: "درباره ی ما", link: "/about-us" }
    ]
  }),
  computed: {
    year: function() {
      return this.$store.state.year
    }
  },
  methods: {
    goTo: function(to) {
      this.$router.push(to)
    }
  }
}
</script>
