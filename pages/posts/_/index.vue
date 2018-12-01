<template>
  <div>
    <v-card color="grey lighten-4">
      <v-card-text>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="white">
                <v-card-title>
                  <v-icon class="pl-1">flag</v-icon>
                  <h3>{{category.name}}</h3>
                </v-card-title>
                <v-spacer/>
                <v-img
                  lazy-src="http://place-hold.it/10"
                  src="http://place-hold.it/100"
                  height="300px"
                  ascpect="1"
                ></v-img>
                <v-divider/>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout v-if="category.children" row wrap>
            <v-subheader>زیر مجموعه ها</v-subheader>
            <v-flex v-for="item in category.children || []" :key="item.id" xs12 sm6 md4>
              <v-card :to="currentPath + '/' + item.slug">
                <v-card-title><h3>{{item.name || 'بدون عنوان'}}</h3></v-card-title>
                <v-card-media
                  :src="item.image"
                  :lazy-src="lazy"
                  height="300"
                  width="300"
                />
                <v-card-actions>
                  <v-btn color="info" outline round>
                    <span>مشاهده ی مطالب</span>
                    <v-icon class="pl-1">keyboard_arrow_left</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout v-if="posts" row wrap>
            <v-subheader>مطالب</v-subheader>
            <v-flex v-for="item in posts || []" :key="item.id" xs12 sm6 md4>
              <v-card :to="path + '/' + item">
                <v-card-title><h3>{{item.name || 'بدون عنوان'}}</h3></v-card-title>
                <v-card-media
                  :src="item.image"
                  :lazy-src="lazy"
                  height="300"
                  width="300"
                />
                <v-card-text>
                  <div v-html=""></div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="info" outline round>
                    <span>مشاهده ی مطالب</span>
                    <v-icon class="pl-1">keyboard_arrow_left</v-icon>
                  </v-btn>
                </v-card-actions>
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

  export default {

    data() {
      return {
        posts: [],
        category: [],
        lazy: "http://placehold.it/60",
        src: "http://placehold.it/600x300",
       }
    },
    async asyncData({params, route, store, $axios, error}) {
      let item = params.item
      let path = route.path.replace('/posts/', '');
      let subSlugs = _.split(path, '/')
      let lastSlug = _.last(subSlugs)
      let firstSlug = _.first(subSlugs)
      let slug = lastSlug ? lastSlug : 'news';
      let breadcrumb = firstSlug === 'news' ? 'اخبار' : 'آموزش ها';
      let categoryMethod = `/site/categories/${slug}`
      let postsMethod = `/site/categories/${path}/posts`
      let posts = [], categories = [], category = []

      try {
        category = await $axios.$get(categoryMethod);
        posts = await $axios.$get(postsMethod);
        store.commit('navigation/setTitle', category.name || 'بدون عنوان')
        store.commit('navigation/pushMeta', {breadcrumb})
        return {
          posts: _.get(posts, 'data', []),
          // subCategories: _.get(subCategories, 'data', []),
          category: _.get(category, 'data', []),
          item,
          slug,
          path,
          params
        }
      } catch (err) {
        return error({statusCode: 404, message: err})
      }

    },
    computed: {
      currentPath() {
        return this.$router.path;
      }
    },
    mounted() {
      console.log(this.params, this.slug, this.item, this.category)
    },
    meta: {},
    components: {Copy},
  }
</script>
