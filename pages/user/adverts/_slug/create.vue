<template>
  <v-container grid-list-xs fluid>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-card dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify">{{ settings('adverts.noticeBeforeCreateAdvert') }}</p>
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
            <v-text-field
              v-if="isAllowed('paybackTime')"
              v-validate="'required|numeric'"
              v-model="paybackTime"
              :error-messages="errors.collect('paybackTime')"
              box
              :label="getTitle('paybackTime')"
              data-vv-name="paybackTime"

            />
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
              v-if="isAllowed('type')"
              v-validate="'required'"
              v-model="typeName"
              :error-messages="errors.collect('type')"
              box
              :label="getTitle('type')"
              data-vv-name="type"
              :items="typeList"
              persistent-hint
            ></v-autocomplete>

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

  const list = "/user/adverts",
    //guaranteeTypeListPath = "/admin/guaranteeTypes",
    //cityPath = "/admin/cities",

    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    $_veeValidate: {
      validator: "new"
    },

    data: () => ({
      page_title: 'ثبت جدید',
      // advert
      title: null,
      cityName: null,
      allCities: false,
      text: "",
      mobile: '',
      image: null,

      // this type - loan
      guaranteeTypesName: null, // hasComputed
      loanTypeName: null,
      paybackTime: null,
      amount: null,
      payback: null,
      price: null,
      typeName: null,
      interestRate: null,
      maxAmount: null,
      job: null,
      bank: null,

      // validator dictionary
      dictionary: {
        attributes: {
          title: "عنوان آگهی",
          city: "شهر",
          bank: "بانک",
          text: "متن توضیحات آگهی",
          image: "تصویر آگهی",
          amount: "مبلغ وام",
          maxAmount: "حداکثر سرمایه ",
          price: "قیمت فروش وام",
          paybackTime: "مدت زمان بازپرداخت",
          guaranteeTypes: "نوع ضامن",
          loanType: "نوع وام",
          mobile: 'شماره تماس'
          // custom attributes
        }
      },
      // info

      submit_loader: false,
      snackbar: false,
      snack_text: null,
      snack_color: "info"
    }),
    computed: {

      list: function () {
        return `${list}/${this.slug}`;
      },
      createPath: function () {
        return `/user/${this.formType.type}`;
      },
      city: function () {
        if (this.allCities) return 3000;
        let list = _.get(this.$store.state.city, 'data', []);
        let index = _.findIndex(list, {'name': this.cityName});
        if (index > 0) {
          let item = list[index];
          return _.get(item, 'id', 0);
        }
        return 0;
      },
      loanType() {
        let list = this.$store.state.loanType.data;
        let index = _.findIndex(list, {'name': this.loanTypeName});
        let item = list[index];
        if (index > 0) {
          let item = list[index];
          return _.get(item, 'id', 0);
        }
        return 0;
      },
      type() {
        let list = this.$store.state.settings.coSigner.types;
        let index = _.findIndex(list, {'name': this.typeName});
        let item = list[index];
        if (index > 0) {
          let item = list[index];
          return _.get(item, 'id', 0);
        }
        return 0;
      },
      guaranteeTypes() {
        let items = [];
        let list = this.$store.state.guaranteeType.data;
        _.forEach(this.guaranteeTypesName, (name) => {
          let index = _.findIndex(list, {'name': name});
          let item = list[index];
          items.push(item.id)
        })
        return items || 0;
      },
    },
    async asyncData({params, store, $axios}) {
      let slug = params.slug;
      let formType = Helper.getTypeByAlias(slug);
      const breadcrumb = Helper.getBreadcrumb(formType.title),
        page_title = Helper.getPageTitle(formType.title);
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
      store.commit("navigation/setTitle", page_title);

      try {
        // city
        let cityData = await $axios.$get(cityMethod);
        store.commit('city/setAndProcessData', cityData.data || []);

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);


      } catch (error) {
        //console.log('error', error)
      }

      return {
        page_title,
        formType,
        slug,
        guaranteeTypesList: _.get(store.state, 'guaranteeType.arrayList', []),
        loanTypeList: _.get(store.state, 'loanType.arrayList', []),
        typeList: _.get(store.state, 'settings.coSigner.typeArray', []),
        cities: _.get(store.state, 'city.arrayList', [])
      }
    },
    mounted() {
      this.$validator.localize("fa", this.dictionary)
      let mobile = _.get(this.$store, 'state.user.info.mobile');
      _.set(this, 'mobile', mobile);
      // check if user has no access to create advert
      //let hasAccess = this.$store.state.accesses.loans ;
      let hasAccess = true
      if (!hasAccess) {
        this.$router.push("/user/premium")
      }
    },
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      getTitle(name, which = 'create') {
        return _.get(Helper.getFieldByType(this.formType.type, name, which), 'title', '-');
      },
      isAllowed(name, which = 'create') {
        let slug = this.slug;
        return Helper.isFieldAllowByAlias(slug, name, which);
      },
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      },
      sendForm() {
        let data = Helper.selectDataForSend(this.formType.type, this);
        this.$axios
          .$post(this.createPath, data)
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
        let data = Helper.selectDataForSend(this.formType.type, this);
        //console.log('Data', this.formType.type, data);
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
    watch: {
      allCities(val) {
        if (val) {
          let list = _.get(this.$store.state.city, 'data', []);
          let index = _.findIndex(list, {'id': 3000});
          if (index > 0) {
            let item = list[index];
            return _.set(this, 'cityName', item.name);
          }
        }
      }
    }
  }
</script>
