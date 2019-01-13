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
              v-model="title"
              :error-messages="errors.collect('title')"
              box
              data-vv-name="title"
              label="عنوان درخواست"
            />
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
              v-model="requestType"
              :error-messages="errors.collect('requestType')"
              box
              item-value="id"
              item-text="title"
              label="نوع درخواست"
              data-vv-name="requestType"
              :items="requestTypeList"
              persistent-hint
            ></v-autocomplete>
            <v-autocomplete
              v-model="province"
              :error-messages="errors.collect('province')"
              box
              label="استان"
              data-vv-name="province"
              :items="cities"
              item-value="id"
              item-text="name"
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
    createPath = '/user/councils/paymentLink',
    councilRequestTypes = '/site/councilRequestTypes',
    provinceMethod = '/cities?number=3000'

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
      province: '',
      page_title,
      // ticket
      title: null,
      html: "",
      job: "",
      requestText: "",
      requestType: '',
      // validator dictionary
      dictionary: {
        attributes: {
          title: "عنوان",
          job: "شغل",
          province: "استان",
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
        },
        createPath: function () {
          return createPath;
        },
        cities() {
          return _.get(this.$store.state, 'province.data', [])
        },
        requestTypeList() {
          return _.get(this.$store.state, 'councilTypes.data', [])
        },
      }
    ,
    async asyncData({params, store, $axios}) {
      try {
        // province
        let provinceData = await $axios.$get(provinceMethod);
        store.commit('province/setAndProcessData', provinceData.data || []);
        // loan types
        let councilTypes = await
          $axios.$get(councilRequestTypes);
        store.commit('councilTypes/setAndProcessData', councilTypes.data || []);

      } catch (error) {
        console.log('error', error)
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
          title: this.title,
          job: this.job,
          province: this.province,
          requestText: this.requestText,
          requestType: this.requestType,
          port: 'zarinpal',
          data: {redirect: '/user/councils'},
        }
        this.$axios
          .$get(createPath, {params: data})
          .then((res) => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              this.html = res;
              location.href = _.get(res, 'data.paymentLink', '/user/councils');
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
