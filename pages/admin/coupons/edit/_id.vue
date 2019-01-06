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
              v-validate="'required'"
              v-model="code"
              :error-messages="errors.collect('code')"
              box
              data-vv-name="code"
              label="کد"
            />
            <v-text-field
              v-validate="'required'"
              v-model="discount"
              :error-messages="errors.collect('discount')"
              box
              placeholder="ریال"
              data-vv-name="discount"
              label="مقدار تخفیف"
            />
            <v-autocomplete
              :items="allUsersList"
              v-validate="'required'"
              v-model="userId"
              :error-messages="errors.collect('userId')"
              box
              item-value="id"
              item-text="mobile"
              label="کاربر"
              data-vv-name="userId"
            >
            </v-autocomplete>
            <v-checkbox
              v-model="oneTimeUsable"
              box
              label="یکبار مصرف باشد؟"
            />
            <br/>
            <v-label>تاریخ انقضا را مشخص کنید:</v-label>
            <no-ssr>
              <date-picker
                inputFormat="YYYY-MM-DD HH:mm"
                format="jYYYY-jMM-jDD HH:mm"
                :editable="false"
                type="datetime"
                v-model="date"></date-picker>
            </no-ssr>
            <br/>
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
  const moment = require('moment-jalaali');
  const page_title = 'ویرایش کد تخفیف ',
    breadcrumb = 'کدتخفیف',
    indexPath = '/admin/coupons',
    createPath = '/admin/coupons'

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
      id: null,
      jdate: null,
      date: null,
      code: '',
      userName: '',
      userId: null,
      discount: '',
      oneTimeUsable: false,
      submit_loader: false,
      allUsersList: [],
      data: null,
      dictionary: {
        attributes: {
          code: "کد تخفیف",
          userId: "کاربر",
          expireDate: "انقضا",
          discount: "تخفیف",
          onTimeUsable: 'یکبار مصرف بودن',
          // custom attributes
        },
      },

    }),
    watch: {
      date() {
        // console.log(this.expireDate)
      }
    },
    computed:
      {
        list: function () {
          return indexPath;
        }
        ,
        sendPath: function () {
          return `${indexPath}/${this.id}`;
        },
        expireDate: {
          get() {
            let jalali = this.date;
            let gregorian = moment(jalali, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss');
            return gregorian;
          },
          set(val) {
            if (!val) return '-';
            try {
              let m = moment(val, 'YYYY-M-D HH:mm:ss')
              this.date = (m.isValid()) ? m.format('jYYYY/jM/jD HH:mm') : val;
            } catch (err) {
              //console.log(err, val)
              this.date = val;
            }
          }
        }
      }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary);
      this.$axios.$get('/admin/users', {params: {number: 5000}}).then(res => {
        this.allUsersList = res.data;
        console.log(this.usersList)
      })
      this.code = _.get(this.data, 'code', '');
      this.discount = _.get(this.data, 'discount', '');
      this.expireDate = _.get(this.data, 'expireDate', '');
      this.onTimeUsable = _.get(this.data, 'onTimeUsable', '');
      this.userId = _.get(this.data, 'userId', '');
    },
    async asyncData({params, $axios, error}) {
      let id = params.id;
      let method = `${indexPath}/${id}`
      try {
        let {data} = await $axios.$get(method);
        return {id, data}
      } catch (err) {
        return error({statusCode: 503, message: err})
      }
    }
    ,
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm() {
        let data = {
          code: this.code,
          discount: this.discount,
          userId: this.userId,
          oneTimeUsable: this.oneTimeUsable ? 1 : 0,
          expireDate: this.expireDate,
        }
        this.$axios
          .$put(this.sendPath, data)
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
