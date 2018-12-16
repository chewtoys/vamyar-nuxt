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
                ذخیره
              </v-btn>
            </v-toolbar>
          </div>
          <v-divider class="mb-5 mt-1"/>

        </v-flex>
        <v-divider class="my-3"/>
        <v-flex xs12 md12 sm12 lg12>
          <form>
            <v-text-field
              v-validate="''"
              v-model="firstName"
              :error-messages="errors.collect('firstName')"
              box
              data-vv-name="firstName"
              label="نام"
            />
            <v-text-field
              v-validate="''"
              v-model="lastName"
              :error-messages="errors.collect('lastName')"
              box
              data-vv-name="lastName"
              label="نام خانوادگی"
            />
            <v-text-field
              v-validate="'required|min:10|numeric'"
              v-model="mobile"
              :error-messages="errors.collect('mobile')"
              box
              data-vv-name="mobile"
              label="موبایل"
            />
            <v-text-field
              v-validate="'email'"
              v-model="email"
              :error-messages="errors.collect('email')"
              box
              type="email"
              data-vv-name="email"
              label="ایمیل"
            />
            <v-text-field
              v-validate="'min:6'"
              v-model="password"
              :error-messages="errors.collect('password')"
              box
              type="password"
              data-vv-name="password"
              label="رمز عبور جدید"
            />

            <v-btn :loading="submit_loader" outline color="accent" round @click="processSubmit">
              <v-icon class="px-1">save</v-icon>
              ذخیره
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const page_title = 'ویرایش حساب ',
    breadcrumb = 'ویرایش',
    indexPath = '/admin/users',
    resourcePath = '/admin/users'

  export default {
    $_veeValidate: {
      validator: "new"
    }
    ,
    meta: {
      title: page_title,
      breadcrumb: breadcrumb
    },
    data: () => ({
      page_title,
      // ticket
      firstName: null,
      lastName: null,
      mobile: null,
      verified: false,
      email: null,
      image: null,
      password: null,
      password_confirmation: null,

      // validator dictionary
      dictionary: {
        attributes: {
          firstName: "نام",
          lastName: "نام خانوادگی",
          mobile: "موبایل",
          email: "ایمیل",
          image: "عکس",
          verified: "تایید حساب",
          password: "رمز عبور",
          password_confirmation: "تکرار رمز عبور",
          // custom attributes
        }
      },
      submit_loader: false
    }),
    mounted() {
      let method = this.uri;
      let query = {
        include: 'details'
      }
      //console.log({method})
      this.$axios.$get(method, {params: query}).then(res => {
        this.data = _.get(res, 'data');
        this.firstName = _.get(res, 'data.firstName', '');
        this.lastName = _.get(res, 'data.lastName', '');
        this.email = _.get(res, 'data.email', '');
        this.mobile = _.get(res, 'data.mobile', '');
        this.image = _.get(res, 'data.image', '');
      }).catch(err => {
        //console.log(err);
      })
      this.$validator.localize("fa", this.dictionary);
    },
    computed:
      {
        uri() {
          return `${resourcePath}/${this.id}`;
        },
        list: function () {
          return indexPath;
        }
      }
    ,
    async asyncData({params}) {
      return {
        id: params.id
      }
    },
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm() {
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          image: this.image,
          mobile: this.mobile,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        this.$axios
          .$put(this.uri, data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              this.$router.push(indexPath)
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
