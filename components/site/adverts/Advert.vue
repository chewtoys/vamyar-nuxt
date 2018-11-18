<template>
  <v-card :to="getLink(item)" height="100%" hover raised ripple>
    <v-card-text>
      <v-layout row wrap>
        <v-flex v-if="!!settings('adverts.isImageAllowed') && !!item.image" xs12 md3>
          <v-img
            :src="item.image"
            :lazy-src="`https://placehold.it/100`"
            class="grey lighten-2"
            width="100%"
            position="right right"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate color="grey lighten-5"/>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex :md9="!!settings('adverts.isImageAllowed') && !!item.image"
                :md12="!settings('adverts.isImageAllowed') || !item.image" xs12>
          <table class=" text-right full">
            <tbody>

            <tr class="trrow">
              <td width="30%">
                <small>عنوان</small>
              </td>
              <td><b>{{ item.title }}</b></td>
            </tr>
            <tr class="trrow">
              <td width="30%">
                <small>نوع آگهی</small>
              </td>
              <td><b>{{ itemType(item) }}</b></td>
            </tr>
            <tr v-if="item.advertable && item.advertable.amount" class="trrow">
              <td width="30%">
                <small>مبلغ</small>
              </td>
              <td><b>{{ price(item.advertable.amount) }}</b></td>
            </tr>
            <tr v-if="false && item.advertable && item.advertable.price" class="trrow">
              <td width="30%">
                <small>قیمت</small>
              </td>
              <td><b class="red--text">{{ price(item.advertable.price) }}</b></td>
            </tr>
            <tr class="hidden trrow">
              <td>
                <small>توضیحات</small>
              </td>
              <td>
                <b>{{ limitStr(item.text, 250, ' ...') }}</b>
              </td>
            </tr>
            <tr v-if="item.city" class="trrow">
              <td>
                <small>شهر</small>
              </td>
              <td>
                <b>{{ item.city.name }}</b>
              </td>
            </tr>
            <tr class="hidden trrow">
              <td>
                <small>ثبت شده توسط</small>
              </td>
              <td>
                <b>{{ item.userId }}</b>
              </td>
            </tr>
            <tr class="trrow">
              <td>
                <small>تاریخ ثبت</small>
              </td>
              <td>
                <b>{{ item.jCreatedAt || '-' }}</b>
              </td>
            </tr>
            </tbody>
          </table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-icon color="blue lighten-5">touch_app</v-icon>
      <v-spacer/>
      <v-tooltip top>
        <v-btn v-if="item.instant" slot="activator" class="mx-1" icon round color="red" text-color="white">
          <v-icon class="white--text">whatshot</v-icon>
        </v-btn>
        <span>فوری</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn v-if="item.verified" slot="activator" class="mx-1" icon round color="green" text-color="white">
          <v-icon class="white--text">security</v-icon>
        </v-btn>
        <span>بررسی شده</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Helper from "~/assets/js/helper.js"

  export default {
    props: ["item"],
    methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      // get link
      getLink(_item) {
        return Helper.getAdvertLink(_item)
      },
      itemType(_item) {
        return Helper.getAdvertType(_item)
      },
      limitStr(text, limit, end) {
        return Helper.limitStr(text, limit, end)
      },
      price(number) {
        return Helper.priceFormat(number)
      }
    }
  }
</script>
<style>
  .trrow td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 4px;
  }

  .trrow:nth-child(even) td {
    background: rgba(0, 0, 0, 0.01);
  }
</style>
