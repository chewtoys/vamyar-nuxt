<template>
  <v-container>
    <v-card>
      <v-card-title>
        بازگشت از درگاه پرداخت
      </v-card-title>
      <v-card-text>

        <v-alert
          class="text-center"
          :value="status"
          color="success"
          icon="new_releases"
        >
          <p>{{message}}</p>
          <p>کد پیگیری پرداخت: {{trackingCode}}</p>
          <v-btn :to="redirectPath"><v-icon>forward</v-icon>ادامه فرایند</v-btn>
        </v-alert>

        <v-alert
          class="text-center"
          :value="!status"
          color="error"
          icon="new_releases"
        >
          <p>{{message}}</p>
          <p>کد پیگیری پرداخت: {{trackingCode}}</p>
          <v-btn :to="redirectPath">بازگشت</v-btn>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    meta: {
      title: 'نتیجه ی پرداخت',
      breadcrumb: 'درگاه پرداخت'
    },
    data() {
      return {query: ''}
    },
    computed: {
      getDecodedUri() {
        return {response: JSON.parse(this.query.response), data: JSON.parse(this.query.data)}
      },
      status() {
        return _.has(this.getDecodedUri, 'response.data.paymentInfo.trackingCode');
      },
      trackingCode() {
        return _.get(this.getDecodedUri, 'response.data.paymentInfo.trackingCode', 'یافت نشد!');
      },
      message() {
        return _.get(this.getDecodedUri, 'response.message', 'بدون پیام!');
      },
      redirectPath() {
        return _.get(this.getDecodedUri, 'data.redirect', '/user');
      }
    },
    asyncData({$axios, route}) {
      let query = route.query;
      return {query}
    },
    layout: 'site'
  }
</script>
