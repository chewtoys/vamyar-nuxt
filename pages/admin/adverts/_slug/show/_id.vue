<template>
  <v-container grid-list-xs fluid>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <v-layout row wrap>
        <v-flex xs12>
          <div>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-icon class="pb-1 ml-1">create</v-icon>
                {{ page_title }}
              </v-toolbar-title>
              <v-spacer/>
              <v-btn :to="list" outline color="primary" round>
                <v-icon class="px-1">arrow_right</v-icon>
                بازگشت
              </v-btn>
              <v-btn :loading="submit_loader" outline color="accent" round :to="editLink">
                <v-icon class="px-1">edit</v-icon>
                ویرایش
              </v-btn>
              <v-btn :loading="verify_loader" outline color="warning" round @click="verify">
                <v-icon class="px-1">compare_arrows</v-icon>
                {{verified}}
              </v-btn>
              <v-btn outline color="info" round :to="createLink">
                <v-icon class="px-1">create</v-icon>
                ثبت جدید
              </v-btn>
            </v-toolbar>
          </div>
          <v-divider class="mb-5 mt-1"/>
        </v-flex>
        <v-divider class="my-3"/>
        <v-flex xs12 md12 sm12 lg12>
          <table id="showAdvert">
            <tr v-for="item in properties">
              <td>{{item.title}}</td>
              <td v-if="item.name==='image' && item.value">
                <v-img :to="item.value" :src="item.value" max-width="400px"/>
              </td>
              <td v-else-if="item.name==='jDeletedAt'">
                {{getProperty(data, 'advert.jDeletedAt', getProperty(data, 'jDeletedAt', item.value))}}
              </td>
              <td v-else-if="item.name==='adminId'">
                <p v-if="data && data.advert && data.advert.adminId" v-html="item.value"></p>
              </td>
              <td v-else-if="item.name==='user'">
                <p v-if="data && data.advert && data.advert.userId" v-html="item.value"></p>
              </td>
              <td v-else v-html="item.value || '-'"></td>
            </tr>
          </table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const list = "/admin/adverts",
    //guaranteeTypeListPath = "/admin/guaranteeTypes",
    //cityPath = "/admin/cities",

    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    $_veeValidate: {
      validator: "new"
    },

    data: () => ({
      verify_loader: false,
      properties: [],
      data: [],
      submit_loader: false,
      page_title: 'مشاهده ی جزئیات آگهی',
      snack_color: "info"
    }),
    computed: {
      editLink: function () {
        return `${list}/${this.slug}/edit/${this.id}`;
      },
      createLink: function () {
        return `${list}/${this.slug}/create`;
      },
      putMethod: function () {
        return `/admin/${this.formType.type}/${this.id}`;
      },
      list: function () {
        return `${list}/${this.slug}`;
      },
      verified() {
        if (_.has(this, 'data.advert.verified')) {
          let val = this.data.advert.verified;
          //console.log(val)
          return val ? 'تایید شده' : 'تایید نشده';
        }
        return 'نامشخص'
      },
    },
    watch: {
      $route: {
        handler() {
          this.initialLoading();
        },
        deep: true
      },
      data: {
        deep: true,
        handler() {
          this.verified
        }
      }
    },
    mounted(){
      this.initialLoading();
    },
    async asyncData({params, store, $axios, error}) {
      let id = params.id;
      let slug = params.slug;
      let formType = Helper.getTypeByAlias(slug);
      const breadcrumb = Helper.getBreadcrumb(formType.title),
        page_title = Helper.getPageTitle(formType.title);
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
      store.commit("navigation/setTitle", page_title);

      try {

        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);


        return {
          page_title,
          formType,
          slug,
          id,
        }
      } catch (err) {
        //console.log('error', error)
        return error({statusCode: 404, message: 'آگهی یافت نشد :('})
      }
    },
    methods: {
      getProperty(item, path, def = '') {
        return _.get(item, path, def)
      },
      initialLoading() {
        let getPath = `/admin/${this.formType.type}/${this.id}`;
        let query = {
          include: 'advert.user.details,guaranteeTypes,guaranteeType,advert.city,loanType,loanTypes'
        }
        this.$axios.$get(getPath, {params: query}).then(result => {
          _.set(this, 'data', _.get(result, 'data', []))
          let data = this.data;
          let properties = Helper.computeAdvertData(data, this.$store, this.$axios, this.formType.type);
          this.properties = _.get(properties, 'properties', []);
        });
      },
      verify() {
        this.verify_loader = true;
        let newVal = !(_.get(this, 'data.advert.verified', false))
        let method = this.putMethod;
        let data = {verified: newVal}
        this.$axios.$put(method, data).then(res => {
          this.initialLoading();
          this.verify_loader = false;
        }).catch(err => {
          this.verify_loader = false;
          console.log({err})
        })
      },
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      },
    },
  }
</script>
<style>
  #showAdvert td {
    padding: 10px;
  }

  #showAdvert td:first-child {
    font-size: 12px;
    min-width: 120px;
  }

  #showAdvert tr:nth-child(odd) {
    background: rgba(0, 0, 0, .09);
  }
</style>
