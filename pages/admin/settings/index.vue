<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h3>تنظمیات عمومی سایت</h3>
        <v-spacer/>
        <v-btn outline color="green" round @click="save" :loading="saveLoading" :pending="savePending">
          ذخیره سازی
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          validate="required"
          v-model="siteTitle"
          :error-messages="errors.collect('siteTitle')"
          box
          label="عنوان سایت"
          data-vv-name="siteTitle"
          required
        />
        <v-textarea
          validate="required"
          v-model="siteDescription"
          :error-messages="errors.collect('siteDescription')"
          box
          label="توضیحات متا"
          data-vv-name="siteDescription"
          auto-grow
        />
        <v-checkbox
          v-model="isSiteOpen"
          box
          label="سایت باز باشد؟"
        />
        <v-textarea
          v-if="!isSiteOpen"
          validate="required"
          v-model="closedSiteText"
          :error-messages="errors.collect('closedSiteText')"
          box
          label="توضیحات در صورت بسته بودن سایت"
          data-vv-name="closedSiteText"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="footerText"
          :error-messages="errors.collect('footerText')"
          box
          label="توضیحات فوتر در صفحه ی نخست"
          data-vv-name="footerText"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="headerText"
          :error-messages="errors.collect('headerText')"
          box
          label="توضیحات هدر در صفحه ی نخست"
          data-vv-name="headerText"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="subHeaderText"
          :error-messages="errors.collect('subHeaderText')"
          box
          label="توضیحات زیر هدر سایت"
          data-vv-name="subHeaderText"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="noticeOnAdvertShow"
          :error-messages="errors.collect('noticeOnAdvertShow')"
          box
          label="توضیحات در صفحه ی نمایش آگهی"
          data-vv-name="noticeOnAdvertShow"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="noticeBeforeCreateAdvert"
          :error-messages="errors.collect('noticeBeforeCreateAdvert')"
          box
          label="توضیحات در صفحه ی ایجاد آگهی"
          data-vv-name="noticeBeforeCreateAdvert"
          auto-grow
        />
        <v-checkbox
          v-model="isImageAllowed"
          box
          label="افزودن تصویر برای آگهی ها مجاز است؟"
        />
        <v-textarea
          validate="required"
          v-model="aboutUsText"
          :error-messages="errors.collect('aboutUsText')"
          box
          label="متن صفحه ی درباره ی ما"
          data-vv-name="aboutUsText"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="contactUsText"
          :error-messages="errors.collect('contactUsText')"
          box
          label="متن صفحه‌ي تماس با ما"
          data-vv-name="contactUsText"
          auto-grow
        />
        <v-textarea
          validate="required"
          v-model="educationText"
          :error-messages="errors.collect('educationText')"
          box
          label="متن صفحه‌ي آموزش"
          data-vv-name="educationText"
          auto-grow
        />
      </v-card-text>
      <v-card-actions>
        <v-btn outline color="green" round @click="save" :loading="saveLoading" :pending="savePending">
          ذخیره سازی
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'


  const SAVE_PATH = '/settings'
  export default {
    meta: {
      breadcrumb: 'تنظیمات عمومی',
      title: 'تنظیمات عمومی سایت'
    },
    data() {
      return {
        savePending: false,
        saveLoading: false,

        // settings
        siteTitle: '',
        siteDescription: '',
        siteLogo: '',
        isSiteOpen: '',
        footerText: '',
        headerText: '',
        subHeaderText: '',
        closedSiteText: '',
        noticeOnAdvertShow: '',
        noticeBeforeCreateAdvert: '',
        isImageAllowed: '',
        aboutUsText: '',
        contactUsText: '',
        educationText: '',

        // adverts

        // validator dictionary
        dictionary: {
          attributes: {
            siteTitle: "عنوان سایت",
            siteDescription: "توضیحات متا",
            siteLogo: 'لوگوی سایت',
            isSiteOpen: 'باز بودن سایت',
            footerText: 'متن فوتر',
            headerText: 'متن هدر',
            subHeaderText: 'متن زیرهدر',
            closedSiteText: 'متن بسته بودن سایت',
            noticeOnAdvertShow: 'متن صفحه ی نمایش آگهی',
            noticeBeforeCreateAdvert: 'پیام قبل از ایجاد آگهی',
            isImageAllowed: 'امکان ثبت تصویر در آگهی',
            aboutUsText: 'متن صفحه ی درباره ی ما',
            contactUsText: 'متن صفحه ی تماس با ما',
            educationText: 'متن بالای قسمت آموزش',
          }
        }
      }
    },
    methods: {
      save: function () {
        this.saveLoading = true
        this.$validator
          .validateAll()
          .then(result => {
            if (result) {
              this.sendForm()
            } else {
              this.$store.commit('snackbar/setSnack', "برخی فیلد ها مشکل دارند.", "warning")
              this.saveLoading = false
              return null
            }
          })
      },
      sendForm: function () {
        let groups = Helper.getGeneralSettingsGroup();
        _.forEach(groups, (Keys, groupKey) => {
          let data = {};
          _.forEach(Keys, (name) => {
            data[name] = _.get(this, name, null);
          })
          if (_.has(this.$store.state.settings.data, groupKey)) {
            this.$axios
              .put(SAVE_PATH + '/' + groupKey,
                {key: groupKey, value: JSON.stringify(data)}
              )
              .then((response) => {
                let status = true
                if (status) {
                  // show success and redirect
                  let fetchData = this.$axios.$get('/settings');
                  if (_.has(fetchData, 'data')) this.$store.commit('settings/setAndProcessData', fetchData.data)
                  this.$store.commit('snackbar/setSnack', "با موفقیت ثبت شد.", "success")
                } else {
                  this.$store.commit('snackbar/setSnack', " خطایی رخ داد.", "warning")
                }
                this.saveLoading = false
              }).catch((error) => {
              this.saveLoading = false
            })
          } else {
            this.$axios
              .post(SAVE_PATH,
                {key: groupKey, value: JSON.stringify(data)}
              )
              .then((response) => {
                let status = true
                if (status) {
                  // show success and redirect
                  this.$store.commit('snackbar/setSnack', "با موفقیت ثبت شد.", "success")
                } else {
                  this.$store.commit('snackbar/setSnack', " خطایی رخ داد.", "warning")
                }
                this.saveLoading = false
              }).catch((error) => {
              this.saveLoading = false
            })
          }
        })
      }
    },
    mounted() {
      // set initial data
      let groups = Helper.getGeneralSettingsGroup();
      _.forEach(groups, (values, groupKey) => {
        _.forEach(values, (name, value) => {
          _.set(this, name, _.get(this.$store.state.settings.data, [groupKey, name], ''))
        })
      })
    }
  }
</script>
