<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h3>تنظمیات سرور</h3>
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
            تنظیمات
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
              v-model="introducingAwardLimit"
              :error-messages="errors.collect('introducingAwardLimit')"
              box
              label="محدودیت پاداش معرفی"
              data-vv-name="introducingAwardLimit"
              required
            />
            <v-text-field
              validate="required"
              v-model="introducingAwardDiscount"
              :error-messages="errors.collect('introducingAwardDiscount')"
              box
              label="میزان تخفیف برای معرفی"
              data-vv-name="introducingAwardDiscount"
            />
            <v-text-field
              validate="required"
              v-model="councilLink"
              :error-messages="errors.collect('councilLink')"
              box
              label="لینک مشاوره"
              data-vv-name="councilLink"
            />
            <v-text-field
              validate="required"
              v-model="councilPrice"
              :error-messages="errors.collect('councilPrice')"
              box
              label="هزینه ی مشاوره"
              data-vv-name="councilPrice"
            />
            <v-text-field
              validate="required"
              v-model="instantPrice"
              :error-messages="errors.collect('instantPrice')"
              box
              label="هزینه ی فوری کردن آگهی"
              data-vv-name="instantPrice"
            />
            <v-text-field
              validate="required"
              v-model="allowedLoanRequests"
              :error-messages="errors.collect('allowedLoanRequests')"
              box
              label="تعداد درخواست های وام مجاز"
              data-vv-name="allowedLoanRequests"
            />
            <v-text-field
              validate="required"
              v-model="allowedFinanceRequests"
              :error-messages="errors.collect('allowedFinanceRequests')"
              box
              label="تعداد درخواست های سرمایه ی مجاز"
              data-vv-name="allowedFinanceRequests"
            />
            <v-text-field
              validate="required"
              v-model="allowedCoSignerRequests"
              :error-messages="errors.collect('allowedCoSignerRequests')"
              box
              label="تعداد درخواست های ضامن مجاز"
              data-vv-name="allowedCoSignerRequests"
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

  const PATH = '/admin/config',
    list = [
      'introducingAwardLimit',
      'introducingAwardDiscount',
      'councilLink',
      'councilPrice',
      'instantPrice',
      'allowedLoanRequests',
      'allowedFinanceRequests',
      'allowedCoSignerRequests',
    ];

  export default {
    meta: {
      breadcrumb: 'تنظیمات سرور',
      title: 'تنظیمات سرور'
    },
    data() {
      return {

        tab: 'tab-1',
        savePending: false,
        saveLoading: false,

        data: [],
        // settings
        introducingAwardLimit: '',
        introducingAwardDiscount: '',
        councilLink: '',
        councilPrice: '',
        instantPrice: '',
        allowedLoanRequests: '',
        allowedFinanceRequests: '',
        allowedCoSignerRequests: '',

        // validator dictionary
        dictionary: {
          attributes: {
            introducingAwardLimit: 'محدودیت پاداش معرفی',
            introducingAwardDiscount: 'میزان تخفیف برای معرفی',
            councilLink: 'لینک مشاوره',
            councilPrice: 'هزینه ی مشاوره',
            instantPrice: 'هزینه ی فوری کردن آگهی',
            allowedLoanRequests: 'تعداد درخواست های وام مجاز',
            allowedFinanceRequests: 'تعداد درخواست های سرمایه ی مجاز',
            allowedCoSignerRequests: 'تعداد درخواست های ضامن مجاز"'
          }
        }
      }
    },
    methods: {
      save() {
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
      sendForm() {
        let data = {};
        _.forEach(list, (name) => {
          _.set(data, name, _.get(this, name, ''))
        });
        console.log({data})
        this.$axios
          .$put(this.sendPath, data)
          .then((response) => {
            this.saveLoading = false
          }).catch((error) => {
          this.saveLoading = false
        })
      }
    },
    computed: {
      sendPath() {
        return PATH
      }
    },
    async asyncData({$axios, store, error}) {
      // set initial data
      let method = PATH;
      try {
        let {data} = await $axios.$get(method);
        return {data}
      } catch (err) {
        return error({statusCode: 503, message: err})
      }
    },
    mounted() {
      _.forEach(list, (name) => {
        _.set(this, name, _.get(this.data, name, ''))
      });
    },
    components: {Editor, Crud},
  }
</script>
