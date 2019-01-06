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
              v-validate="'required'"
              v-model="slug"
              :error-messages="errors.collect('slug')"
              box
              data-vv-name="slug"
              label="مستعار"
            />
            <v-treeview label="والد"
                        selectable
                        v-model="parent"
                        transition
                        :items="categories"
                        :loading="categoryLoading"
                        item-text="name"
            />
            <br/>
            <v-label>تاریخ انتشار را مشخص کنید:</v-label>
            <no-ssr>
              <date-picker
                inputFormat="YYYY-MM-DD HH:mm"
                format="jYYYY-jMM-jDD HH:mm"
                :editable="false"
                type="datetime"
                v-model="date"></date-picker>
            </no-ssr>
            <br/>
            <Img
              v-model="image"
              label="تصویر"
            />
            <Editor
              validate="required"
              v-model="content"
              :error-messages="errors.collect('content')"
              box
              label="محتوا"
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
  import Img from '~/components/elements/FileUploader'

  const moment = require('moment-jalaali');
  const page_title = 'ویرایش مطلب ',
    breadcrumb = 'ویرایش  ',
    indexPath = '/admin/posts',
    createPath = '/admin/posts',
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
      parent: [],
      content: '',
      image: null,
      title: '',
      slug: '',
      uriSlug: null,
      page_title,
      //
      categories: [{id: 1, name: 'بدون دسته بندی'}],
      categoryLoading: true,
      // validator dictionary
      submit_loader: false,
      dictionary: {
        attributes: {
          title: "عنوان مطلب",
          slug: "مستعار",
          content: "محتوا",
          categories: 'دسته بندی ',
          parentId: "والد",
          // custom attributes
        },

      },

    }),
    computed:
      {
        updateMethod() {
          return `${indexPath}/${this.uriSlug}`;
        },
        list: function () {
          return indexPath;
        },

        expireDate: {
          get() {
            let jalali = this.date;
            let gregorian = moment(jalali, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss');
            return gregorian;
          },
          set(val) {
            if (!val) return '-';
            try {
              let m = moment(val, 'YYYY-M-D HH:mm:ss')
              this.date = (m.isValid()) ? m.format('jYYYY/jM/jD HH:mm') : val;
            } catch (err) {
              //console.log(err, val)
              this.date = val;
            }
          }
        },
        createPath: function () {
          return createPath;
        },
      }
    ,
    mounted() {
      this.$validator.localize("fa", this.dictionary)
      let getPostMethod = this.updateMethod;
      let params = {
        include: 'categories'
      }
      this.$axios.$get(categoriesMethod).then(res => {
        let fetched = _.get(res, 'data', []);
        this.categories = _.isArray(fetched) ? fetched : [];
        this.categoryLoading = false;


        this.$axios.$get(getPostMethod, {params}).then(res => {
          this.title = _.get(res, 'data.title', '');
          this.content = _.get(res, 'data.text', '');
          this.slug = _.get(res, 'data.slug', '');
          this.expireDate = _.get(res, 'data.expireDate', '');
          _.forEach(_.get(res, 'data.categories', ''), (cat) => {
            this.parent.push(cat.id);
            //console.log(cats)
          })
          this.image = _.get(res, 'data.image', '');
        }).catch(err => {
          //return this.$store.commit("snackbar/setSnack", 'در گرفتن دیتا مشکلی رخ داد');
        })

      }).catch(err => {
        console.log(err)
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
          image: this.image || null,
          text: this.content,
          categories: this.parent,
        }
        this.$axios
          .$put(this.updateMethod, data)
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
    asyncData({params}) {
      return {uriSlug: params.slug}
    },
    components: {
      Editor, Img
    }
  }
</script>
