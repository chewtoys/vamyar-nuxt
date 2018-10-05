<template>
  <div>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-alert
            :value="true"
            color="info"
            icon="info"
          >{{ info.title }}
          </v-alert>
          <v-divider class="my-3"/>
          <v-card dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ page_title }}</v-toolbar-title>
          <v-spacer/>
          <v-btn :to="`${slug}/create`" color="cyan" outline light round class="mb-2">ثبت جدید</v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="items"
          :rows-per-page-items="[5,10,25,100]"
          no-results-text="هیچ موردی ثبت نشده است."
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.description }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
            <td class="text-xs-left">{{ props.item.amount }}</td>
            <td class="text-xs-left">
              <a :href=" '/edit/' + props.item.id" class="mx-1">
                <v-icon
                  small
                >
                  edit
                </v-icon>
              </a>
              <v-icon
                class="mx-1"
                small
                @click="delete(props.item.id)"
              >
                delete
              </v-icon>
            </td>
          </template>
          <template slot="no-data">
            <v-alert type="info">
              <p>هنوز موردی اضافه نشده است. برای افزودن از بالا بر روی جدید کلیک کنید.</p>
            </v-alert>
          </template>
        </v-data-table>
      </div>

      <v-snackbar
        v-model="snackbar"
        :color="snack_color"
        :multi-line="true"
        :timeout="3000"
        :vertical="true"
      >
        {{ snack_text }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          بستن
        </v-btn>
      </v-snackbar>
    </v-card>
  </div>
</template>
<script>
  import Helper from "~/assets/js/helper.js"

  export default {
    data: () => ({
      // default
      // info

      submit_loader: false,
      snackbar: false,
      snack_text: null,
      snack_color: "info"
    }),
    async asyncData({params, app, store}) {
      let slug = params.slug
      let type = Helper.getTypeByAlias(slug)
      const breadcrumb = Helper.getBreadcrumb(type.title),
        page_title = Helper.getPageTitle(type.title)
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title})
      store.commit("navigation/setTitle", page_title)

      let method = `/user/${slug}`
      let must
      let cursor = 0

      if (!must) {
        must = "advertableType=" + type.type + ",verified=true"
      }

      let query = {
        number: store.state.settings.adverts.count,
        include: "advertable",
        must
      }

      try {
        let {data, paginator} = await app.$axios.$get(method, {
          params: query
        })
        let loading = false
        return {
          items: data,
          breadcrumb,
          page_title,
          paginator,
          loading,
          type,
          slug
        }
      } catch (err) {
        //error({statusCode: 'این صفحه فعال نمی باشد.'})
        return {
          items: [],
          breadcrumb,
          page_title,
          paginator: [],
          loading: false,
          type,
          slug
        }
      }
    },
    computed: {
      headers() {
        return this.rawHeaders
      },
      info() {
        return {
          title: "لیست " + this.type.title + "‌ها"
        }
      }
    },
    mounted() {
      return {
        rawHeaders: Helper.getRawHeaders(this.type.type),
        rawData: this.data || []
      }
    },
    methods: {
      getLink(id) {
        return "/user/loans/" + id
      }
    },

    $_veeValidate: {
      validator: "new"
    }
  }
</script>
