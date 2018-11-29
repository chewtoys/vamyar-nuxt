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
                <v-icon class="px-1">save</v-icon>
                ویرایش
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
              <td>{{item.value}}</td>
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
      properties: [],
      submit_loader: false,
      page_title: 'مشاهده ی جزئیات آگهی',
      snack_color: "info"
    }),
    computed: {
      editLink: function () {
        return `${list}/${this.slug}/edit/${this.id}`;
      },
      list: function () {
        return `${list}/${this.slug}`;
      },
      title() {
        return Helper.priceFormat(_.get(this, 'data.advert.title', '-'));
      },
      mobile() {
        return (_.get(this, 'data.advert.mobile', '-'));
      },
      image() {
        return Helper.priceFormat(_.get(this, 'data.advert.image', '-'));
      },
      paybackTime() {
        return Helper.priceFormat(_.get(this, 'data.paybackTime', '-'));
      },
      interestRate() {
        return Helper.priceFormat(_.get(this, 'data.interestRate', '-'));
      },
      bank() {
        return Helper.priceFormat(_.get(this, 'data.bank', '-'));
      },
      editPath: function () {
        return `/admin/${this.formType.type}/${this.id}`;
      },
      city() {
        let list = this.$store.state.city.data;
        let index = _.findIndex(list, {'id': this.data.advert.cityId});
        let item = list[index];
        return _.get(item, 'name', '');
      },
      loanType() {
        let list = this.$store.state.loanType.data;
        let index = _.findIndex(list, {'id': this.data.loanTypeId});
        let item = list[index];
        return _.get(item, 'name', 0);
      },
      price() {
        return Helper.priceFormat(_.get(this, 'data.price', '-'));
      },
      amount() {
        return Helper.priceFormat(_.get(this, 'data.amount', '-'));
      },
      maxAmount() {
        return Helper.priceFormat(_.get(this, 'data.maxAmount', '-'));
      },
      job() {
        return Helper.priceFormat(_.get(this, 'data.job', '-'));
      },
      text() {
        return Helper.nl2br(_.get(this, 'data.advert.text', '-'));
      },
      guaranteeTypes() {
        let items = [];
        _.forEach(this.data.guaranteeTypes, (item) => {
          items.push(item.name)
        })
        return _.join(items, ', ')
      },
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


        // get advert data
        let getPath = `/admin/${formType.type}/${id}`;
        let query = {
          include: 'guaranteeTypes,cities,loanTypes'
        }
        let {data} = await $axios.$get(getPath, {params: query});
        //console.log('get:', getPath, {params: query}, data)
        return {
          page_title,
          formType,
          data,
          slug,
          id,
        }

      } catch (err) {
        //console.log('error', error)
        return error({statusCode: 404, message: 'آگهی یافت نشد :('})
      }
    },
    mounted() {
      this.$validator.localize("fa", this.dictionary);

      let data = this.data;
      let editable = Helper.getTypeFields(this.formType.type, 'edit');
      //console.log({editable});
      let properties = [];
      editable.forEach((field) => {
        //console.log(field.name)
        //let path = field.path;
        //let value = _.get(this, field.name, '-');
        properties.push({title: field.title, name: field.name, value: _.get(this, field.name, '-')});
      })
      //console.log({properties});
      this.properties = properties;
    },
    methods: {

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
