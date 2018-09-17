import Vue from "vue"

Vue.mixin({
  methods: {
    async getLoanItems(number, cursor, must) {
      // `api.vamyar.tk:808/site/adverts? cursor = 0 & number = 10 & must = advertableType = loan, verified = true`

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

      return await this.$axios.get(method, {
        params: query
      })
    }
  }
})
