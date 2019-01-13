<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h3>لیست انواع ضمانت ها</h3>
        <v-spacer/>
        <v-btn outline color="green" round @click="save" :loading="saveLoading" :pending="savePending">
          ذخیره سازی
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          validate="required"
          v-model="siteTitle"
          :error-messages="errors.collect('siteTitle')"
          box
          label="عنوان سایت"
          data-vv-name="siteTitle"
          required
        />
        <v-textarea
          validate="required"
          v-model="siteDescription"
          :error-messages="errors.collect('siteDescription')"
          box
          label="توضیحات متا"
          data-vv-name="siteDescription"
          auto-grow
        />
      </v-card-text>
      <v-card-actions>

      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const SAVE_PATH = '/provinces'
  export default {
    meta: {
      breadcrumb: 'تنظیمات عمومی',
      title: 'تنظیمات عمومی سایت'
    },
    data() {
      return {
        savePending: false,
        saveLoading: false,

        // settings
        siteTitle: 'سایت وامیار',
        siteDescription: 'توضیحات',
        siteLogo: 'https://place-hold.it/40',
        siteFavIcon: 'https://place-hold.it/90',

        // adverts

        //

        // validator dictionary
        dictionary: {
          attributes: {
            siteTitle: "عنوان سایت",
            siteDescription: "توضیحات متا",
          }
        }
      }
    },
    methods: {
      save: function () {
        this.saveLoading = true
        this.$validator
          .validateAll()
          .then(result => {
            if (result) {
              this.sendForm()
            } else {
              this.$store.commit('snackbar/setSnack', "برخی فیلد ها مشکل دارند.", "warning")
              this.saveLoading = false
              return null
            }
          })
      },
      sendForm: function () {
        let groups = Helper.getGeneralSettingsGroup();
        _.forEach(groups, (Keys, groupKey) => {
          let data = {};
          _.forEach(Keys, (name) => {
            data[name] = _.get(this, name, null);
          })
          console.log(groupKey, data)
          this.$axios
            .post(SAVE_PATH,
              {key: groupKey, value: JSON.stringify(data)}
            )
            .then((response) => {
              let status = true
              if (status) {
                // show success and redirect
                this.$store.commit('snackbar/setSnack', "با موفقیت ثبت شد.", "success")
              } else {
                this.$store.commit('snackbar/setSnack', " خطایی رخ داد.", "warning")
              }
              this.saveLoading = false
            }).catch((error) => {
            console.log(error, error.response)
            this.saveLoading = false
          })
        })
      }
    }

  }
</script>
