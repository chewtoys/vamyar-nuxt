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
              v-if="isAllowed('title')"
              v-validate="'required'"
              v-model="title"
              :error-messages="errors.collect('title')"
              box
              data-vv-name="title"
              :label="getTitle('title')"
            />
            <v-autocomplete
              v-if="isAllowed('city') && !allCities"
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
            <v-textarea
              v-model="description"
              :error-messages="errors.collect('description')"
              box
              label="یادداشت آگهی"
              data-vv-name="description"
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

  const list = "/admin/adverts",
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
      description: '',
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

      // validator dictionary
      dictionary: {
        attributes: {
          description: 'یادداشت آگهی',
          title: "عنوان آگهی",
          city: "شهر",
          text: "متن توضیحات آگهی",
          image: "تصویر آگهی",
          amount: "مبلغ وام",
          price: "قیمت فروش وام",
          paybackTime: "مدت زمان بازپرداخت",
          guaranteeTypes: "نوع ضامن",
          loanType: "نوع وام",
          mobile: 'شماره تماس'
          // custom attributes
        }
      },
      // info
      info: {
        title: "لطفا قبل از پر کردن فرم نکات زیر را مد نظر داشته باشید:",
        text:
          "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
        heading: "عنوان متن"
      },
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
        return `/admin/${this.formType.type}`;
      },
      city: function () {
        if (this.allCities) return 0;
        let list = this.$store.state.city.data;
        let index = _.findIndex(list, {'name': this.cityName});
        let item = list[index];
        return _.get(item, 'id', 0);
      },
      loanType() {
        let list = this.$store.state.loanType.data;
        let index = _.findIndex(list, {'name': this.loanTypeName});
        let item = list[index];
        return _.get(item, 'id', 0);
      },
      type() {
        let list = this.$store.state.settings.coSigner.types;
        let index = _.findIndex(list, {'name': this.typeName});
        let item = list[index];
        return _.get(item, 'id', 0);
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
    },
    methods: {
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
        _.set(data, 'description', this.description || '');
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
    }
  }
</script>
