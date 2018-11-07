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
              v-model="title"
              :error-messages="errors.collect('title')"
              box
              data-vv-name="title"
              label="عنوان"
            />
            <v-autocomplete
              v-validate="'required'"
              v-model="ticketCategoryName"
              :error-messages="errors.collect('ticketCategory')"
              box
              label="دسته بندی"
              data-vv-name="ticketCategory"
              :items="ticketCategoryList"
              persistent-hint
            ></v-autocomplete>
            <v-autocomplete
              v-validate="'required'"
              v-model="priorityName"
              :error-messages="errors.collect('priority')"
              box
              label="اهمیت"
              data-vv-name="priority"
              :items="priorityList"
              persistent-hint
            ></v-autocomplete>
            <v-textarea
              v-model="message"
              :error-messages="errors.collect('message')"
              box
              label="پیام"
              data-vv-name="message"
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

  const page_title = 'ثبت تیکت جدید',
    breadcrumb = 'تیکت جدید',
    indexPath = '/user/tickets',
    createPath = '/user/tickets',
    ticketCategoriesMethod = '/ticketCategories'

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
      // ticket
      title: null,
      message: "",
      ticketCategoryName: '',
      priorityName:0,

      // validator dictionary
      dictionary: {
        attributes: {
          title: "عنوان تیکت",
          message: "پیام",
          priority: "فوریت",
          ticketCategory: 'دسته بندی تیکت'
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
    computed:
      {
        list: function () {
          return indexPath;
        }
        ,
        createPath: function () {
          return createPath;
        },
        ticketCategory() {
          let list = this.$store.state.ticketCategory.data;
          let index = _.findIndex(list, {'name': this.ticketCategoryName});
          let item = list[index];
          return _.get(item, 'id', 0);
        },
        priority() {
          let list = this.$store.state.settings.tickets.priorities;
          let index = _.findIndex(list, {'name': this.priorityName});
          let item = list[index];
          return _.get(item, 'id', 0);
        },
        priorityList() {
          return this.$store.state.settings.tickets.prioritiesArray;
        }
        ,
      }
    ,
    async asyncData({params, store, $axios}) {
      try {
        // loan types
        let ticketCategories = await
          $axios.$get(ticketCategoriesMethod);
        store.commit('ticketCategory/setAndProcessData', ticketCategories.data || []);
      } catch (error) {
        console.log('error', error)
      }
      return {
        ticketCategoryList: _.get(store.state, 'ticketCategory.arrayList', []),
      }
    }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary)
    }
    ,
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm() {
        let data = {
          title: this.title,
          message: this.message,
          priority: this.priority,
          category: this.ticketCategory
        }
        this.$axios
          .$post(createPath, data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              //this.$router.push("../")
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
      }
      ,
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
