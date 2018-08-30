<template>
  <div>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-alert
            :value="true"
            color="info"
            icon="info"
          >{{info.title}}
          </v-alert>
          <v-divider class="my-3"></v-divider>
          <v-card dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify">{{info.text}}</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <v-layout row>
        <v-divider class="my-3"></v-divider>
        <v-flex xs12 md12 sm12 lg12>
          <form>
            <v-text-field
              v-validate
              validate-on-blur
              required
              v-model="title"
              :error-messages="errors.collect('title')"
              label="عنوان"
              data-vv-name="عنوان"
            >
            </v-text-field>
            <v-text-field box
                          v-validate="'required'"
                          v-model="city"
                          :error-messages="errors.collect('city')"
                          label="شهر"
                          data-vv-name="شهر"
                          required
            ></v-text-field>
            <v-text-field box
                          v-validate="'required|numeric'"
                          v-model="amount"
                          :error-messages="errors.collect('amount')"
                          label="مبلغ"
                          data-vv-name="مبلغ"
                          required
            ></v-text-field>
            <v-text-field box
                          v-validate="'required'"
                          v-model="payback"
                          :error-messages="errors.collect('payback')"
                          label="بازپرداخت"
                          data-vv-name="بازپرداخت"
                          required
            ></v-text-field>
            <v-select
              box
              v-validate="'required'"
              :items="guaranteeTypeListItems"
              v-model="guaranteeTypeId"
              :error-messages="errors.collect('guaranteeTypeId')"
              label="نوع ضمانت"
              :item-value="guaranteeTypeId"
              data-vv-name="نوع ضمانت"
              required
            ></v-select>
            <v-textarea
              v-model="text"
              box
              label="توضیحات اضافه"
              auto-grow
            ></v-textarea>
            <v-combobox
              boxeds4cmk3wdc.ee
              v-model="guaranteeTypeId"
              :items="guaranteeTypeListItems"
              label="نوع ضمانت را مشخص کنید"
              data-vv-name="نوع ضمانت"
              required
              v-validate="'required'"
              multiple
              chips
            ></v-combobox>
            <v-btn @click="submit" :loading="submit_loader">ثبت و بررسی</v-btn>
          </form>
        </v-flex>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :color="snack_color"
        :multi-line="true"
        :timeout="3000"
        :vertical="true"
      >
        {{ snack_text }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          بستن
        </v-btn>
      </v-snackbar>
    </v-card>
  </div>
</template>
<script>
  const path = "/user/loan/create", guaranteeTypeListPath = "/admin/guaranteeTypes", cityPath = "/admin/cities",
    page_title = 'ثبت وام جدید', breadcrumb = "فرم درخواست وام"
  export default {
    meta: {
      breadcrumb,
      title: page_title
    },
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {

        // advert
        title: null,
        city: null,
        text: '',
        mobile: null,
        image: null,

        // this type - loan
        guaranteeTypeId: null, // hasComputed
        loanType: null,
        payBackTime: null,
        amount: null,
        payback: null,
        price: null,

        dictionary: {
          en: {
            attributes: {
              title: 'عنوان آگهی',
              city: 'شهر',
              text: 'متن توضیحات آگهی',
              image: 'تصویر آگهی',
              amount: 'مبلغ وام',
              price: 'قیمت فروش وام',
              payBackTime: 'مدت زمان بازپرداخت',
              guaranteeType: 'نوع ضامن',
              loanType: 'نوع وام',
              // custom attributes
            },
            messages: {
              required: () => 'این فیلد الزامی است'
            }
          }
        },
        // info
        info: {
          title: 'لطفا قبل از پر کردن فرم نکات زیر را مد نظر داشته باشید:',
          text: "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
          heading: 'عنوان متن'
        },
        submit_loader: false,
        snackbar: false,
        snack_text: null,
        snack_color: 'info',
      }
    }
    ,
    computed: {
      guaranteeTypeListItems() {
        return this.guaranteeTypeList;
      }
    }
    ,
    async asyncData() {
      return {
        guaranteeTypeList: ['نوع اول', 'نوع دوم'],//await this.$axios.get(guaranteeTypeListPath),
        cities: ['تهران', 'قم'] //await this.$axios.get(cityPath)
      }
    },
    mounted() {
      this.$validator.localize('en', this.dictionary)
      // check if user has no access to create advert
      //let hasAccess = this.$store.state.accesses.loans ;
      let hasAccess = true;
      if (!hasAccess) {
        this.$router.push('/user/premium');
      }
    }
    ,
    methods: {
      toast(msg, color) {
        this.snackbar = true;
        this.snack_text = msg;
        this.snack_color = color;
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
        };
        this.$axios.$post(path, data).then((result) => {
          let status = true;
          if (status) {
            // show success and redirect
            this.toast('با موفقیت ثبت شد.', 'success');
            this.$router.push('../')
            this.submit_loader = false;
          } else {
            this.toast(' خطایی رخ داد.', 'warning');
            this.submit_loader = false;
          }
        }).catch((error) => {
          // catch and show error
          this.toast("لطفا خطا ها را بررسی کنید.", 'error')
          this.toast(error, 'error')
          this.submit_loader = false;
        });
      }
      ,
      submit() {
        this.submit_loader = true;
        this.$validator.validateAll();
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.sendForm()
          } else {
            this.toast('برخی فیلد ها مشکل دارند.', 'warning');
            this.submit_loader = false;
            return null;
          }
        }).catch((err) => {
          this.toast(err, 'error')
        });
      }
    }

  }
</script>
