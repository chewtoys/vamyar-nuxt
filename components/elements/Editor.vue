<template>
  <section class="container">
    <v-card :flat="!hasBox" class="py-1">
      <label>{{getLabel}}</label>
      <br/>
      <div class="quill-editor"
           v-model="content"
           v-quill:myQuillEditor="editorOption">
      </div>
      <videoUploader/>
    </v-card>
  </section>
</template>

<script>
  import Helper from '~/assets/js/helper'
  import videoUploader from '~/components/elements/videoUploader'

  const baseUrl = "https://api.vamyar.org";

  export default {
    props: ['value', 'box', 'type', 'label', 'readOnly', 'placeholder'],
    data() {
      return {
        editorOption: {
          placeholder: this.placeholder || 'اینجا بنویسید...',
          readOnly: this.readOnly || false,
          // some quill options
          modules: {
            toolbar: [
              [{'direction': 'rtl'}],
              [{'align': []}],
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['blockquote', 'code-block'],
              [{'header': 1}, {'header': 2}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'font': []}],
              [{'color': []}, {'background': []}],
              ['clean'],
              ['link', 'image', 'video']
            ],
            imageUpload: {
              url: this.getUrl, // server url
              method: "POST", // change query method, default 'POST'
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: this.getAuthorization
              }, // add custom headers, example { token: 'your-token'}
              // personalize successful callback and call next function to insert new url to the editor
              callbackOK: (serverResponse, next) => {
                console.log(1, serverResponse)
                next(serverResponse);
              },
              // personalize failed callback
              callbackKO: (serverError) => {
                console.log(2, serverError)
                alert(serverError);
              },
              // optional
              // add callback when a image have been chosen
              checkBeforeSend: (file, next) => {
                console.log(3, file, 4, this.getUrl, 5, this.getAuthorization);
                next(file); // go back to component and send to the server
              }
            }
          }
        }
      }
    },
    computed: {
      hasBox() {
        //console.log(this.box)
        return !!_.get(this, 'box', false);
      },
      getType() {
        return _.get(this, 'type', 'admin')
      },
      getMethod() {
        return this.getType === 'user' ? "/user/images" : "/admin/images";
      },
      getAuthToken() {
        return this.getType === 'user' ? _.get(this.$store.state.user, 'auth', '') : _.get(this.$store.state.admin, 'auth', '')
      },
      getUrl() {
        return this.getType === 'user' ? `${baseUrl}/user/images` : `${baseUrl}/admin/images`
      },
      getAuthorization() {
        return `Bearer ${this.getAuthToken}`;
      },
      getLabel() {
        return _.get(this, 'label', '')
      },
      content: {
        set(val) {
          this.$emit("input", Helper.nl2br(val))
        }, get() {
          return this.value
        }
      }
    },
    components: {videoUploader}
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    padding: 10px 0;
    .quill-editor {
      min-height: 200px;
      overflow-y: visible;
    }
  }
</style>
