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
              v-validate="'required'"
              v-model="title"
              :error-messages="errors.collect('title')"
              box
              required
              data-vv-name="title"
              label="عنوان"
            />
            <v-text-field v-validate="'required'"
                          v-model="city"
                          :error-messages="errors.collect('city')"
                          box
                          label="شهر"
                          data-vv-name="city"
                          required
            />
            <v-checkbox
              v-model="allcities"
              box
              label="قابل انتقال به سایر شهر ها می باشد."
            />
            <v-text-field v-validate="'required'"
                          v-model="amount"
                          :error-messages="errors.collect('city')"
                          box
                          label="مبلغ"
                          data-vv-name="city"
                          required
            />
            <v-text-field v-validate="'alpha'"
                          v-model="payBackTime"
                          :error-messages="errors.collect('payBackTime')"
                          box
                          label="بازپرداخت"
                          data-vv-name="payBackTime"
                          required
            />
            <v-textarea
              v-validate="'text'"
              v-model="text"
              :error-messages="errors.collect('text')"
              box
              label="توضیحات اضافه"
              data-vv-name="text"
              auto-grow
            />
            <v-combobox
              v-validate="'required'"
              v-model="guaranteeTypeId"
              :items="guaranteeTypeListItems"
              :error-messages="errors.collect('guaranteeTypeId')"
              box
              data-vv-name="guaranteeTypeId"
              label="نوع ضمانت را مشخص کنید"
              required
              multiple
              chips
            />
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
const list = "/user/loans",
  path = `/user/loan/create`,
  guaranteeTypeListPath = "/admin/guaranteeTypes",
  cityPath = "/admin/cities",
  page_title = "ثبت وام جدید",
  breadcrumb = "فرم درخواست وام"

export default {
  $_veeValidate: {
    validator: "new"
  },
  meta: {
    breadcrumb,
    title: page_title
  },

  data: () => ({
    list,
    page_title,

    // advert
    title: null,
    city: null,
    allcities: false,
    text: "",
    mobile: null,
    image: null,

    // this type - loan
    guaranteeTypeId: null, // hasComputed
    loanType: null,
    payBackTime: null,
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
        payBackTime: "مدت زمان بازپرداخت",
        guaranteeTypeId: "نوع ضامن",
        loanType: "نوع وام"
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
    guaranteeTypeListItems() {
      return this.guaranteeTypeList
    }
  },
  async asyncData() {
    return {
      guaranteeTypeList: ["نوع اول", "نوع دوم"], //await this.$axios.get(guaranteeTypeListPath),
      cities: ["تهران", "قم"] //await this.$axios.get(cityPath)
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
        payBackTime: this.payBackTime,
        guaranteeTypeId: this.guaranteeTypeId,
        image: this.image
      }
      this.$axios
        .post(path, data)
        .then(result => {
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
        .catch(error => {
          // catch and show error
          this.toast("لطفا خطا ها را بررسی کنید.", "error")
          this.submit_loader = false
        })
    },
    async submit() {
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
