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
              v-model="name"
              :error-messages="errors.collect('name')"
              box
              data-vv-name="name"
              label="عنوان"
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

  const page_title = 'ثبت دسته بندی جدید',
    breadcrumb = 'ایجاد دسته بندی',
    indexPath = '/admin/posts/categories',
    resourcePath = '/admin/categories'

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
      name: null,
      slug: null,

      // validator dictionary
      dictionary: {
        attributes: {
          name: "عنوان دسته بندی",
          slug: "عنوان دسته بندی",
          // custom attributes
        }
      },
      submit_loader: false
    }),
    mounted() {
      let method = this.uri;
      //console.log({method})
      this.$axios.$get(method).then(res => {
        this.data = _.get(res, 'data');
        this.name = _.get(res, 'data.name', '');
        this.slug = _.get(res, 'data.slug', '');
        this.image = _.get(res, 'data.image', '');
        this.description = _.get(res, 'data.description', '');
        this.parent = _.get(res, 'data.parent', '');
      }).catch(err => {
        //console.log(err);
      })
      this.$validator.localize("fa", this.dictionary)
    },
    computed:
      {
        uri() {
          return `${resourcePath}/${this.id}`;
        },
        list: function () {
          return indexPath;
        }
      }
    ,
    async asyncData({params}) {
      return {
        id: params.id
      }
    },
    methods: {
      toast(msg, color) {
        this.$store.commit("snackbar/setSnack", msg, color)
      }
      ,
      sendForm() {
        let data = {
          name: this.name,
          parent: this.parent,
          description: this.description,
          slug: this.slug,
          image: this.image,
        }
        this.$axios
          .$put(this.uri, data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
              this.$router.push(indexPath)
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
