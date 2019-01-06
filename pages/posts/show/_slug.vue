<template>
  <div>
    <v-card color="grey lighten-4">
      <v-card-text>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="white">
                <v-img
                  :aspect="16/9"
                  :lazy-src="lazy"
                  v-if="src"
                  :src="src"
                />
                <v-card-title>
                  <v-icon class="pl-1">flag</v-icon>
                  <h3>{{title}}</h3>
                  <v-spacer/>
                  <div>
                    <small>دسته بندی: {{category}}</small>
                    <br/>
                    <small>تاریخ: {{date}}</small>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div v-html="text"></div>
                </v-card-text>
                <v-divider/>
                <v-card-actions class="ltr">
                  <Copy/>
                </v-card-actions>
                <v-divider/>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import Copy from "~/components/site/buttons/CopyUrl.vue"
  import Helper from "~/assets/js/helper"

  export default {
    data() {
      return {
        item: [],
        slug: null,
      }
    },
    async asyncData({params, $axios, store, error}) {

      // let id = params.id
      let slug = params.slug
      let method = `/site/posts/${slug}`;
      let query = {include: 'categories'}
      try {
        let item = await $axios.$get(method, {params: query});
        store.commit('navigation/setTitle', _.get(item, 'data.title', 'مشاهده خبر'))
        return {item: item.data, slug}
      } catch (err) {
        console.log(err)
        // return error({statusCode: 404, message: 'خبری یافت نشد!'})
      }
    },
    computed: {
      lazy() {
        return 'https://place-hold.it/100'
      },
      path() {
        return this.item
      },
      title() {
        return _.get(this, 'item.title', 'بدون عنوان')
      },
      text() {
        return _.get(this, 'item.text', 'بدون متن')
      },
      date() {
        return _.get(this, 'item.jUpdatedAt', 'بدون تاریخ')
      },
      category() {
        let cats = _.get(this, 'item.categories', []);
        return _.join(_.map(cats, 'name'), ', ')
      },
      src() {
        return _.get(this, 'item.image', false)
      }
    },
    mounted() {
      //console.log(this.slug, this.item)
    },
    meta: {
      breadcrumb: 'خبر'
    },
    components: {Copy},
  }
</script>
