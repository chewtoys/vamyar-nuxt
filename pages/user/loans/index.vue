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

      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{page_title}}</v-toolbar-title>
          <v-spacer/>
          <v-btn color="cyan" outline light round class="mb-2" :to="path + '/create'">ثبت جدید</v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="items"
          no-results-text="هیچ موردی ثبت نشده است."
          :rows-per-page-items="[1,5,10,25,100]"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.description }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
            <td class="text-xs-left">{{ props.item.amount }}</td>
            <td class="text-xs-left">
              <a class="mx-1" :href="path + '/edit/' + props.item.id">
                <v-icon
                  small
                >
                  edit
                </v-icon>
              </a>
              <v-icon
                class="mx-1"
                small
                @click="delete(props.item.id)"
              >
                delete
              </v-icon>
            </td>
          </template>
          <template slot="no-data">
            <v-alert type="info">
              <p>هنوز موردی اضافه نشده است. برای افزودن از بالا بر روی جدید کلیک کنید.</p>
            </v-alert>
          </template>
        </v-data-table>
      </div>

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

  const path = "/user/loans", deletePath = "/user/loans/delete",
    page_title = 'وام های من', breadcrumb = "لیست وام های ثبت شده‌ی من";

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    meta: {
      breadcrumb,
      title: page_title
    },

    data: () => ({
        // default
        page_title, breadcrumb, path,

        // info
        info: {
          title: 'لیست وام‌های ثبت شده',
          text: "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
          heading: 'عنوان متن'
        },
        submit_loader: false,
        snackbar: false,
        snack_text: null,
        snack_color: 'info',
      }
    )
    ,
    asyncData({app, error, store}) {
      let msg;
      return app.$axios.$get(path).then(res => {
        console.log(res)
        return {data: res.data};
      }).catch(err => {
        let code = err.statusCode || 404;

        if (err.response.data.message) {
          msg = err.response.data.message;
        }
        else if (code == 404) {
          msg = 'هیچ آگهی یافت نشد.';
        } else {
          msg = 'مشکلی در گرفتن آگهی پیش آمد.' + `(${code})`
        }
        store.commit('snackbar/setSnack', msg)
        return {data: []}
      })
      //  let {date, code} = response;

      //  let msg = response.data.error.message;
      //  this.$store.commit('snackbar/setSnack', msg)


      //if (data && data.response) {
      //  let {data} = response;
//
      //} else if (error.response.data.error.message) {
      //  // 404 not found;
//
      //} else {
      //  let msg = 'هیچ آگهی پیدا نشد';
      //  this.$store.commit('snackbar/setSnack', msg)
      //}


    },
    mounted() {
      return {
        rawHeaders: [
          {
            text: 'شناسه',
            align: 'right',
            sortable: true,
            value: 'id'
          },
          {text: 'عنوان', value: 'title', align: 'right'},
          {text: 'توضیحات', value: 'description', align: 'right'},
          {text: 'قیمت', value: 'price', align: 'left'},
          {text: 'مقدار وام', value: 'amount', align: 'left'},
          {text: 'عملیات', sortable: false, align: 'left'}
        ],
        rawData: this.data || [],
      }
    }
    ,
    computed: {
      headers() {
        return this.rawHeaders;
      }
      ,
      items() {
        return this.rawData;
      }
      ,
    }
    ,
    methods: {
      getLink(id) {
        return '/user/loans/' + id;
      }
      ,
      toast(msg, color) {
        this.snackbar = true;
        this.snack_text = msg;
        this.snack_color = color;
      }
    }

  }
</script>
