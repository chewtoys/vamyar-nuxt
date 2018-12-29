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
            <v-textarea
              v-validate="'required'"
              v-model="message"
              :error-messages="errors.collect('message')"
              box
              auto-grow
              data-vv-name="message"
              label="پیام"
            />
            <v-checkbox
              v-model="toAll"
              box
              label="برای همه ی کاربران"
            />

            <v-autocomplete
              v-if="!toAll"
              :items="allUsersList"
              v-model="userId"
              :error-messages="errors.collect('userId')"
              box
              item-value="id"
              item-text="mobile"
              label="کاربر"
              data-vv-name="userId"
            />
            <v-combobox
              :items="types"
              v-validate="'required'"
              v-model="type"
              :error-messages="errors.collect('type')"
              box
              hint="انتخاب کنید و یا بنویسید"
              label="نوع نوتیفیکیشن"
              data-vv-name="user"
            >
            </v-combobox>

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

  const page_title = 'افزودن نوتیفیکیشن جدید',
    breadcrumb = 'نوتیفیکیشن جدید',
    indexPath = '/admin/notifications',
    createPath = '/admin/notifications'

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
      date: null,
      message: '',
      type: '',
      userId: null,
      toAll: false,
      submit_loader: false,
      allUsersList: [],
      dictionary: {
        attributes: {
          message: "پیام",
          userId: "کاربر",
          type: "نوع نوتیف",
          toAll: "برای همه",
          // custom attributes
        },
      },

    }),
    computed:
      {
        types() {
          return _.get(this.$store.state, 'settings.notificationTypes', [])
        },
        updateMethod() {
          return this.toAll ? `${createPath}` : `/admin/user/${this.userId}/notifications`;
        },
        list: function () {
          return indexPath;
        }
        ,
        createPath: function () {
          return createPath;
        }
      }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary);
      this.$axios.$get('/admin/users', {params: {number: 50000}}).then(res => {
        this.allUsersList = res.data;
      })
    }
    ,
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm() {
        let data = {
          message: this.message,
          type: this.discount
        }

        this.$axios
          .$post(this.updateMethod, data)
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
      },
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
