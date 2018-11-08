<template>
  <v-container grid-list-xs fluid>
    <v-card color="white" raised light class="py-5 px-4">
      <v-card-title>

        <h4>
          <v-icon small class="pb-1 px-1">reply</v-icon>
          مشاهده و پاسخ به تیکت
        </h4>
        <v-spacer></v-spacer>
        <v-btn :to="indexPath" outline color="primary" round>
          <v-icon class="px-1">arrow_right</v-icon>
          بازگشت
        </v-btn>
      </v-card-title>
      <v-divider class="my-3"/>
      <v-card-text>
        <v-toolbar flat>
          <h3>
            <v-icon small class="mx-1 pb-2 px-1">help</v-icon>
            {{list.title || 'بدون عنوان' }}
          </h3>
          <v-spacer></v-spacer>
          <small>
            <v-icon small>
              arrow_left
            </v-icon>
            {{list.jCreatedAt }}
            <br/>
            <v-icon small>
              arrow_left
            </v-icon>
            درجه اهمیت: {{priority}}
            <br/>
            <v-icon small>
              arrow_left
            </v-icon>
            دسته بندی: {{category}}
          </small>
        </v-toolbar>
        <div class="py-4 px-3 font-14 text-justify">{{ list.message }}</div>

      </v-card-text>
    </v-card>

    <v-card color="white" v-for="item in list.comments" :key="item.id" raised light class="my-3 py-5 px-4">
      <v-layout row>
        <v-flex xs12 md12 sm12 lg12>
          <v-toolbar flat :color="!!item.adminId ? 'success lighten-4' : 'info lighten-2'">
            <h5>
              <v-icon small class=" pb-1  px-1">{{!!item.adminId ? 'star' : 'account_circle'}}</v-icon>
              {{!item.adminId ? 'پاسخ کاربر' : 'پاسخ شما'}}
            </h5>
            <v-spacer></v-spacer>
            <small>
              <v-icon class="pb-1" small>
                date_range
              </v-icon>
              {{item.jCreatedAt }}
            </small>
          </v-toolbar>
          <v-divider class="my-3"/>
          <div class="font-14 text-justify">{{ item.text }}</div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card color="white" raised light class="my-5 py-5 px-4">
      <v-layout row wrap>
        <v-flex xs12>
          <div>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-icon class="pb-1 ml-1">create</v-icon>
                {{ page_title }}
              </v-toolbar-title>
              <v-spacer/>

              <v-btn :loading="submit_loader" outline color="accent" round @click="processSubmit(false)">
                <v-icon class="px-1">save</v-icon>
                ارسال پاسخ
              </v-btn>
            </v-toolbar>
          </div>
          <v-divider class="mb-5 mt-1"/>

        </v-flex>
        <v-divider class="my-3"/>
        <v-flex xs12 md12 sm12 lg12>
          <form>
            <v-textarea
              v-model="text"
              :error-messages="errors.collect('text')"
              box
              label="پیام"
              data-vv-name="text"
              auto-grow
            />
            <v-btn :loading="submit_loader" outline color="accent" round @click="processSubmit(false)">
              <v-icon class="px-1">save</v-icon>
              ارسال پاسخ
            </v-btn>
            <v-btn :loading="submit_loader" outline color="danger" round @click="processSubmit(true)">
              <v-icon class="px-1">lock</v-icon>
              بستن
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-card>

  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const page_title = 'مشاهده و پاسخ به تیکت',
    breadcrumb = 'مشاهده',
    indexPath = '/admin/tickets',
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
      indexPath,
      page_title,
      // ticket
      text: "",

      // validator dictionary
      dictionary: {
        attributes: {
          text: "پیام",
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
    }),
    computed:
      {
        answerPath() {
          return `/admin/tickets/${this.id}/answer`;
        },
        closePath() {
          return `/admin/tickets/${this.id}/close`;
        },
        priority() {
          return _.get(this.$store.state.settings.tickets.prioritiesArray, this.list.priority, '')
        },
        category() {
          let list = this.$store.state.ticketCategory.data;
          let index = _.findIndex(list, {'id': this.list.categoryId});
          let item = list[index];
          return _.get(item, 'name', '');
        }
      }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary)
      let method = `/admin/tickets/${this.id}`
      this.$axios.$get(method).then(resp => {
        this.list = _.get(resp, 'data', []);
      });
    },
    async asyncData({params, store, $axios}) {
      let id = params.id;
      let query = {
        include: 'user.detail,admin'
      }
      try {
        let ticketCategories = await $axios.$get(ticketCategoriesMethod);
        store.commit('ticketCategory/setAndProcessData', ticketCategories.data || []);
      } catch (error) {
        console.log('error', error)

      }
      return {
        id,
        list: []
      }
    }
    ,
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm(close = false) {
        let data = {
          text: this.text,
        }
        let method = close ? this.closePath : this.answerPath;
        this.$axios
          .$put(method, close ? {} : data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              if (!close) this.toast("با موفقیت ثبت شد.", "success")
              if (close) this.toast("با موفقیت انجام شد.", "success")
              this.submit_loader = false
              if (close) this.$router.push(indexPath)
            } else {
              this.toast(" خطایی رخ داد.", "warning")
              this.submit_loader = false
            }
            let method = `/admin/tickets/${this.id}`
            this.$axios.$get(method).then((response) => {
              this.list = response.data;
              this.text = '';
            })
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
      processSubmit(close = false) {
        this.submit_loader = true

        this.$validator
          .validateAll()
          .then(result => {

            if (result) {
              this.sendForm(close)
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
