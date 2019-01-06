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

            <v-checkbox
              v-validate="''"
              v-model="verified"
              :error-messages="errors.collect('verified')"
              box
              data-vv-name="verified"
              label="شماره تایید شده"
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
            <ImgUpload
              v-model="image"
              box
              label="تصویر کاربر"
            />

            <v-card color="lime lighten-3" v-if="hasSubscription" class="my-4">
              <v-card-title>جزئیات اشتراک این کاربر</v-card-title>
              <table class="oddTable">
                <tbody v-for="plan in userSubscriptions" :key="plan.id">
                <tr>
                  <td>
                    <small>عنوان</small>
                  </td>
                  <td>{{getProperty(plan, 'subscriptionPlan.title')}}</td>
                </tr>
                <tr>
                  <td>
                    <small>دوره</small>
                  </td>
                  <td>{{getProperty(plan, 'subscriptionPlan.period')}} روزه</td>
                </tr>
                <tr>
                  <td>
                    <small>تاریخ فعالسازی</small>
                  </td>
                  <td>{{getProperty(plan, 'jCreatedAt', '-')}}</td>
                </tr>
                <tr>
                  <td>
                    <small>تاریخ انقضا</small>
                  </td>
                  <td>{{formatDate(getProperty(plan, 'endDate.date', '-'))}}</td>
                </tr>
                <tr>
                  <td>
                    <small>روزهای باقی مانده</small>
                  </td>
                  <td>{{getProperty(plan, 'remainedDays', '-')}} روز</td>
                </tr>
                </tbody>
              </table>
            </v-card>
            <v-card color="primary lighten-4" v-if="hasSubscription" class="my-4">
              <v-card-title>تمدید اشتراک</v-card-title>
              <v-select
                v-model="currentSubscriptionId"
                :items="userSubscriptions"
                item-text="title"
                item-value="id"
                label="اشتراکی که میخواهد تمدید کنید را انتخاب کنید"
                persistent-hint
                return-object
                single-line
              ></v-select>
              <v-text-field
                v-validate="''"
                v-model="days"
                :error-messages="errors.collect('days')"
                box
                label="تعداد روزی که میخواهید اضافه کنید"
              />
              <v-btn color="info" @click="addDays">افزودن روز به اشتراک</v-btn>
            </v-card>
            <v-card color="warning lighten-4" v-if="hasSubscription" class="my-4">
              <v-card-title>حذف اشتراک</v-card-title>
              <v-select
                v-model="currentDeleteSubscriptionId"
                :items="userSubscriptions"
                item-text="title"
                item-value="id"
                label="اشتراکی که میخواهد حذف کنید را انتخاب کنید"
                persistent-hint
                return-object
                single-line
              ></v-select>
              <v-btn color="error" @click="removeSubscription">حذف اشتراک</v-btn>
            </v-card>

            <v-card color="success lighten-4" class="my-4">
              <v-card-title>افزودن اشتراک جدید</v-card-title>
              <v-select
                v-model="newSubscription"
                :items="subscriptionsList"
                item-text="title"
                item-value="id"
                label="اشتراک جدید را انتخاب کنید"
                persistent-hint
                return-object
                single-line
              ></v-select>
              <v-btn color="success" @click="addSubscription">افزودن اشتراک به حساب</v-btn>
              <br/>
            </v-card>

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
  import ImgUpload from '~/components/elements/FileUploader.vue'

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
      newSubscription: '',
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
      subscriptionsList: [],
      data: [],
      currentSubscriptionId: '',
      currentDeleteSubscriptionId: '',
      days: null,

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
      this.initialLoad();
    },
    computed:
      {
        hasSubscription() {
          return !!(_.get(this, 'data.subscriptions', []).length);
        },
        userSubscriptions() {
          return _.get(this, 'data.subscriptions', []);
        },
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
      formatDate(jdate) {
        return Helper.dateFormat(jdate, 'YYYY/M/D HH:mm:ss', 'jYYYY/jM/jD HH:mm:ss');
      },
      getProperty(item, path, val) {
        return _.get(item, path, val);
      },
      initialLoad() {
        let method = this.uri;
        let query = {
          include: 'details.subscriptions.subscriptionPlan'
        }
        //console.log({method})
        this.$axios.$get(method, {params: query}).then(res => {
          this.data = _.get(res, 'data');
          this.firstName = _.get(res, 'data.details.firstName', '');
          this.lastName = _.get(res, 'data.details.lastName', '');
          this.email = _.get(res, 'data.email', '');
          this.verified = _.get(res, 'data.verified', '');
          this.mobile = _.get(res, 'data.mobile', '');
          this.image = _.get(res, 'data.image', '');
        }).catch(err => {
          //console.log(err);
        })
        this.$validator.localize("fa", this.dictionary);

        let subscriptionsMethods = '/site/subscriptionPlans'
        this.$axios.$get(subscriptionsMethods).then(res => {
          this.subscriptionsList = _.get(res, 'data', [])
        }).catch(err => {
        })
      },
      addSubscription() {
        let subscriptionId = _.get(this.newSubscription, 'id', null);
        let addMethod = `/admin/users/${this.id}/subscriptions`;
        this.$axios.$post(addMethod, {subscription: subscriptionId}).then(res => {
          //console.log(res);
          this.$store.commit('snackbar/setSnack', 'با موفقیت افزوده شد');
          this.initialLoad()
        }).catch(err => {
        })
      },
      addDays() {
        let addDays = this.days;
        let addMethod = `/admin/users/${this.id}/subscriptions/${_.get(this.currentSubscriptionId, 'id', null)}`
        this.$axios.$put(addMethod, {
          addDays,
          // subscription: _.get(this.currentSubscriptionId, 'id', null)
        }).then(res => {
          console.log(res);
          this.$store.commit('snackbar/setSnack', 'با موفقیت افزوده شد');
          this.initialLoad()
        }).catch(err => {
        })
      },
      removeSubscription() {
        let addMethod = `/admin/users/${this.id}/subscriptions/${_.get(this.currentDeleteSubscriptionId, 'id', null)}`
        this.$axios.$delete(addMethod).then(res => {
          console.log(res);
          this.$store.commit('snackbar/setSnack', 'با موفقیت حذف شد');
          this.initialLoad()
        }).catch(err => {
        })
      },
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
          verified: this.verified,
          mobile: this.mobile,
          password: this.password,
          password_confirmation: this.password
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
            //console.log(1, _.get(error, 'response.data.error', 'no res.data'), 3, _.get(error, 'response.data.error.message', 'no data'))
            if (_.isObject(_.get(error, 'response.data.error.message', ''))) {
              _.forEach(_.get(error, 'response.data.error.message', []), (value, key) => {
                this.toast(value, "error")
              })
            } else {
              this.toast(_.get(error, 'response.data.error.message', {error}), "error")
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
    },
    components: {ImgUpload}
  }
</script>
