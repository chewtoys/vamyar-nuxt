<template>
  <v-container grid-list-xs fluid>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-card dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify">
              {{settings('adverts.noticeBeforeCreateAdvert')}}
            </p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <v-layout row wrap>
        <v-flex xs12>
          <div>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-icon class="pb-1 ml-1">create</v-icon>
                {{ pageTitle }}
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
              v-if="isAllowed('title')"
              v-validate="'required'"
              v-model="title"
              :error-messages="errors.collect('title')"
              box
              data-vv-name="title"
              :label="getTitle('title')"
            />
            <v-autocomplete
              v-if="isAllowed('city') "
              v-validate="'required'"
              v-model="cityName"
              :error-messages="errors.collect('city')"
              box
              :label="getTitle('city')"
              data-vv-name="city"
              :items="cities"
              persistent-hint
            >
            </v-autocomplete>
            <v-checkbox
              v-if="isAllowed('city')"
              v-model="allCities"
              box
              label="قابل انتقال به سایر شهر ها می باشد."
            />
            <v-text-field
              v-if="isAllowed('mobile')"
              v-validate="'numeric'"
              v-model="mobile"
              :error-messages="errors.collect('mobile')"
              box
              :label="getTitle('mobile')"
              data-vv-name="mobile"

            />
            <v-text-field
              v-if="isAllowed('amount')"
              v-validate="'required|numeric'"
              v-model="amount"
              :error-messages="errors.collect('amount')"
              :placeholder="getPlaceholder('amount')"
              box
              :label="getTitle('amount')"
              data-vv-name="amount"
            />
            <v-text-field
              v-if="isAllowed('price')"
              v-validate="'required|numeric'"
              v-model="price"
              :error-messages="errors.collect('price')"
              box
              :label="getTitle('price')"
              data-vv-name="price"

            />
            <template v-if="isAllowed('paybackTime')">
              <v-text-field
                v-validate="'required|numeric'"
                :placeholder="getPlaceholder('paybackTime')"
                v-model="paybackTime"
                :error-messages="errors.collect('paybackTime')"
                box
                :label="getTitle('paybackTime')"
                data-vv-name="paybackTime"
              />
              <v-input
                :messages="getHelp('paybackTime')"
                prepend-icon="help"
              >
              </v-input>
              <br/>
            </template>
            <v-combobox
              v-if="isAllowed('guaranteeTypes')"
              v-validate="'required'"
              v-model="guaranteeTypesName"
              :items="guaranteeTypesList"
              :error-messages="errors.collect('guaranteeTypes')"
              box
              data-vv-name="guaranteeTypes"
              :label="getTitle('guaranteeTypes')"
              multiple
              chips
            />
            <v-text-field
              v-if="isAllowed('interestRate')"
              v-validate="'required|numeric'"
              v-model="interestRate"
              :error-messages="errors.collect('interestRate')"
              box
              :label="getTitle('interestRate')"
              data-vv-name="interestRate"
            />
            <v-text-field
              v-if="isAllowed('maxAmount')"
              v-validate="'required|numeric'"
              v-model="maxAmount"
              :error-messages="errors.collect('maxAmount')"
              :placeholder="getPlaceholder('maxAmount')"
              box
              :label="getTitle('maxAmount')"
              data-vv-name="maxAmount"
            />
            <v-text-field
              v-if="isAllowed('job')"
              v-validate="'required'"
              v-model="job"
              :error-messages="errors.collect('job')"
              box
              :label="getTitle('job')"
              data-vv-name="job"
            />
            <v-text-field
              v-if="isAllowed('bank')"
              v-validate="'required'"
              v-model="bank"
              :error-messages="errors.collect('job')"
              box
              :label="getTitle('bank')"
              data-vv-name="bank"
            />
            <v-autocomplete
              v-if="isAllowed('loanType')"
              v-validate="'required'"
              v-model="loanTypeName"
              :error-messages="errors.collect('loanType')"
              box
              :label="getTitle('loanType')"
              data-vv-name="loanType"
              :items="loanTypeList"
              persistent-hint
            ></v-autocomplete>
            <v-autocomplete
              autofocus
              multiple
              v-if="isAllowed('type')"
              v-validate="'required'"
              v-model="type"
              :error-messages="errors.collect('type')"
              box
              :label="getTitle('type')"
              data-vv-name="type"
              :items="['بانک','دادگاه']"
              persistent-hint
            ></v-autocomplete>

            <v-checkbox
              persistent-hint
              v-if="isAllowed('forBank')"
              v-model="forBank"
              box
              :label="getTitle('forBank')"
            />
            <v-checkbox
              persistent-hint
              v-if="isAllowed('forCourt')"
              v-model="forCourt"
              box
              :label="getTitle('forCourt')"
            />

            <v-textarea
              v-if="isAllowed('text')"
              v-model="text"
              :error-messages="errors.collect('text')"
              box
              :label="getTitle('text')"
              data-vv-name="text"
              auto-grow
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


  export default {
    props: ['formType', 'id', 'panel', 'action', 'data'],
    data: () => ({
      slug: '',
      // advert
      title: null,
      cityName: null,
      allCities: false,
      text: "",
      mobile: '',
      image: null,
      forBank: false,
      forCourt: false,
      guaranteeTypesName: null, // Computed
      loanTypeName: null,
      paybackTime: null,
      amount: null,
      payback: null,
      price: null,
      type: null,
      interestRate: null,
      maxAmount: null,
      job: null,
      bank: null,

      // validator dictionary
      dictionary: {
        attributes: {
          title: "عنوان آگهی",
          city: "شهر",
          job: "شغل",
          bank: "بانک",
          text: "متن توضیحات آگهی",
          image: "تصویر آگهی",
          amount: "مبلغ وام",
          maxAmount: "حداکثر ",
          price: "قیمت فروش وام",
          paybackTime: "مدت زمان بازپرداخت",
          guaranteeTypes: "نوع ضامن",
          loanType: "نوع وام",
          mobile: 'شماره تماس'
          // custom attributes
        }
      },
      submit_loader: false,
    }),
    computed: {
      isAdmin() {
        return this.panel === 'admin'
      },
      isEdit() {
        return this.action === 'edit'
      },
      getPanel() {
        return this.isAdmin ? 'admin' : 'user';
      },
      getId() {
        return this.id;
      },
      pageTitle() {
        return this.isEdit ? 'ویرایش آگهی' : 'ثبت آگهی جدید'
      },
      list: function () {
        return `/${this.getPanel}/${this.slug}`;
      },
      editPath: function () {
        return `/${this.getPanel}/${this.formType.type}/${this.id}`;
      },
      createPath: function () {
        return `/${this.getPanel}/${this.formType.type}`;
      },
      sendPath: function () {
        return this.isEdit ? this.editPath : this.createPath;
      },
      city: {
        get: function () {
          if (this.allCities) return 3000;
          let list = this.$store.state.city.data;
          let index = _.findIndex(list, {'name': this.cityName});
          let item = list[index];
          return _.get(item, 'id', 0);
        },
        set: function (val) {
          let list = this.$store.state.city.data;
          let index = _.findIndex(list, {'id': val});
          let item = list[index];
          this.cityName = item.name;
        }
      },
      loanType: {
        get: function () {
          let list = this.$store.state.loanType.data;
          let index = _.findIndex(list, {'name': this.loanTypeName});
          let item = list[index];
          return _.get(item, 'id', 0);
        },
        set: function (val) {
          let list = this.$store.state.loanType.data;
          let index = _.findIndex(list, {'id': val});
          let item = list[index];
          this.loanTypeName = item.name;
        }
      },
      guaranteeTypes: {
        get: function () {
          let items = [];
          let list = this.$store.state.guaranteeType.data;
          _.forEach(this.guaranteeTypesName, (name) => {
            let index = _.findIndex(list, {'name': name});
            let item = list[index];
            items.push(item.id)
          })
          return items || 0;
        },
        set: function (objectArrayList) {
          let list = this.$store.state.guaranteeType.data;
          let items = [];
          _.forEach(objectArrayList, (obj) => {
            items.push(obj.name)
          })
          this.guaranteeTypesName = items || [];
        }
      },
      link() {
        if (this.isEdit) return `/${this.panel}/${this.slug}/${this.action}/${this.id}`
        return `/${this.panel}/${this.slug}/${this.action}`
      }
    },

    mounted() {
      this.slug = this.formType.alias;
      this.$validator.localize("fa", this.dictionary)
      let mobile = _.get(this.$store, 'state.user.info.mobile');

      // set user mobile by default
      if (!this.isEdit) _.set(this, 'mobile', mobile);

      // check if user has no access to create advert
      //let hasAccess = this.$store.state.accesses.loans ;
      let isPremium = Helper.isPremiumType(this.formType.type);
      if (!this.isAdmin && !this.isEdit) {
        let hasAccess = _.get(this.$store.state, 'user.hasSubscription', false);
        if (isPremium && !hasAccess) {
          this.$store.commit('snackbar/setSnack', 'متاسفانه شما دسترسی لازم برای ثبت این آگهی را ندارید.', 'warning');
          this.$router.push(`/user/premium?redirect=${this.link}`);
        }
      }

      // set values in default
      if (this.isEdit) {
        let editableFields = Helper.getTypeFields(this.formType.type, 'edit');
        _.forEach(editableFields, (value) => {
          //console.log({value}, value.name, value.path)
          _.set(this, [value.name], _.get(this.data, `${value.path}`, ''));
        })
      }
    },
    methods: {
      getTitle(name) {
        let which = this.action;
        return _.get(Helper.getFieldByType(this.formType.type, name, which), 'title', '-');
      },
      getPlaceholder(name) {
        let which = this.action;
        return _.get(Helper.getFieldByType(this.formType.type, name, which), 'placeholder', '');
      },
      getHelp(name) {
        let which = this.action;
        return _.get(Helper.getFieldByType(this.formType.type, name, which), 'help', '');
      },
      isAllowed(name) {
        let which = this.action;
        let slug = this.slug;
        return Helper.isFieldAllowByAlias(slug, name, which);
      },
      toast(msg, color = 'info') {
        this.$store.commit("snackbar/setSnack", msg, color)
      },
      sendForm() {
        let data = Helper.selectDataForSend(this.formType.type, this, this.action);
        this.$axios
          .$put(this.sendPath, data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              this.$router.push(this.list)
            } else {
              this.toast(" خطایی رخ داد.", "warning")
              this.submit_loader = false
            }
          })
          .catch((error) => {
            // catch and show error

            //console.log(1, _.get(error, 'response.data.error', 'no res.data'), 3, _.get(error, 'response.data.error.message', 'no data'))
            if (_.isArray(_.get(error, 'response.data.error.message', ''))) {
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
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
    },
    watch: {
      allCities(val) {
        if (val) {
          return _.set(this, 'city', 3000);
        }
      }
    },
    $_veeValidate: {
      validator: "new"
    }
  }
</script>
