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
              v-validate="'required'"
              v-model="title"
              :error-messages="errors.collect('title')"
              box
              data-vv-name="title"
              label="عنوان"
            />
            <v-text-field
              v-validate="'required|numeric'"
              v-model="period"
              :error-messages="errors.collect('period')"
              box
              data-vv-name="period"
              label="دوره"
            />
            <v-text-field
              v-validate="'required|numeric'"
              v-model="price"
              :error-messages="errors.collect('price')"
              box
              data-vv-name="price"
              label="قیمت"
            />
            <v-checkbox
              v-model="special"
              box
              label="پیشنهاد سایت باشد؟"
            />
            <Crud
              :structure="dataStructure"
              v-model="data"
              label="ویژگی ها"
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
  import Editor from '~/components/elements/Editor'
  import Crud from '~/components/elements/Crud'
  import Img from '~/components/elements/FileUploader'

  const page_title = 'افزودن پلن',
    breadcrumb = 'جدید',
    indexPath = '/admin/subscriptions',
    createPath = '/admin/subscriptionPlans'

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
      dataStructure: [
        {title: 'عنوان', name: 'title', type: 'text', value: ''},
        {title: 'توضیحات', name: 'desc', type: 'text', value: ''},
      ],
      title: '',
      period: '',
      special: false,
      price: null,
      data: {},
      page_title,
      //
      categories: [{id: 1, name: 'بدون دسته بندی'}],
      categoryLoading: true,
      // validator dictionary
      submit_loader: false,
      dictionary: {
        attributes: {
          title: "عنوان ",
          period: "دوره",
          price: "قیمت",
          special: "ویژه",
          data: 'جزییات',
          // custom attributes
        },

      },

    }),
    computed:
      {
        updateMethod() {
          return `${createPath}`;
        },
        list: function () {
          return indexPath;
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
          price: this.price,
          period: this.period,
          special: this.special ? 1 : 0,
          data: this.data,
        }
        this.$axios
          .$post(this.updateMethod, data)
          .then(() => {
            // show success and redirect
            this.toast("با موفقیت ثبت شد.", "success")
            this.submit_loader = false
            this.$router.push(indexPath)
            this.submit_loader = false
          })
          .catch((error) => {
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
    },
    components: {
      Crud, Editor, Img
    }
  }
</script>
