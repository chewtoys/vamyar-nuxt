<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h3>تنظمیات </h3>
        <v-spacer/>
        <v-btn outline color="green" round @click="save" :loading="saveLoading" :pending="savePending">
          ذخیره سازی
        </v-btn>
      </v-card-title>

      <v-card-text>

        <v-tabs
          slot="extension"
          v-model="tab"
          centered
          fixed-tabs
          color="transparent"
        >
          <v-tab href="#tab-1">
            تنظیمات  سایت
          </v-tab>
          <v-tab href="#tab-2">
            تنظیمات  آگهی ها
          </v-tab>
          <v-tab href="#tab-3">
            تنظیمات  صفحات
          </v-tab>
          <v-tab href="#tab-4">
            تنظیمات  صفحه ی نخست
          </v-tab>
          <v-tab href="#tab-5">
            تنظیمات  کاربری
          </v-tab>
        </v-tabs>
        <br/>
        <v-divider/>
        <br/>

        <v-tabs-items v-model="tab">
          <v-tab-item
            value="tab-1"
          >

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

            <Editor
              v-if="!isSiteOpen"
              validate="required"
              v-model="closedSiteText"
              :error-messages="errors.collect('closedSiteText')"
              box
              label="توضیحات در صورت بسته بودن سایت"
              data-vv-name="closedSiteText"
              auto-grow
            />

            <Editor
              validate="required"
              v-model="footerText"
              :error-messages="errors.collect('footerText')"
              box
              label="توضیحات فوتر در صفحه ی نخست"
              data-vv-name="footerText"
              auto-grow
            />
          </v-tab-item>
          <v-tab-item
            value="tab-2"
          >
            <Editor
              validate="required"
              v-model="noticeOnAdvertShow"
              :error-messages="errors.collect('noticeOnAdvertShow')"
              box
              label="توضیحات در صفحه ی نمایش آگهی"
              data-vv-name="noticeOnAdvertShow"
              auto-grow
            />
            <Editor
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
          </v-tab-item>
          <v-tab-item
            value="tab-3"
          >

            <Editor
              validate="required"
              v-model="aboutUsText"
              :error-messages="errors.collect('aboutUsText')"
              box
              label="متن صفحه ی درباره ی ما"
              data-vv-name="aboutUsText"
              auto-grow
            />
            <Editor
              validate="required"
              v-model="contactUsText"
              :error-messages="errors.collect('contactUsText')"
              box
              label="متن صفحه‌ي تماس با ما"
              data-vv-name="contactUsText"
              auto-grow
            />
            <Crud
              v-model="contactUsTable"
              :structure="contactUsTableStructure"
              label="اطلاعات تماس در صفحه ی تماس با ما"
            />
            <Editor
              validate="required"
              v-model="contactUsSuggestionText"
              :error-messages="errors.collect('contactUsSuggestionText')"
              box
              label="متن قسمت پیشنهادات و انتقادات"
              data-vv-name="contactUsSuggestionText"
              auto-grow
            />
            <Editor
              validate="required"
              v-model="rulesText"
              :error-messages="errors.collect('rulesText')"
              box
              label="متن قوانین"
              data-vv-name="rulesText"
              auto-grow
            />
            <Editor
              validate="required"
              v-model="educationText"
              :error-messages="errors.collect('educationText')"
              box
              label="متن صفحه‌ي آموزش"
              data-vv-name="educationText"
              auto-grow
            />

          </v-tab-item>
          <v-tab-item
            value="tab-4"
          >
            <Crud
              v-model="onMedia"
              :structure="mediaStructure"
              label="ما در رسانه ها"
            />

            <Crud
              v-model="whyUs"
              :structure="whyUsStructure"
              label="چرا ما؟"
            />
            <Crud
              v-model="whatWeDo"
              :structure="whatWeDoStructure"
              label="چه کارهایی در وامیار انجام می شود؟"
            />

            <v-text-field
              validate="required"
              v-model="whatWeDoClip"
              :error-messages="errors.collect('whatWeDoClip')"
              box
              label="آدرس فایل کلیپ"
              data-vv-name="whatWeDoClip"
              required
            />
            <v-text-field
              validate="required"
              v-model="headerBgUrl"
              :error-messages="errors.collect('headerBgUrl')"
              box
              label="آدرس بکگراند هدر"
              data-vv-name="headerBgUrl"
              required
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
          </v-tab-item>
          <v-tab-item
            value="tab-5"
          >
            <Editor
              validate="required"
              v-model="premiumText"
              :error-messages="errors.collect('premiumText')"
              box
              label="توضیحات در صفحه ی ارتقا حساب"
              data-vv-name="premiumText"
              auto-grow
            />
          </v-tab-item>

        </v-tabs-items>

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
  import Editor from '~/components/elements/Editor'
  import Crud from '~/components/elements/Crud'

  const SAVE_PATH = '/settings'
  export default {
    meta: {
      breadcrumb: 'تنظیمات عمومی',
      title: 'تنظیمات عمومی سایت'
    },
    data() {
      return {

        mediaStructure: [
          {title: 'نام رسانه', name: 'name', type: 'text', value: ''},
          {title: 'توضیحات', name: 'desc', type: 'textarea', value: ''},
          {title: 'لینک رسانه', name: 'link', type: 'text', value: ''},
          {title: 'تصویر', name: 'image', type: 'image', value: ''},
        ],
        whyUsStructure: [
          {title: 'عنوان', name: 'title', type: 'text', value: ''},
          {title: 'توضیحات', name: 'desc', type: 'textarea', value: ''},
          {title: 'تصویر', name: 'image', type: 'image', value: ''},
        ],
        whatWeDoStructure: [
          {title: 'عنوان', name: 'title', type: 'text', value: ''},
          {title: 'توضیحات', name: 'desc', type: 'textarea', value: ''},
          {title: 'تصویر', name: 'image', type: 'image', value: ''},
        ],
        contactUsTableStructure: [
          {title: 'عنوان', name: 'title', type: 'text', value: ''},
          {title: 'متن', name: 'text', type: 'text', value: ''},
        ],

        tab: 'tab-1',
        savePending: false,
        saveLoading: false,

        // settings
        whatWeDoClip: '',
        siteTitle: '',
        siteDescription: '',
        siteLogo: '',
        isSiteOpen: '',
        onMedia: [],
        whatWeDo: [],
        whyUs: [],
        footerText: '',
        contactUsSuggestionText: '',
        headerText: '',
        subHeaderText: '',
        closedSiteText: '',
        noticeOnAdvertShow: '',
        premiumText: '',
        noticeBeforeCreateAdvert: '',
        isImageAllowed: '',
        aboutUsText: '',
        contactUsText: '',
        contactUsTable: '',
        educationText: '',
        rulesText: '',

        // adverts

        // validator dictionary
        dictionary: {
          attributes: {
            siteTitle: "عنوان سایت",
            siteDescription: "توضیحات متا",
            siteLogo: 'لوگوی سایت',
            onMedia: 'ما در رسانه ها',
            whatWeDo: 'ما چه کار می کنیم',
            headerBgUrl: 'تصویر پس زمینه ی هدر',
            whatWeDoClip: 'کلیپ ما چه کار می کنیم',
            whyUs: 'چرا ما',
            isSiteOpen: 'باز بودن سایت',
            footerText: 'متن فوتر',
            headerText: 'متن هدر',
            subHeaderText: 'متن زیرهدر',
            closedSiteText: 'متن بسته بودن سایت',
            premiumText: 'متن صفحه ی ارتقای حساب',
            noticeOnAdvertShow: 'متن صفحه ی نمایش آگهی',
            noticeBeforeCreateAdvert: 'پیام قبل از ایجاد آگهی',
            isImageAllowed: 'امکان ثبت تصویر در آگهی',
            aboutUsText: 'متن صفحه ی درباره ی ما',
            contactUsText: 'متن صفحه ی تماس با ما',
            contactUsTable: 'اطلاعات صفحه ی تماس با ما',
            contactUsSuggestionText: 'متن صفحه ی تماس با ما',
            educationText: 'متن بالای قسمت آموزش',
            rulesText: 'متن قسمت قوانین',
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

                // show success and redirect
                this.$axios.$get('/settings').then((fetchData) => {
                  if (_.has(fetchData, 'data')) this.$store.commit('settings/setAndProcessData', fetchData.data)
                  this.$store.commit('snackbar/setSnack', "با موفقیت ثبت شد.", "success")
                }).catch(err => {
                  this.$store.commit('snackbar/setSnack', " خطایی رخ داد.", "warning")
                })
                //window.location = '/admin/settings';
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

                // show success and redirect
                this.$axios.$get('/settings').then((fetchData) => {
                  if (_.has(fetchData, 'data')) this.$store.commit('settings/setAndProcessData', fetchData.data)
                  this.$store.commit('snackbar/setSnack', "با موفقیت ثبت شد.", "success")
                }).catch(err => {
                  this.$store.commit('snackbar/setSnack', " خطایی رخ داد.", "warning")
                })

                this.$store.commit('snackbar/setSnack', "با موفقیت ثبت شد.", "success")
                //window.location = '/admin/settings';

                this.saveLoading = false
              }).catch((error) => {
              this.saveLoading = false
            })
          }
        })
      }
    },
    asyncData({store, error}) {
      // set initial data
      if (false && (!_.get(store.state.settings, 'data', false) || _.isEmpty(_.get(store.state.settings, 'data', null)))) {
        return error({
          statusCode: 503,
          message: 'در گرفتن تنظیمات مشکلی رخ داد.'
        })
      }
      let groups = Helper.getGeneralSettingsGroup();
      let list = {};
      _.forEach(groups, (values, groupKey) => {
        _.forEach(values, (name, value) => {
          //console.log(name, value, _.get(store.state.settings.data, [groupKey, name]))
          _.set(list, name, _.get(store.state.settings.data, [groupKey, name], ''))
        })
      })
      return list
    },
    components: {Editor, Crud},
  }
</script>
