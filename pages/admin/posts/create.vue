<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
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
              v-validate="'required'"
              v-model="slug"
              :error-messages="errors.collect('slug')"
              box
              data-vv-name="slug"
              label="مستعار"
            />

            <v-treeview label="والد"
                        selectable
                        v-model="parentId"
                        transition
                        :items="categories"
                        :loading="categoryLoading"
                        item-text="name"
            />
            <Img
              v-model="image"
              label="تصویر"
            />
            <Editor
              validate="required"
              v-model="content"
              :error-messages="errors.collect('content')"
              box
              label="متن"
              data-vv-name="content"
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
  import Editor from '~/components/elements/Editor'

  const page_title = 'ثبت مطلب جدید',
    breadcrumb = 'مطلب جدید',
    indexPath = '/user/posts',
    createPath = '/user/posts',
    categoriesMethod = '/admin/categories'

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
      parent: null,
      content: '',
      image: '',
      title: '',
      slug: '',
      page_title,
      //
      categories: [{id: 1, name: 'بدون دسته بندی'}],
      categoryLoading: true,
      // validator dictionary
      dictionary: {
        attributes: {
          title: "عنوان تیکت",
          message: "پیام",
          priority: "فوریت",
          ticketCategory: 'دسته بندی تیکت',
          parentId: "والد",
          // custom attributes
        },
        submit_loader: false,
      },

    }),
    computed:
      {
        parentId: {
          get() {
            return this.parent ? [this.parent] : []
          },
          set(val) {
            console.log(val);
            this.parent = (val)
          }
        },
        list: function () {
          return indexPath;
        }
        ,
        createPath: function () {
          return createPath;
        },

      }
    ,
    async asyncData({params, store, $axios}) {

    }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary)
      this.$axios.$get(categoriesMethod).then(res => {
        let fetched = _.get(res, 'data', []);
        this.categories = _.isArray(fetched) ? fetched : [];
        this.categoryLoading = false;
      })
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
          slug: this.slug,
          text: this.content,
          categories: this.categories,
        }
        this.$axios
          .$post(createPath, data)
          .then(() => {
            let status = true
            if (status) {
              // show success and redirect
              this.toast("با موفقیت ثبت شد.", "success")
              this.submit_loader = false
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
    },
    components: {
      Editor,
    }
  }
</script>
