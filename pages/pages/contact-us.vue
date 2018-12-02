<template>
  <v-container grid-list>
    <v-card>
      <v-layout row wrap reverse>
        <v-flex xs12 md6 fill>
          <v-card light color="brown lighten-5" height="100%">
            <v-card-title>
              <h2>
                <v-icon class="pb-2 pl-1">email</v-icon>
                <span>پیشنهادات، شکایات و انتقادات</span></h2>
            </v-card-title>
            <v-card-text>
              <div v-html="settings('pages.contactUsSuggestionText')"></div>
              <br>
              <v-divider/>
              <br>
              <form>
                <v-text-field
                  v-validate="'required'"
                  v-model="title"
                  :error-messages="errors.collect('title')"
                  box
                  light
                  label="عنوان"
                  data-vv-name="title"
                  required
                />
                <v-text-field
                  v-validate="'required'"
                  v-model="phoneNumber"
                  :error-messages="errors.collect('phoneNumber')"
                  box
                  light
                  label="شماره تماس"
                  data-vv-name="phoneNumber"
                  required
                />
                <v-text-field
                  v-validate="'email'"
                  v-model="email"
                  :error-messages="errors.collect('email')"
                  box
                  light
                  label="پست الکترونیک"
                  data-vv-name="email"
                  required
                />
                <v-textarea
                  v-validate="'required'"
                  v-model="text"
                  box
                  light
                  solo
                  required
                  label="متن خود را اینجا بنویسید"
                  data-vv-name="text"
                />
                <v-btn :loading="saveLoading" outline round color="blue" flat @click="submitForm">
                  ثبت
                  <v-icon class="pr-1 font-19 pb-1">save</v-icon>
                </v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card flat>
            <v-card-title>
              <h2>
                <v-icon class="pb-2">location_on</v-icon>
                <span>ارتباط با ما</span>
              </h2>
            </v-card-title>
            <v-card-text>
              <v-divider v-if="settings('pages.contactUsText').length > 1 "/>
              <br/>
              <div v-html="settings('pages.contactUsText')"></div>
              <v-divider v-if="table"/>
              <br/>
              <div v-for="item in table" :key="item.title">
                <h4>
                  <v-icon class="px-1">{{item.icon || ''}}</v-icon>
                  {{item.title}}
                </h4>
                <p v-html="item.text"></p>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    meta: {
      title: "درباره‌ی ما",
      breadcrumb: "درباره‌ی ما",
    },
    data: () => ({
      saveLoading: false,
      text: "",
      title: "",
      phoneNumber: "",
      email: "",
      checkbox: null,
      dictionary: {
        attributes: {
          email: "آدرس ایمیل",
          title: "عنوان",
          phoneNumber: "عنوان",
          text: "متن"
          // custom attributes
        }
      }
    }),
    computed: {
      table() {
        return this.settings('pages.contactUsTable', []);
      },
      lorem() {
        return this.$store.state.temp.lorem
      }
    },
    $_veeValidate: {
      validator: "new"
    },
    mounted() {
      this.$validator.localize("fa", this.dictionary)
    },
    methods: {
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            alert('true')
            return this.sendForm()
          } else {
            this.$store.commit('snackbar/setSnack', "برخی فیلد ها مشکل دارند.", "warning")
            this.saveLoading = false
            return null
          }
        })

      },
      sendForm() {
        this.saveLoading = true;
        let data = {
          email: this.email,
          phoneNumber: this.phoneNumber,
          title: this.title,
          text: this.text,
        };
        this.$axios.$post('/site/contact-us', data)
          .then((res) => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.saveLoading = false
              this.$router.push(this.list)
            } else {
              this.toast(" خطایی رخ داد.", "warning")
              this.saveLoading = false
            }
          })
          .catch((err) => {
            //this.toast(_.get(err, 'response.data.error.message', _.get(err, 'response.data.message', 'خطای نامشخص!')), "error")
            this.toast(_.get(err, 'response.data.error.message', _.get(err, 'response.data.message', 'با تشکر از شما. پیامتان ارسال شد!')), "error")
            this.saveLoading = false
          })
      },

      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }, settings(key, def = '') {
        return _.get(this.$store.state.settings.data, key, def)
      },

      clear() {
        this.name = ""
        this.email = ""
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      }
    }
  }
</script>
