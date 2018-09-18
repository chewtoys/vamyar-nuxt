<template>
  <div>
    <v-subheader>
      دسته بندی ها
    </v-subheader>
    <v-layout row wrap>
      <v-flex v-for="item in categories" :key="item.id" xs12 sm4 lg3>
        <v-card :to="item.to" hover ripple>
          <v-img
            v-if="item.image"
            :src="item.image"
            :lazy-src="`https://placehold.it/100`"
            aspect-ratio="2"
            class="grey lighten-2"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate color="grey lighten-5"/>
            </v-layout>
          </v-img>

          <v-card-title>
            <h4>{{ item.title }}</h4>
          </v-card-title>
          <v-card-text>
            {{ item.text }}
          </v-card-text>
          <v-card-actions>
            <p class="grey--text font-12">
              <v-icon
                color="grey lighten-1"
                class="font-21">playlist_play
              </v-icon>
              <b>{{ item.count ? `${item.count} آگهی ثبت شده` : 'بدون آگهی' }}</b>
            </p>
            <v-spacer/>
            <v-btn outline round color="orange">مشاهده</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-subheader>
      آخرین آگهی ها
    </v-subheader>
    <v-layout row wrap>
      <v-flex v-for="item in adverts" :sm6="!!item.image" :sm4="!item.image" :key="item.id" xs12>
        <AdvertCard :item="item"/>
      </v-flex>
      <v-flex v-if="paginator && paginator.cursor && paginator.cursor.nextURL" xs12 sm12>
        <div class="my-5 text-xs-center">
          <v-btn :loading="btnLoading" round large outline color="info" @click="loadMore">
            <span><v-icon class="px-1">arrow_drop_down</v-icon>نمایش بیشتر</span>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import AdvertCard from "~/components/site/adverts/Advert.vue"

const path = "/site/adverts"
const title = "لیست آگهی ها",
  breadcrumb = "کل آگهی ها"

export default {
  head() {
    return {
      title
    }
  },
  meta: {
    title,
    breadcrumb,
    link: this.link
  },
  components: { AdvertCard },
  data() {
    return {
      adverts: [],
      paginator: [],
      btnLoading: false
    }
  },
  computed: {
    link() {
      return this.$route.path
    },
    categories() {
      return [
        {
          id: 1,
          title: "وام ها",
          count: 10,
          to: "/categories/loans",
          image: null,
          text: this.$store.state.temp.lorem
        },
        {
          id: 2,
          title: "درخواست وام ها",
          count: 6,
          to: "/categories/loan-requests",
          image: null,
          text: this.$store.state.temp.lorem
        },
        {
          id: 3,
          title: "سرمایه ها",
          count: 7,
          to: "/categories/finances",
          image: null,
          text: this.$store.state.temp.lorem
        }
      ]
    }
  },
  methods: {
    // load more items
    async loadMore() {
      this.btnLoading = true
      try {
        let method = this.paginator.cursor.nextURL
        let { data, paginator } = await this.$axios.$get(method)
        data.forEach((e, i) => {
          this.adverts.push(e)
        })
        this.paginator = paginator
      } catch (err) {
        this.paginator.cursor = {}
        this.paginator.cursor.nextURL = false
        this.$store.commit("snackbar/setSnack", "آگهی بیشتری وجود ندارد.")
      }
      this.btnLoading = false
    }
  },
  async asyncData({ app }) {
    try {
      let params = {
        include: "advertable"
      }
      let { data, paginator } = await app.$axios.$get(path, { params })
      return { adverts: data, paginator }
    } catch (err) {
      return { adverts: [], paginator: [] }
    }
  }
}
</script>
