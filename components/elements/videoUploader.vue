<template>
  <v-container grid-list-xs>
    <v-btn class="left" v-if="!showUploader" @click="showUploader=true" color="success">آپلود ویدئو
      <v-icon class="px-1">cloud_upload</v-icon>
    </v-btn>
    <v-layout row wrap v-if="showUploader">
      <v-flex xs12 v-html="getLabel">
      </v-flex>
      <v-flex xs12>
        <v-btn :loading="fileLoading" color="info" :disabled="!hasFile"
               @click="submitFile()"><span>
     <v-icon class="px-1">cloud_upload</v-icon>
          آپلود</span>
        </v-btn>
        <input
          id="file"
          ref="file"
          type="file"
          @change="handleFileUpload()"/>
      </v-flex>
      <v-flex xs12 v-if="url">
        <v-text-field v-model="url" readonly/>
        <v-btn
          v-clipboard:copy="url" v-clipboard:success="handleCopyStatus(true)"
          v-clipboard:error="handleCopyStatus(false)" :loading="loading" ripple
          class="elevation-2"
          color="success"
          @click="copy"
          round
        >
          <v-icon>file_copy</v-icon>
          <span class="px-1">کپی کردن آدرس</span>
        </v-btn>
      </v-flex>
      <v-flex v-if="uploadPercentage < 100 && uploadPercentage > 0 " xs12>
        <v-progress-linear v-model="uploadPercentage" color="success"/>
      </v-flex>
      <v-divider color="black"/>
    </v-layout>
    <br/>
  </v-container>
</template>
<script>

  const root = 'https://api.vamyar.org'
  export default {
    props: ["value", 'label', 'type'],
    /*
           Defines the data used by the component
           */
    data() {
      return {
        loading: false,
        showUploader: false,
        root,
        file: "",
        copySucceeded: false,
        hasFile: false,
        url: this.value,
        fileLoading: false,
        uploadPercentage: 0
      }
    },
    computed: {
      getLabel() {
        return this.label || '<label>فایل را انتخاب کنید و پس از آپلود آدرس را کپی کنید و در ادیتور قسمت ویدئو قرار دهید.</label>'
      },
      getType() {
        return 'admin'
      },
      getMethod() {
        return "/admin/videos";
      },
      getAuthorization() {
        return _.get(this.$store.state.admin, 'auth', '')
      },
    },
    watch: {
      url(val) {
        this.$emit("input", val)
      }
    },
    methods: {
      copy() {
        this.loading = true
        // send to API
        setTimeout(() => {
          this.loading = false
        }, 1000)
      },
      handleCopyStatus(status) {
        this.copySucceeded = status
      },
      remove() {
        this.file = null
        this.url = null
      },
      handleFileUpload() {
        this.hasFile = true
        this.file = this.$refs.file.files[0]
      },
      /*
               Submits the file to the server
               */
      submitFile: function () {
        this.fileLoading = true
        /*
                   Initialize the form data
                   */
        let formData = new FormData()

        /*
                   Add the form data we need to submit
                   */
        formData.append("video", this.file)

        /*
                   Make the request to the POST /single-file URL
                   */
        let Authorization = `Bearer ${this.getAuthorization}`;
        let method = this.getMethod;
        this.$axios
          .$post(method, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            }.bind(this)
          })
          .then((res) => {
            console.log(res, res.data.url)
            this.url = _.replace(`${root}/${_.get(res, 'data.url', '-')}`, '//', '/')
            this.hasFile = false
            this.file = null
            this.fileLoading = false
          })
          .catch(() => {
            this.hasFile = false
            this.file = null
            this.fileLoading = false
          })
      }
    }
  }
</script>
