<template>
  <v-container grid-list-xs fluid>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-alert
            :value="true"
            color="info"
            icon="info"
          >{{ info.title }}
          </v-alert>
          <v-divider class="my-3"/>
          <v-card dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify">{{ info.text }}</p>
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
              <v-btn :loading="submit_loader" type="submit" outline color="accent" round @click="submit">
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
              required
              data-vv-name="title"
              label="عنوان"
            />
            <v-autocomplete
              v-if="isAllowed('city') && !allCities"
              v-validate="'required'"
              v-model="cityName"
              :error-messages="errors.collect('city')"
              box
              label="شهر"
              data-vv-name="city"
              required
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
              v-if="isAllowed('amount')"
              v-validate="'required'"
              v-model="amount"
              :error-messages="errors.collect('amount')"
              box
              label="مقدار وام"
              data-vv-name="amount"
              required
            />
            <v-text-field
              v-if="isAllowed('price')"
              v-validate="'required'"
              v-model="price"
              :error-messages="errors.collect('price')"
              box
              label="قیمت وام"
              data-vv-name="price"
              required
            />
            <v-text-field
              v-if="isAllowed('paybackTime')"
              v-validate="'required'"
              v-model="paybackTime"
              :error-messages="errors.collect('paybackTime')"
              box
              label="بازپرداخت"
              data-vv-name="paybackTime"
              required
            />
            <v-text-field
              v-if="isAllowed('mobile')"
              v-validate="'required|digits:11'"
              v-model="mobile"
              :error-messages="errors.collect('mobile')"
              box
              label="شماره موبایل برای تماس"
              data-vv-name="mobile"
              required
            />
            <v-textarea
              v-if="isAllowed('text')"
              v-validate="'text'"
              v-model="text"
              :error-messages="errors.collect('text')"
              box
              label="توضیحات اضافه"
              data-vv-name="text"
              auto-grow
            />
            <v-combobox
              v-if="isAllowed('guaranteeType')"
              v-validate="'required'"
              v-model="guaranteeTypeName"
              :items="guaranteeTypeList"
              :error-messages="errors.collect('guaranteeType')"
              box
              data-vv-name="guaranteeType"
              label="نوع ضمانت را مشخص کنید"
              required
              multiple
              chips
            />

            <v-autocomplete
              v-if="isAllowed('loanType')"
              v-validate="'required'"
              v-model="loanTypeName"
              :error-messages="errors.collect('loanType')"
              box
              label="نوع وام را مشخص کنید"
              data-vv-name="loanType"
              required
              :items="loanTypeList"
              persistent-hint
            ></v-autocomplete>
            <v-btn :loading="submit_loader" type="submit" outline color="accent" round @click="submit">
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
    path = `/user/loan/create`,
    //guaranteeTypeListPath = "/admin/guaranteeTypes",
    //cityPath = "/admin/cities",
    page_title = "ثبت وام جدید",
    breadcrumb = "فرم درخواست وام",
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {
    $_veeValidate: {
      validator: "new"
    },
    meta: {
      breadcrumb,
      title: page_title
    },

    data: () => ({

      page_title,

      // advert
      title: null,
      cityName: null,
      allCities: false,
      text: "",
      mobile: '',
      image: null,

      // this type - loan
      guaranteeTypeNmae: null, // hasComputed
      loanTypeName: null,
      paybackTime: null,
      amount: null,
      payback: null,
      price: null,

      // validator dictionary
      dictionary: {
        attributes: {
          title: "عنوان آگهی",
          city: "شهر",
          text: "متن توضیحات آگهی",
          image: "تصویر آگهی",
          amount: "مبلغ وام",
          price: "قیمت فروش وام",
          paybackTime: "مدت زمان بازپرداخت",
          guaranteeType: "نوع ضامن",
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
      city: function () {
        if (this.allCities) return 0;
        let list = this.$store.state.city.data;
        let index = _.findIndex(list, {'name': this.cityName});
        let item = list[index];
        console.log(item);
        return _.get(item, 'id', 0);
      },
      loanType() {
        let list = this.$store.state.loanType.data;
        let index = _.findIndex(list, {'name': this.loanTypeName});
        let item = list[index];
        console.log(item);
        return _.get(item, 'id', 0);
      },
      guaranteeType() {
        console.log('Name', this.guaranteeTypeName);
        let items = [];
        let list = this.$store.state.guaranteeType.data;
        _.forEach(this.guaranteeTypeName, (name) => {
          let index = _.findIndex(list, {'name': name});
          let item = list[index];
          items.push(item.id)
        })
        console.log(items);
        return items || 0;
      },
    },
    async asyncData({params, store, $axios}) {
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
        console.log('error', error)
      }

      return {
        type: Helper.getTypeByAlias(params.slug),
        slug: params.slug,
        guaranteeTypeList: _.get(store.state, 'guaranteeType.arrayList', []),
        loanTypeList: _.get(store.state, 'loanType.arrayList', []),
        cities: _.get(store.state, 'city.arrayList', [])
      }
    },
    mounted() {
      this.$validator.localize("fa", this.dictionary)
      // check if user has no access to create advert
      //let hasAccess = this.$store.state.accesses.loans ;
      let hasAccess = true
      if (!hasAccess) {
        this.$router.push("/user/premium")
      }
    },
    methods: {
      isAllowed(name, which = 'create') {
        let slug = this.slug;
        return Helper.isFiledAllowByAlias(slug, name, which);
      },
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      },
      sendForm() {

        let data = {
          title: this.title,
          city: this.city,
          text: this.text,
          price: this.price,
          amount: this.amount,
          paybackTime: this.paybackTime,
          guaranteeType: this.guaranteeType,
          image: this.image
        }
        this.$axios
          .post(path, data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              this.$router.push("../")
            } else {
              this.toast(" خطایی رخ داد.", "warning")
              this.submit_loader = false
            }
          })
          .catch(() => {
            // catch and show error
            this.toast("لطفا خطا ها را بررسی کنید.", "error")
            this.submit_loader = false
          })
      },
      async submit() {
        this.submit_loader = true
        let data = Helper.selectDataForSend(this.type.type, this);
        console.log('Data', this.type.type, data);

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
