<template>
  <v-alert v-if="showPremium" :value="!!msg" type="success">
    <span class="p-b--2">{{msg}}</span>
    <v-spacer/>
    <v-btn color="warning" :to="premiumLink">
      <v-icon class="px-1">shopping_cart</v-icon>
      خرید سریع اشتراک
    </v-btn>
    <v-btn :to="plans">
      <v-icon class="px-1">list</v-icon>
      پلن ها
    </v-btn>
    <v-btn :to="helpLink">
      <v-icon class="px-1">help</v-icon>
      آموزش خرید اشتراک
    </v-btn>
  </v-alert>
</template>
<script>
  const SETTINGS_KEY = 'needSubscriptionText',
    DEFAULT_MSG = 'برای دیدن این آگهی ها باید اشتراک فعال داشته باشید.';

  import Helper from '~/assets/js/helper'

  export default {
    props: ['type', 'to', 'show', 'specialMsg'],
    methods: {
      settings(key, def) {
        return _.get(this.$store.state.settings.data, key, def)
      }
    },
    computed: {
      showPremium() {
        return _.get(this, 'show', true)
      },
      premiumLink() {
        return this.link;
      },
      isLogged() {
        return !!_.get(this.$store.state, 'user.auth', false);
      },
      plans() {
        return (this.isLogged) ? '/pages/plans' : '/user/premium'
      },
      link() {
        return `/user/premium?redirect=${decodeURI(_.get(this, 'to', this.url))}`
      },
      url() {
        return this.$route.path;
      },
      msg() {
        return _.get(this, 'specialMsg', this.settings(SETTINGS_KEY, DEFAULT_MSG));
      },
      helpLink() {
        return this.settings('buySubscriptionHelpLink', '/posts/instructions');
      }
    }
  }
</script>
