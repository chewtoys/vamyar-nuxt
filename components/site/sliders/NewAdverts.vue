<template>
  <v-container fluid>
    <v-card class="full">
      <v-card-title>
        <h3>جدیدترین آگهی ها</h3>
      </v-card-title>
      <v-card-text>
        <div v-if="loading">
          <v-progress-linear :indeterminate="loading"/>
        </div>
        <no-ssr v-if="!loading">
          <siema ref="siema" :options="options" auto-play class="siema">
            <div v-for="item in items" :key="item.id" class="slide pa-2">
              <v-card>
                <v-card-media
                  v-if="hasImage(item)"
                  :src="item.image"
                  height="200px"
                />
                <v-card-title>
                  <div><h3>{{ item.title }}</h3></div>
                  <div>
                    <span v-for="(key,value) in itemProperties(item)" :key="key">
                      <v-icon class="pb-1  font-13 px-1 mr-1">brightness_1</v-icon>
                      <small>{{ value ? value : "تعیین نشده" }}</small>
                    </span>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>{{ truncate(item.text, 50, ' ...') }}</div>
                </v-card-text>
              </v-card>
            </div>
          </siema>
        </no-ssr>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  computed: {
    img: function() {
      return "http://placehold.it/2000x1000"
    },
    options: function() {
      return {
        draggable: true,
        loop: true,
        duration: 200,
        easing: "ease-out",
        perPage: {
          200: 1, // 2 items for viewport wider than 800px
          768: 3, // 2 items for viewport wider than 800px
          1240: 4 // 3 items for viewport wider than 1240px
        },
        startIndex: 0,
        multipleDrag: true,
        threshold: 20,
        rtl: true
      }
    }
  },
  mounted: async function(number, cursor, must) {
    let method = "/site/adverts"
    let advertableType = "loan"

    if (!number) number = 15
    if (!cursor) cursor = 0

    if (!must) {
      must = "advertableType=" + advertableType + ",verified=true"
    }
    let query = {
      number,
      cursor,
      must
    }
    const { statusCode, data, paginator } = await this.$axios.$get(method, {
      params: query
    })
    this.loading = false
    this.items = data
  },
  methods: {
    hasImage: function(item) {
      return item.image !== null
    },
    debug: function() {
      console.log(this.items)
    },
    truncate: (text, stop, clamp) => {
      return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "")
    },
    itemProperties: function(item) {
      if (item.advertableType === "loan") {
        return {
          قیمت: item.price,
          هزینه: item.price,
          بازپرداخت: item.payback
        }
      }
    }
  }
}
</script>
