<template>
  <v-container fluid grid-list-xs>
    <v-card color="white" raised light class="py-5 px-4">
      <v-layout row wrap>
        <v-flex xs12 md12 sm12 lg12>
          <h1
            v-if="info.title"
            class="font-14"
          >
            <v-icon class="px-1 grey-text pb-1 font-19">arrow_left</v-icon>
            {{ info.title }}
          </h1>
          <v-divider
            v-if="info.title"
            class="my-3"/>
          <v-card
            v-if="info.text"
            dark color="green darken-1" class="pa-3 font-12">
            <p class="font-14 text-justify">{{ info.text }}</p>
          </v-card>
          <v-divider
            v-if="info.text"
            class="my-3"/>
        </v-flex>

        <v-flex xs12 md12 sm12 lg12>
          <form>
            <v-text-field
              v-validate="'min:6'"
              v-model="password"
              :error-messages="errors.collect('password')"
              box

              data-vv-name="password"
              type="password"
              label="رمز عبور"
            />
            <v-text-field
              v-validate="'required'"
              v-model="email"
              :error-messages="errors.collect('email')"
              box
              required
              email
              data-vv-name="email"
              label="ایمیل"
            />
            <v-text-field
              v-validate="'required'"
              v-model="firstName"
              :error-messages="errors.collect('firstName')"
              box
              required
              data-vv-name="firstName"
              label="نام"
            />
            <v-text-field
              v-validate="'required'"
              v-model="lastName"
              :error-messages="errors.collect('lastName')"
              box
              required
              data-vv-name="lastName"
              label="نام خانوداگی"
            />
            <v-textarea
              v-model="address"
              :error-messages="errors.collect('address')"
              box
              label="آدرس"
              data-vv-name="address"
              auto-grow
            />

            <v-btn :loading="submit_loader" class="green" dark @click="submit">بروزرسانی
              <v-icon class="px-1">save</v-icon>
            </v-btn>
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
  </v-container>
</template>
<script>
  // for change
  import _ from 'lodash';

  const path = "/user/details",
    page_title = "ویرایش پروفایل",
    breadcrumb = "ویرایش مشخصات حساب کاربری";
  const info = {
    title: "ویرایش پروفایل"
    //text: "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
    // heading: 'عنوان متن'
  };

  export default {
    $_veeValidate: {
      validator: "new"
    },
    meta: {
      breadcrumb,
      title: page_title
    },

    data: () => ({
      // fields
      password: null,
      firstName: null,
      lastName: null,
      address: null,
      email: null,
      // validation
      dictionary: {
        attributes: {
          firstName: "نام",
          lastName: "نام خانوادگی",
          address: "آدرس",
          email: "ایمیل",
          password: "رمز عبور"
        }
      },
      // info
      info,
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
    mounted() {
      this.$validator.localize("fa", this.dictionary);
      // check if user has no access to create advert
      //let hasAccess = this.$store.state.accesses.loans ;


      this.firstName = _.get(this.$store.state.user, 'info.details.firstName', null);
      this.lastName = _.get(this.$store.state.user, 'info.details.lastName', null);
      this.email = _.get(this.$store.state.user, 'info.email', null);
      this.address = _.get(this.$store.state.user, 'info.details.address', "");
      this.password = null
    },
    methods: {
      toast(msg, color) {
        this.snackbar = true;
        this.snack_text = msg;
        this.snack_color = color
      },
      sendForm() {
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          password_confirmation: this.password,
          address: this.address
        };

        this.$axios.$put(path, data).then(res => {
          //this.$store.commit("snackbar/setSnack", _.get(res, 'response.data.error.message', "با موفقیت بروز شد."));
          this.updateUser();
        }).catch(err => {
          //this.$store.commit("snackbar/setSnack", _.get(err, 'response.data.error.message', "مشکلی در ارسال اطلاعات پیش آمد"));
        })

        this.submit_loader = false;
      },
      updateUser() {
        this.$axios.$get("/user/details").then(res => {
          let data = _.get(res, 'data', [])
          if (_.has(data, 'details')) {
            this.$store.commit("user/updateUserInfo", data)
            this.$router.push('/user')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      submit() {
        this.submit_loader = true;
        //let validation = await this.$validator.validateAll();
        //this.submit_loader = false;
        this.$validator
          .validateAll()
          .then(result => {
            if (result) {
              return this.sendForm()
            } else {
              this.toast("برخی فیلد ها مشکل دارند.", "warning");
              this.submit_loader = false;
              return null
            }
          })
          .catch(err => {
            this.toast("خطایی رخ داد: " + err, "error")
          });
        return false
      }
    }
  }
</script>
