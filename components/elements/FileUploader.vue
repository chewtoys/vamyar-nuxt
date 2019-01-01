<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        {{label}}
      </v-flex>
      <v-flex xs12 v-if="!url">
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
        <div>
          <v-btn fab outline small color="warning" @click="remove">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-img :src="`${url}`" :alt="url" class="full" contain max-height="200px"/>
          <input v-model="url" type="hidden" name="url">
        </div>
      </v-flex>
      <v-flex v-if="uploadPercentage < 100 && uploadPercentage > 0 " xs12>
        <v-progress-linear v-model="uploadPercentage" color="success"/>
      </v-flex>
    </v-layout>
    <v-divider color="black"/>
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
        root,
        file: "",
        hasFile: false,
        url: '',
        fileLoading: false,
        uploadPercentage: 0
      }
    },
    computed: {
      getType() {
        return this.type || 'admin'
      },
      getMethod() {
        return this.getType === 'user' ? "/user/images" : "/admin/images";
      },
      getAuthorization() {
        return this.getType === 'user' ? _.get(this.$store.state.user, 'auth', '') : _.get(this.$store.state.admin, 'auth', '')
      },
    },
    mounted() {
      this.url = _.get(this, 'value', null);
    },
    watch: {
      url(val) {
        this.$emit("input", val)
      }
    },
    methods: {
      /*
               Handles a change on the file upload
               */
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
        formData.append("image", this.file)

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
            this.url = `${root}${_.get(res, 'data.url', '-')}`
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
