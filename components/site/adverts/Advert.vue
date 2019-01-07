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
                <small>{{getTitle('title')}}</small>
              </td>
              <td><b>{{ show(item, 'title', 'advert.title') }}</b></td>
            </tr>
            <tr v-if="isAllowed('amount')" class="trrow">
              <td width="30%">
                <small>{{getTitle('amount')}}</small>
              </td>
              <td><b>{{ price(show(item, 'advertable.amount', 'amount', 'توافقی')) }}</b></td>
            </tr>
            <tr v-if="isAllowed('maxAmount')" class="trrow">
              <td width="30%">
                <small>{{getTitle('maxAmount')}}</small>
              </td>
              <td><b>{{ price(show(item, 'advertable.maxAmount', 'maxAmount', 'توافقی')) }}</b></td>
            </tr>
            <tr v-if="isAllowed('price')" class="trrow">
              <td width="30%">
                <small>{{getTitle('price')}}</small>
              </td>
              <td><b class="">{{ price(show(item, 'advertable.price', 'price', 'ثبت نشده')) }}</b></td>
            </tr>
            <tr class="hide trrow">
              <td>
                <small>{{getTitle('text')}}</small>
              </td>
              <td>
                <b>{{ limitStr(show(item, 'text', 'advert.text'), 250, ' ...') }}</b>
              </td>
            </tr>
            <tr v-if="isAllowed('city')" class="trrow">
              <td>
                <small>{{getTitle('city')}}</small>
              </td>
              <td>
                <b>{{ show(item, 'city.name', 'advert.city.name') }}</b>
              </td>
            </tr>
            <tr class="trrow">
              <td>
                <small>تاریخ ثبت</small>
              </td>
              <td>
                <b>{{ getCreatedDate(item.jCreatedAt || '-') }}</b>
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
        <v-btn v-if="isLadder" slot="activator" class="mx-1" icon round color="brown" text-color="white">
          <v-icon class="white--text">trending_up</v-icon>
        </v-btn>
        <span>نردبان</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn v-if="isInstant" slot="activator" class="mx-1" icon round color="red" text-color="white">
          <v-icon class="white--text">whatshot</v-icon>
        </v-btn>
        <span>فوری</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn v-if="isTransferable" slot="activator" class="mx-1" icon round color="yellow" text-color="white">
          <v-icon class="white--text">location_on</v-icon>
        </v-btn>
        <span>قابل انتقال به سایر شهرها</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn v-if="tradeStatus===1" slot="activator" class="mx-1" icon round color="cyan" text-color="white">
          <v-icon class="white--text">phone_in_talk</v-icon>
        </v-btn>
        <span>در حال معامله</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn v-if="isVerified" slot="activator" class="mx-1" icon round color="green" text-color="white">
          <v-icon class="white--text">security</v-icon>
        </v-btn>
        <span>بررسی شده</span>
      </v-tooltip>
      <v-chip v-if="which==='adverts'">{{ itemType(item) }}</v-chip>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Helper from "~/assets/js/helper.js"

  export default {
    props: ["item", 'which'],
    methods: {
      getTitle(name) {
        let type = _.get(Helper.getAdvertType(this.item, null, true), 'type', this.which)
        let list = Helper.getFieldByType(type, name)
        let field = list // _.find(list, {name});
        // console.log({type, list, field, name}, this.item, this.which)
        return _.get(field, 'title', name)
      },
      isAllowed(name) {
        let type = _.get(Helper.getAdvertType(this.item, null, true), 'type', this.which)
        return !!Helper.getFieldByType(type, name)
      },
      _has(item, path) {
        return _.has(item, path)
      },
      show(item, path1, path2, def = 'نامشخص') {
        return _.get(item, path1, _.get(item, path2, def));
      },
      getCreatedDate(val) {
        return Helper.dateFormat(val);
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      // get link
      getLink(_item) {
        return Helper.getAdvertLink(_item, this.which === 'adverts' ? null : this.which)
      },
      itemType(_item) {
        return Helper.getAdvertType(_item, this.which === 'adverts' ? null : this.which)
      },
      limitStr(text, limit, end) {
        return Helper.limitStr(text, limit, end)
      },
      price(number) {
        return Helper.priceFormat(number)
      }
    },
    computed: {
      isTransferable() {
        return _.get(this.item, 'advert.transferable', _.get(this.item, 'transferable', 0));
      },
      isInstant() {
        return _.get(this.item, 'advert.instant', _.get(this.item, 'instant', 0));
      },
      isLadder() {
        return _.get(this.item, 'advert.ladderable', _.get(this.item, 'ladderable', 0));
      },
      isVerified() {
        return _.get(this.item, 'advert.verified', _.get(this.item, 'verified', 0));
      },
      tradeStatus() {
        return _.get(this.item, 'advert.tradeStatus', _.get(this.item, 'tradeStatus', 0));
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
    background: rgba(0, 0, 0, 0.01);
  }
</style>
