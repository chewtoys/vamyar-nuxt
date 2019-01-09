<template>
  <v-card :flat="!hasBox" class="my-1">
    <v-toolbar flat color="white">
      <v-toolbar-title>{{label}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog">
        <v-btn slot="activator" color="primary" dark class="mb-2">گزینه ی جدید</v-btn>
        <v-card>
          <v-card-actions class="pt-3">
            <v-btn class="ma-1" round outline color="warning darken-1" @click="close">لغو</v-btn>
            <v-btn class="ma-1" round outline color="success darken-1" @click="save">ذخیره</v-btn>
          </v-card-actions>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 v-for="(field,i) in structure" :key="i">
                  <v-text-field
                    box
                    v-if="canBe(field,'text')"
                    :value="onStage[getProperty(field,'name')]"
                    :input="field.value"
                    @change="changeValue(field)"
                    :label="field.title || '-'"
                  ></v-text-field>
                  <ImgUploader
                    box
                    v-if="canBe(field,'image')"
                    :value="onStage[getProperty(field,'name')]"
                    :input="field.value"
                    :label="field.title || '-'"
                    @change="changeValue(field)"
                  ></ImgUploader>
                  <v-textarea
                    box
                    v-if="canBe(field,'textarea')"
                    :value="onStage[getProperty(field,'name')]"
                    :input="field.value"
                    :label="field.title || '-'"
                    @change="changeValue(field)"
                  ></v-textarea>
                  <Editor
                    box
                    v-if="canBe(field,'editor')"
                    :value="onStage[getProperty(field,'name')]"
                    :input="field.value"
                    :label="field.title || '-'"
                    @change="changeValue(field)"
                  />
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ma-1" round outline color="warning darken-1" @click="close">لغو</v-btn>
            <v-btn class="ma-1" round outline color="success darken-1" @click="save">ذخیره</v-btn>
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
  </v-card>
</template>
<script>
  import Helper from '~/assets/js/helper'
  import Editor from '~/components/elements/Editor'
  import ImgUploader from '~/components/elements/FileUploader'

  export default {
    props: ['value', 'box', 'label', 'structure', 'placeholder'],
    data() {
      return {
        content: [],
        dialog: false,
        editedIndex: -1,
        onStage: {},
      }
    }
    ,
    computed: {
      hasBox() {
        //console.log(this.box)
        return !!_.get(this, 'box', false);
      }
      ,
      headers() {
        let headers = [];
        _.forEach(this.structure, (field) => {
          headers.push({text: field.title, value: field.name, sortable: false})
        })
        headers.push({text: 'عملیات', sortable: false});
        return headers;
      }
      ,
      formTitle() {
        return this.editedIndex === -1 ? 'گزینه ی جدید' : 'ویرایش'
      }
    }
    ,
    watch: {
      onStage(val) {
        //alert('onStage')
        //console.log({val})
      },
      dialog(val) {
        //alert('dialog')
        val || this.close()
      },
      value(val) {
        //alert('new value !')
        this.initialize()
      },
      content(val) {
        //alert('content!')
        this.$emit("input", val)
      }
    },
    mounted() {
      this.initialize()
    },
    methods: {
      changeValue(field) {
        let name = field.name;
        let value = field.value;
        console.log({field, name, value})
      },
      canBe(field, type) {
        return _.get(field, 'type', '') == type
      },
      getProperty(item, path, def = '0') {
        return _.get(item, path, def) || 0
      },
      shortStr(str = '', limit = 50) {
        return Helper.limitStr(str, limit)
      }
      ,
      nl2br(text = '') {
        return Helper.nl2br(text)
      }
      ,
      initialize() {
        this.content = _.isArray(this.value) ? this.value : [];
      }
      ,
      editItem(item) {
        this.editedIndex = this.content.indexOf(item)
        this.onStage = item
        this.dialog = true
      }
      ,
      deleteItem(item) {
        let index = this.content.indexOf(item)
        if (confirm('آیا مطمن هستید؟')) this.content.splice(index, 1)
      }
      ,
      close() {
        this.onStage = {}
        this.editedIndex = -1
        this.dialog = false
      }
      ,
      save() {
        if (this.editedIndex > -1) {
          //console.log(this.content[this.editedIndex], this.onStage)
          _.set(this.content, [this.editedIndex], this.onStage);
        } else {
          //console.log(this.editedIndex, this.content, this.onStage)
          this.content.push(this.onStage)
        }
        this.close()
      }
    }
    ,
    components: {
      Editor, ImgUploader
    }
  }
</script>
