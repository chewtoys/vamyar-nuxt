<template>

  <v-container fluid v-if="show">
    <v-subheader>
      {{ title }}
    </v-subheader>
    <v-card class="frontpage whyus pt-5 pb-5 px-2">
      <v-layout align-center justify-center row>
        <v-flex v-for="item in items" :key="item.name" xs12 sm3>
          <v-card :href="item.link" flat>
            <div class="text-xs-center">
              <v-card-media
                :src="item.image"
                class="text-xs-center circle"
                style="height:100px;width:100px;margin: 10px auto"/>
              <div class="deep-purple--text text-xs-center">
                <h3>{{ item.name }}</h3>
              </div>
              <div class="grey--text text-xs-center" v-html="nl2br(item.desc)">
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  export default {

    computed: {
      show() {
        return _.isArray(this.items) && this.items.length > 0
      },
      title: function () {
        return "ما در رسانه ها"
      },
      items: function () {
        return this.settings('frontpage.onMedia')
      }
    },
    methods: {
      settings(key, def = '') {
        return _.get(this.$store.state.settings.data, key, def)
      },
      nl2br(text) {
        return Helper.nl2br(text)
      }
    }
  }
</script>
