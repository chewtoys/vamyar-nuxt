<template>
  <v-container grid-list-lg>
    <div v-if="loading">
      <v-progress-linear :indeterminate="loading"/>
    </div>
    <v-layout v-if="!loading" row wrap>
      <v-flex xs12 xl8>
        <v-card color="white">
          <v-card-title>
            <v-icon class="pl-1 grey--text font-28">bookmark</v-icon>
            <h1>{{ getProperty(item, 'advert.title', 'بدون عنوان') }}</h1>
            <v-spacer/>
            <i class="grey--text font-12">
              <v-icon class="pl-1 font-14 pb-1">today</v-icon>
              آخرین بروزرسانی در
              {{ getProperty(item, 'advert.jUpdatedAt', '-') }}
            </i>
          </v-card-title>
          <div>
            <v-divider/>
            <span>
              <v-chip v-if="getProperty(item, 'advert.user.details.lastName', false)" outline label class="black--text">
                <v-icon right>verified_user</v-icon>
                <span>ثبت شده توسط
                {{getProperty(item, 'advert.user.details.lastName', '-')}}
                </span>
              </v-chip>
            </span>
            <span class="left">
              <v-chip v-if="isInstant" label color="red" text-color="white">
                <span calss="white--text">فوری</span>
                <v-icon left class="white--text">label</v-icon>
              </v-chip>
              <v-chip v-if="getProperty(item, 'advert.advert.verified',false)" label color="green" text-color="white">
                <span calss="white--text">بررسی شده</span>
                <v-icon left class="white--text">security</v-icon>
              </v-chip>
              <v-chip v-if="false" label color="cyan" text-color="white">
                <span calss="white--text">لیبل های دیگر</span>
                <v-icon left class="white--text">star</v-icon>
              </v-chip>
            </span>
          </div>
          <v-card-text>
            <v-container grid-list-xs fluid>
              <v-layout row wrap class="black--text font-15 full" reverse>
                <v-flex xs12 md6 class="py-2">
                  <div>
                    <span v-if="hasImage">
                      <img :src="getProperty(item, 'advert.image','')" class="full">
                      <v-divider/>
                    </span>
                    <div class="full text-justify py-3">
                      <h3>توجه داشته باشید:</h3>
                      <v-alert type="info" :value="settings('adverts.noticeOnAdvertShow')!==''">
                        <div class="font-13" v-html=" settings('adverts.noticeOnAdvertShow') "></div>
                      </v-alert>
                    </div>
                    <v-divider/>
                  </div>
                </v-flex>
                <v-flex xs12 md6 class="py-2">
                  <div>
                    <div class="pa-2  mx-1">
                      <h2>جزئیات آگهی</h2>
                    </div>
                    <div class="">
                      <div class="pa-2 mx-1 red--text" v-if="isAllowed('amount')">
                        <v-icon class="pb-1 pl-1 red--text">monetization_on</v-icon>
                        <span><small class="font-14">{{getTitle('amount')}}</small>
                          <b class="left">{{ amount }} </b>
                        </span>
                      </div>
                      <div class="pa-2 mx-1 red--text" v-if="isAllowed('maxAmount')">
                        <v-icon class="pb-1 pl-1 red--text">monetization_on</v-icon>
                        <span><small class="font-14">{{getTitle('maxAmount')}}</small>
                          <b class="left">{{ maxAmount }} </b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1" v-if="isAllowed('price')">
                        <v-icon class="pb-1 pl-1">shopping_cart</v-icon>
                        <span><small class="font-14">{{getTitle('price')}}</small>
                          <b class="left">{{ price }} </b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1" v-if="isAllowed('city')">
                        <v-icon class="pb-1 pl-1">location_on</v-icon>
                        <span><small class="font-14">{{getTitle('city')}}</small>
                          <b class="left">{{ city }}</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1" v-if="isAllowed('paybackTime')">
                        <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                        <span> <small class="font-14">{{getTitle('paybackTime')}}</small>
                          <b class="left">{{ getProperty(item, 'paybackTime', '') }} ماه</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1" v-if="isAllowed('guaranteeTypes')">
                        <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                        <span><small class="font-14">{{getTitle('guaranteeTypes')}}</small><b
                          class="left">{{ getGuaranteeType }}</b></span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1" v-if="isAllowed('loanType')">
                        <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                        <span>
                          <small class="font-14">{{getTitle('loanType')}}</small>
                          <b class="left">{{ getLoanType }}</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1">
                        <v-icon class="pb-1 pl-1">location_on</v-icon>
                        <span><small class="font-14">شماره موبایل</small>
                          <b class="left"
                             v-if="getProperty(item, 'advert.mobile', false)">{{ getProperty(item, 'advert.mobile', '')
                            }}</b>
                          <div class="left" v-else>
                            <v-alert :value="true" type="success">
                              <p>برای دیدن شماره تماس باید اشتراک داشته باشید. پس از فعال سازی اشتراک به همین آدرس بر خواهید گشت:</p>
          <v-btn color="warning" :to="premiumLink">
            <v-icon class="px-1">shopping_cart</v-icon>
            خرید سریع اشتراک
          </v-btn>
        </v-alert>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <span class="right pa-3">
            <v-icon class="pl-1 pb-1 green--text">pageview</v-icon>
            <span>لطفا قبل از اقدام <nuxt-link class="red--text" to="/pages/rules">قوانین سایت</nuxt-link> را مطالعه فرمایید.</span>
          </span>
          <div class="text-left">
            <Bookmark/>
            <Report/>
            <CopyUrl/>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 xl4>
        <NewAdverts/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import NewAdverts from "~/components/site/sliders/NewAdverts.vue"
  import Report from "~/components/site/buttons/Report.vue"
  import CopyUrl from "~/components/site/buttons/CopyUrl.vue"
  import Bookmark from "~/components/site/buttons/Bookmark.vue"
  import Helper from "~/assets/js/helper.js"

  const path = "/site/adverts",
    breadcrumb = "مشاهده‌‌ی آگهی",
    cityMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {

    components: {NewAdverts, Report, CopyUrl, Bookmark},
    data() {
      return {
        // data
        loading: true,
        showNoContactAvailable: false,
        showMail: false,
        showPhone: false,
        showAddress: false,
        showContact: false,
        showLoading: false
      }
    },
    async asyncData({params, $axios, store, app, error}) {
      let id = params.id
      let type = Helper.getTypeByAlias(params.slug)
      if (!type.title) return error({statusCode: 404})
      let slug = params.slug
      let method = `/site/${type.type}/${id}`
      let query = {
        include: 'advert.user.details,advert.city,guaranteeTypes'
      }

      try {
// city
        //let cityData = await $axios.$get(cityMethod);
        //store.commit('city/setAndProcessData', cityData.data || []);

        // guarantee
        let guaranteeData = await $axios.$get(guaranteeMethod);
        store.commit('guaranteeType/setAndProcessData', guaranteeData.data || []);

        // loan types
        let loanTypeData = await $axios.$get(loanTypeMethod);
        store.commit('loanType/setAndProcessData', loanTypeData.data || []);


        let {data} = await app.$axios.$get(method, {params: query})
        let loading = false

        const breadcrumb = 'نمایش آگهی',
          page_title = ` ${data.advert.title || 'بدون عنوان'}`;
        store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
        store.commit("navigation/setTitle", page_title);

        return {item: data, loading, type, slug, params}
      } catch (err) {
        //console.log(err, method)
        return error({
          statusCode: 404,
          message: "متاسفانه آگهی مورد نظر پیدا نشد :("
        })
      }
    },
    computed: {
      // meta
      title() {
        return "مشاهده‌ی آگهی" + type.title + " - " + item.title
      },
      breadcrumb() {
        return "مشاهده‌ی " + type.title
      },

      // computed
      note1: function () {
        return this.$store.state.site.notes_on_request_loans
      },
      isInstant() {
        return this.item.advert.instant
      },
      hasImage() {
        return !!this.settings('adverts.isImageAllowed') && !!this.item.advert.image
      },
      link() {
        return this.$router.path;
      },
      getGuaranteeType() {
        let items = [];
        _.forEach(this.item.guaranteeTypes, (item) => {
          items.push(item.name)
        })
        return _.join(items, ', ')
      },
      getLoanType() {
        let list = this.$store.state.loanType.data;
        let index = _.findIndex(list, {'id': this.item.loanTypeId});
        let item = list[index];
        return _.get(item, 'name', 0);
      },
      price() {
        return Helper.priceFormat(_.get(this, 'item.price',));
      },
      amount() {
        return Helper.priceFormat(_.get(this, 'item.amount', ''));
      },
      maxAmount() {
        return Helper.priceFormat(_.get(this, 'item.maxAmount', ''));
      },
      job() {
        return _.get(this, 'item.job', '-');
      },
      mobile() {
        return (_.get(this, 'item.advert.mobile', ''));
      },
      image() {
        return _.get(this, 'item.advert.image', '');
      },
      paybackTime() {
        return _.get(this, 'item.paybackTime', null) + ' ماه';
      },
      interestRate() {
        return _.get(this, 'item.interestRate', null);
      },
      bank() {
        return _.get(this, 'item.bank', '-');
      },
      city() {
        if (_.has(this.item, 'advert.city.name')) return _.get(this.item, 'advert.city.name', '-');
        let list = this.$store.state.city.data;
        let index = _.findIndex(list, {'id': this.item.advert.cityId});
        let item = [];
        if (index > 0) {
          item = list[index];
        }
        return _.get(item, 'name', '');
      },
      text() {
        return Helper.nl2br(_.get(this, 'item.advert.text', '-'));
      },
      premiumLink() {
        return `/user/premium?redirect=${decodeURI(this.link)}`
      },

    },
    methods: {
      isAllowed(key) {
        return Helper.isFieldAllowByType(this.type.type, key)
      },
      getTitle(key) {
        return _.get(Helper.getFieldByType(this.type.type, key), 'title', '')
      },
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      },
      getProperty(item, key, def) {
        return _.get(item, key, def)
      },
      isUrgent: function () {
        return this.item.isUrgent === true
      },
      showDetail: function () {
        this.showLoading = true
        let phone = this.item.advert.mobile
        let mail = this.item.advert.mail
        let address = this.item.advert.address
        if (phone) {
          this.phone = phone
          this.showPhone = true
        }
      }
    }
  }
</script>
