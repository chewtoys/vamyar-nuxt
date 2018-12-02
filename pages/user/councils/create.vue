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
              <v-btn :loading="submit_loader" outline color="accent" round @click="processSubmit">
                <v-icon class="px-1">save</v-icon>
                تایید
              </v-btn>
            </v-toolbar>
          </div>
          <v-divider class="mb-5 mt-1"/>

        </v-flex>
        <v-divider class="my-3"/>
        <v-flex xs12 md12 sm12 lg12>
          <form>
            <v-text-field
              v-validate="'required'"
              v-model="job"
              :error-messages="errors.collect('job')"
              box
              data-vv-name="job"
              label="شغل"
            />
            <v-autocomplete
              v-validate="'required'"
              v-model="requestTypeName"
              :error-messages="errors.collect('requestType')"
              box
              label="نوع درخواست"
              data-vv-name="requestType"
              :items="requestTypeList"
              persistent-hint
            ></v-autocomplete>
            <v-autocomplete
              v-model="cityName"
              :error-messages="errors.collect('city')"
              box
              label="شهر"
              data-vv-name="city"
              :items="cities"
              persistent-hint
            />
            <v-textarea
              v-model="requestText"
              :error-messages="errors.collect('requestText')"
              box
              label="متن درخواست"
              data-vv-name="requestText"
              auto-grow
            />
            <v-btn :loading="submit_loader" outline color="accent" round @click="processSubmit">
              <v-icon class="px-1">save</v-icon>
              تایید
            </v-btn>
            <div v-html="html"></div>
          </form>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const page_title = 'درخواست مشاوره جدید',
    breadcrumb = 'درخواست جدید',
    indexPath = '/user/councils',
    createPath = '/user/councils',
    councilRequestTypes = '/councilRequestTypes',
    cityMethod = '/cities?number=3000'

  export default {
    $_veeValidate: {
      validator: "new"
    }
    ,
    meta: {
      title: page_title,
      breadcrumb:
      breadcrumb
    }
    ,
    data: () => ({
      page_title,
      // ticket
      title: null,
      html: "",
      job: "",
      cityName: null,
      requestTypeList: [],
      cities: [],
      requestText: "",
      requestTypeName: '',


      // validator dictionary
      dictionary: {
        attributes: {
          job: "شغل",
          city: "شهر",
          requestText: "متن درخواست",
          requestType: 'نوع مشاوره '
          // custom attributes
        }
      },
      submit_loader: false,
    }),
    computed:
      {
        list: function () {
          return indexPath;
        }
        ,
        createPath: function () {
          return createPath;
        }
        ,
        city: function () {
          let list = _.get(this.$store.state.city, 'data', []);
          let index = _.findIndex(list, {'name': this.cityName});
          if (index > 0) {
            let item = list[index];
            return _.get(item, 'id', 0);
          }
          return 0;
        },
        requestType() {
          let list = this.$store.state.councilTypes.data;
          let index = _.findIndex(list, {'title': this.requestTypeName});
          let item = list[index];
          return _.get(item, 'id', 0);
        }
        ,
      }
    ,
    async asyncData({params, store, $axios}) {
      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);

        // loan types
        let councilTypes = await
          $axios.$get(councilRequestTypes);
        store.commit('councilTypes/setAndProcessData', councilTypes.data || []);
      } catch (error) {
        console.log('error', error)
      }
      return {
        cities: _.get(store.state, 'city.arrayList', []),
        requestTypeList: _.get(store.state, 'councilTypes.arrayList', []),
      }
    }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary)
    }
    ,
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm() {
        let data = {
          job: this.job,
          city: this.city,
          requestText: this.requestText,
          requestType: this.requestType,
          port: 'zarinpal'
        }
        this.$axios
          .$post(createPath, data)
          .then((res) => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              this.html = res;
              //this.$router.push(indexPath)
            } else {
              this.toast(" خطایی رخ داد.", "warning")
              this.submit_loader = false
            }
          })
          .catch((error) => {
            // catch and show error
            this.toast(_.get(error, 'response.data.error.message', {error}), "error")
            //console.log(1, _.get(error, 'response.data.error', 'no res.data'), 3, _.get(error, 'response.data.error.message', 'no data'))
            if (_.isArray(_.get(error, 'response.data.error.message', ''))) {
              _.forEach(_.get(error, 'response.data.error.message', []), (value, key) => {
                this.toast(value, "error")
              })
            }
            this.submit_loader = false
          })
      }
      ,
      processSubmit() {
        this.submit_loader = true
        this.$validator
          .validateAll()
          .then(result => {
            if (result) {
              this.sendForm()
            } else {
              this.toast("برخی فیلد ها مشکل دارند.", "warning")
              this.submit_loader = false
              return null
            }
          })
          .catch(err => {
            this.toast(err, "error")
          })
      }
    }
  }
</script>
