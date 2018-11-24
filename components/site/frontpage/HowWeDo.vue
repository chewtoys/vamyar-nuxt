<template>
  <v-container v-if="show" fluid>
    <v-subheader>
      {{ title }}
    </v-subheader>
    <div style="background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);">
      <v-card class="transparent frontpage howwedo pt-2 pb-5 px-5">
        <v-layout align-center justify-center class="my-4" row>
          <v-flex xs12 :sm12="settings('frontpage.whatWeDoClip')===''" :sm6="settings('frontpage.whatWeDoClip')!==''"
                  offset-sm1>
            <div v-for="item in items" :key="item.title" class="mt-2 mb-2 text-xs-right">
              <div class="white--text text-xs-right">
                <h3 class="font-17">
                  <v-icon class="pb-1">fiber_manual_record</v-icon>
                  {{ item.title }}
                </h3>
              </div>
              <div>
                <p class="px-4 pt-1 pb-2 font-14 white--text text-xs-right" v-html="nl2br(item.desc)"></p>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 :sm6="settings('frontpage.whatWeDoClip')!==''">
            <v-card v-if="settings('frontpage.whatWeDoClip')!==''" flat color="transparent">
              <video :src="settings('frontpage.whatWeDoClip')" width="100%" controls>
                مرورگر شما قابلیت پخش این ویدئو را ندارد.
              </video>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
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
        return "چه کارهایی در وامیار انجام می شود؟"
      },
      items: function () {
        return this.settings('frontpage.whatWeDo')
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
