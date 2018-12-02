<template>
  <section class="container">
    <label>{{getLabel}}</label>
    <br/>
    <div class="quill-editor"
         v-model="content"
         v-quill:myQuillEditor="editorOption">
    </div>
  </section>
</template>

<script>
  import Helper from '~/assets/js/helper'

  export default {
    props: ['value', 'label', 'readOnly', 'placeholder'],
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
              //url: "", // server url
              //method: "POST", // change query method, default 'POST'
              //headers: {}, // add custom headers, example { token: 'your-token'}
              //// personalize successful callback and call next function to insert new url to the editor
              //callbackOK: (serverResponse, next) => {
              //  next(serverResponse);
              //},
              //// personalize failed callback
              //callbackKO: (serverError) => {
              //  alert(serverError);
              //},
              //// optional
              //// add callback when a image have been chosen
              //checkBeforeSend: (file, next) => {
              //  console.log(file);
              //  next(file); // go back to component and send to the server
              ////}
            }
          }
        }
      }
    },
    computed: {
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
    }
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
