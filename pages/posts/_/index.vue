<template>
  <v-container grid-list-md>
    <v-card flat color="transparent">
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="white">
              <v-card-title>
                <v-icon class="pl-1">flag</v-icon>
                <h3>{{category.name}}</h3>
                <v-spacer/>
                <v-btn color="success" :to="parentPath">
                  <v-icon class="px-1 font-14">arrow_upward</v-icon>
                  برگشت
                </v-btn>
              </v-card-title>
              <v-spacer/>
              <v-img
                v-if="category.image"
                lazy-src="http://place-hold.it/100"
                :src="category.image"
                width="300px"
              ></v-img>
              <v-card-text>
                <div v-if="category.description" v-html="category.description"></div>
              </v-card-text>
              <v-divider/>
            </v-card>
          </v-flex>
        </v-layout>
        <template v-if="category.children.length > 0">
          <v-subheader>زیر مجموعه ها</v-subheader>
          <v-card class="center-text" flat transparent>
            <v-layout row wrap>
              <v-flex v-for="item in category.children || []" :key="item.id" xs12 sm6 md4>
                <v-card color="grey lighten-2" :to="currentPath + '/' + item.slug">
                  <v-card-title>
                    <h3>{{item.name || 'بدون عنوان'}}</h3>
                  </v-card-title>
                  <v-img
                    v-if="item.image"
                    :src="item.image"
                    :lazy-src="lazy"
                    height="300"
                    width="300"
                  />
                  <v-card-actions>
                    <v-btn color="info" round>
                      <span>مشاهده ی مطالب</span>
                      <v-icon class="pl-1">keyboard_arrow_left</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </template>
        <template v-if="posts.length > 0">
          <v-subheader>مطالب</v-subheader>
          <v-container>
            <v-layout row wrap grid-list>
              <v-flex v-for="item in posts || []" :key="item.id" xs12 sm6 lg4>
                <v-card color="lighten-2" :to="showPath + '/' + item.slug">
                  <v-card-title><h3>{{item.title || 'بدون عنوان'}}</h3>
                    <small>{{item.jPublishedAt || ''}}</small>
                  </v-card-title>
                  <v-img
                    :src="item.image"
                    :lazy-src="lazy"
                    max-height="300px"
                    contain
                    class="full"
                  />
                  <v-card-text>
                    <div v-html="showPost(item.text)"></div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="info" outline round>
                      <span>ادامه</span>
                      <v-icon class="pl-1">keyboard_arrow_left</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  import Copy from "~/components/site/buttons/CopyUrl.vue"
  import Helper from "~/assets/js/helper"


  export default {

    data() {
      return {
        posts: [],
        item: [],
        parentPath: '/posts',
        category: [],
        slug: '',
        rootSlug: 'news',
        path: '',
        showPath: '/posts/show',
        category: [],
        lazy: "https://placehold.it/160",
        src: "https://placehold.it/600x300",
      }
    },
    async asyncData({params, route, store, $axios, error}) {
      let item = params.item
      let path = route.path.replace('/posts/', '');
      let subSlugs = _.split(path, '/')
      let lastSlug = _.last(subSlugs)
      let firstSlug = _.first(subSlugs)
      let parentPath = `/posts/${_.join(_.initial(subSlugs), '/')}`;
      let slug = lastSlug ? lastSlug : 'news';
      let breadcrumb = firstSlug === 'news' ? 'اخبار' : 'آموزش ها';
      let rootSlug = firstSlug;
      let categoryMethod = `/site/categories/${slug}`
      let postsMethod = `/site/categories/${slug}/posts`
      let posts = [], category = []

      try {
        //console.log(categoryMethod)
        category = await $axios.$get(categoryMethod);
        store.commit('navigation/setTitle', category.data.name || 'بدون عنوان')
        store.commit('navigation/pushMeta', {breadcrumb})
      } catch (err) {
        return error({statusCode: 503, message: "این دسته بندی وجود ندارد"})
      }
      try {
        posts = await $axios.$get(postsMethod);
      } catch (err) {
        //return error({statusCode: 503, message: 'هیچ مطلبی وجود ندارد'})
      }
      return {
        posts: _.get(posts, 'data', []),
        // subCategories: _.get(subCategories, 'data', []),
        category: _.get(category, 'data', []),
        item,
        slug,
        rootSlug,
        parentPath,
        path
      }
    },
    computed: {
      currentPath() {
        return `/posts/${this.rootSlug}`;
      }
    },
    methods: {
      showPost(text) {
        return Helper.limitStr(text, 100)
      }
    },
    mounted() {
    },
    meta: {},
    components: {Copy},
  }
</script>
