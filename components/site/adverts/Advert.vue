<template>
  <v-card height="100%" hover raised ripple :to="getLink(item)">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 md3 v-if="!!item.image">
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
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex xs12 :md9="!!item.image" :md12="!item.image">
          <table class=" text-right full">
            <tbody>

            <tr class="trrow">
              <td width="30%">
                <small>عنوان</small>
              </td>
              <td><b>{{item.title}}</b></td>
            </tr>
            <tr class="trrow">
              <td width="30%">
                <small>نوع آگهی</small>
              </td>
              <td><b>{{itemType(item)}}</b></td>
            </tr>
            <tr v-if="item.advertable && item.advertable.amount" class="trrow">
              <td width="30%">
                <small>مبلغ</small>
              </td>
              <td><b>{{price(item.advertable.amount)}}</b></td>
            </tr>
            <tr v-if="item.advertable && item.advertable.price" class="trrow">
              <td width="30%">
                <small>قیمت</small>
              </td>
              <td><b class="red--text">{{price(item.advertable.price)}}</b></td>
            </tr>
            <tr class="trrow">
              <td>
                <small>توضیحات</small>
              </td>
              <td>
                <b>{{limitStr(item.text, 250, ' ...')}}</b>
              </td>
            </tr>
            <tr class="trrow">
              <td>
                <small>شهر</small>
              </td>
              <td>
                <b>{{item.cityId}}</b>
              </td>
            </tr>
            <tr class="trrow">
              <td>
                <small>ثبت شده توسط</small>
              </td>
              <td>
                <b>{{item.userId}}</b>
              </td>
            </tr>
            <tr class="trrow">
              <td>
                <small>ثبت شده در تاریخ</small>
              </td>
              <td>
                <b>تاریخ مشخص</b>
              </td>
            </tr>
            </tbody>
          </table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-icon color="blue lighten-5">touch_app</v-icon>
      <v-spacer></v-spacer>

      <v-tooltip top>
        <v-btn class="mx-1" icon slot="activator" round color="red" text-color="white" v-if="item.instant">
          <v-icon class="white--text">whatshot</v-icon>
        </v-btn>
        <span>فوری</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn class="mx-1" icon slot="activator" round color="green" text-color="white" v-if="item.verified">
          <v-icon class="white--text">security</v-icon>
        </v-btn>
        <span>بررسی شده</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Helper from '~/assets/js/helper.js'

  export default {
    props: ['item'],
    methods: {
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
      },
    }
  }
</script>
<style>
  .trrow td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 4px;
  }

  .trrow:nth-child(even) td {
    background: rgba(0, 0, 0, .01);
  }
</style>
