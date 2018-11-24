<template>
  <v-container grid-list-lg>

    <v-subheader>
      <v-icon class="pl-1">school</v-icon>
      {{page_title}}
    </v-subheader>
    <v-layout row wrap>
      <v-flex v-for="item in data" :key="item.id" xs12 sm6 md4>
        <v-card>
          <v-card-title><h3>{{item.title}}</h3></v-card-title>
          <v-card-media
            :src="item.image"
            height="300"
          />
          <v-card-text>
            <div v-html="item.text"></div>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="'/news/show/' + item.id" color="info" outline round>
              <span>مشاهده ی مطلب</span>
              <v-icon class="pr-1">keyboard_arrow_left</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  const categoriesPath = '/site/categories/akhbar',
    page_title = 'اخبار'
  export default {
    meta: {
      title: "خبر ها",
      breadcrumb:' خبرها'
    },
    data() {
      return {
        page_title,
        data: [],
        paginator: []
      }
    },
    computed: {
      number() {
        return _.get(this.$store, 'state.settings.news.count', 10);
      },
      page() {
        return _.get(this.$route, 'query.page', null);
      }
    },
    async asyncData({route, store, error, $axios}) {
      let method = `${categoriesPath}/posts`;
      let page = _.get(route, 'query.page', null);
      let number = _.get(store, 'state.settings.news.count', 10);

      let params = {
        number,
        page
      }
      try {
        let {data, paginator} = await $axios.$get(method);
        return {data, paginator}
      } catch (err) {
        //return error({statusCode: 503, message: _.get(err,'message',err.toString())})
      }
    }
  }
</script>
