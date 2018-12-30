<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{label}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-dialog v-model="dialog">
        <v-btn slot="activator" color="primary" dark class="mb-2">گزینه ی جدید</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 v-for="field in structure" :key="field.name">
                  <v-text-field box v-if="field.type=='text'" v-model="editedItem[field.name]"
                                :label="field.title"></v-text-field>
                  <ImgUploader box v-if="field.type=='image'" v-model="editedItem[field.name]"
                               :label="field.title"></ImgUploader>
                  <v-textarea box v-if="field.type=='textarea'" v-model="editedItem[field.name]"
                              :label="field.title"></v-textarea>
                  <Editor box v-if="field.type=='editor'" v-model="editedItem[field.name]"
                          :label="field.title"/>

                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">لغو</v-btn>
            <v-btn color="blue darken-1" flat @click="save">ذخیره</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="content"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td v-for="field in structure">
          <p v-if="field.type=='text'" v-html="props.item[field.name]"></p>
          <p v-if="field.type=='textarea'" v-html="shortStr(nl2br(props.item[field.name]),30)"></p>
          <div v-if="field.type=='editor'" v-html="shortStr(props.item[field.name],50)"></div>
          <v-img :alt="shortStr(props.item[field.name],50)" width="100%" v-if="field.type=='image'"
                 :src="props.item[field.name]"/>
        </td>

        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import Helper from '~/assets/js/helper'
  import Editor from '~/components/elements/Editor'
  import ImgUploader from '~/components/elements/FileUploader'

  export default {
    props: ['value', 'label', 'structure', 'placeholder'],
    data: () => ({
      content: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    }),
    computed: {
      headers() {
        let headers = [];
        _.forEach(this.structure, (field) => {
          headers.push({text: field.title, value: field.name, sortable: false})
        })
        headers.push({text: 'عملیات', sortable: false});
        return headers;
      },
      formTitle() {
        return this.editedIndex === -1 ? 'گزینه ی جدید' : 'ویرایش'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      content(val) {
        this.$emit("input", val)
      }
    },
    created() {
      this.initialize()
    },
    methods: {
      shortStr(str, limit = 50) {
        return Helper.limitStr(str, limit)
      },
      nl2br(text) {
        return Helper.nl2br(text)
      },
      initialize() {
        this.content = _.isArray(this.value) ? this.value : [];
      },

      editItem(item) {
        this.editedIndex = this.content.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        let index = this.content.indexOf(item)
        if (confirm('آیا مطمن هستید؟')) this.content.splice(index, 1)
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = this.defaultItem
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.content[this.editedIndex], this.editedItem)
        } else {
          this.content.push(this.editedItem)
        }
        this.close()
      }
    },
    components: {Editor, ImgUploader}
  }
</script>
