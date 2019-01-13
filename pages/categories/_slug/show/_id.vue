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

            <v-chip>{{ itemType }}</v-chip>
            <span v-if="false">
              <v-chip v-if="getProperty(item, 'advert.user.details.lastName', false)" outline label class="black--text">
                <v-icon right>verified_user</v-icon>
                <span>ثبت شده توسط
                {{getProperty(item, 'advert.user.details.lastName', '-')}}
                </span>
              </v-chip>
            </span>
            <span class="left">
              <v-chip v-if="isInstant" label color="red" text-color="white">
                <v-icon left class=" white--text">label</v-icon>
                <span calss="white--text">فوری</span>
              </v-chip>
              <v-chip v-if="getProperty(item, 'advert.verified',false)" label color="green" text-color="white">
                <v-icon left class=" white--text">security</v-icon>
                <span calss="white--text">بررسی شده</span>
              </v-chip>
              <v-chip v-if="getProperty(item, 'advert.tradeStatus',0)===1 && getProperty(item, 'advert.mobile',false)"
                      label color="cyan"
                      text-color="white">
                <v-icon left class=" white--text">phone_in_talk</v-icon>
                <span calss="white--text">در حال معامله</span>
              </v-chip>
              <v-chip v-if="getProperty(item, 'advert.transferable',0)===1" label color="yellow" text-color="white">
                <v-icon left class=" white--text">location_on</v-icon>
                <span calss="white--text">قابل انتقال به سایر استانها</span>
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
                      <v-alert color="info" :value="settings('adverts.noticeOnAdvertShow')!==''">
                        <div class="pa-1 pt-4 font-13" v-html=" settings('adverts.noticeOnAdvertShow') "></div>
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

                      <template v-if="isAllowed('amount')">
                        <div class="pa-2 mx-1 red--text">
                          <v-icon class="pb-1 pl-1 red--text">monetization_on</v-icon>
                          <span><small class="font-14">{{getTitle('amount')}}</small>
                          <b class="left">{{ showField('amount', amount) }} </b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('maxAmount')">
                        <div class="pa-2 mx-1 red--text" v-if="isAllowed('maxAmount')">
                          <v-icon class="pb-1 pl-1 red--text">monetization_on</v-icon>
                          <span><small class="font-14">{{getTitle('maxAmount')}}</small>
                          <b class="left">{{ showField('maxAmount', maxAmount) }} </b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('price')">
                        <div class="pa-2 mx-1" v-if="isAllowed('price')">
                          <v-icon class="pb-1 pl-1">shopping_cart</v-icon>
                          <span><small class="font-14">{{getTitle('price')}}</small>
                          <b class="left">{{ showField('price', price)}} </b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('province')">
                        <div class="pa-2 mx-1" v-if="isAllowed('province')">
                          <v-icon class="pb-1 pl-1">location_on</v-icon>
                          <span><small class="font-14">{{getTitle('province')}}</small>
                          <b class="left">{{ showField('province', item.advert.province) }}</b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('transferable')">
                        <div class="pa-2 mx-1" v-if="isAllowed('transferable')">
                          <v-icon class="pb-1 pl-1">location_on</v-icon>
                          <span><small class="font-14">{{getTitle('transferable')}}</small>
                          <b class="left">{{ showField('transferable', item.advert.transferable) }}</b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('job')">
                        <div class="pa-2 mx-1" v-if="isAllowed('job')">
                          <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span><small class="font-14">{{getTitle('job')}}</small>
                          <b class="left">{{ showField('job', item.job) }}</b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('forBank') && item.forBank">
                        <div class="pa-2 mx-1" v-if="isAllowed('forBank')">
                          <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span><small class="font-14">{{getTitle('forBank')}}</small>
                          <b class="left">{{ showField('forBank', item.forBank) }} </b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('bank') &&  item.forBank">
                        <div class="pa-2 mx-1" v-if="isAllowed('bank')">
                          <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span><small class="font-14">{{getTitle('bank')}}</small>
                          <b class="left">{{ showField('bank', item.bank) }}</b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('interestRate') && item.forBank">
                        <div class="pa-2 mx-1" v-if="isAllowed('interestRate')">
                          <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span><small class="font-14">{{getTitle('interestRate')}}</small>
                          <b class="left">{{ showField('interestRate', item.interestRate) }} </b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('forCourt') && item.forCourt">
                        <div class="pa-2 mx-1" v-if="isAllowed('forCourt')">
                          <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span><small class="font-14">{{getTitle('forCourt')}}</small>
                          <b class="left">{{ showField('forCourt', item.forCourt)}} </b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('paybackTime')">
                        <div class="pa-2 mx-1" v-if="isAllowed('paybackTime')">
                          <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span> <small class="font-14">{{getTitle('paybackTime')}}</small>
                          <b class="left">{{ showField('paybackTime', paybackTime)}}</b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>

                      <template v-if="isAllowed('guaranteeTypes')">
                        <div class="pa-2 mx-1" v-if="isAllowed('guaranteeTypes')">
                          <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                          <span><small class="font-14">{{getTitle('guaranteeTypes')}}</small><b
                            class="left">{{ getGuaranteeType || '-' }}</b></span>
                        </div>
                        <v-divider/>
                      </template>
                      <template v-if="isAllowed('loanType')">
                        <div class="pa-2 mx-1" v-if="isAllowed('loanType')">
                          <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                          <span>
                          <small class="font-14">{{getTitle('loanType')}}</small>
                          <b class="left">{{ getLoanType }}</b>
                        </span>
                        </div>
                        <v-divider/>
                      </template>
                      <template v-if="isAllowed('text')">
                        <div class="pa-2 mx-1">
                          <small class="font-14">
                            <v-icon class="pb-1 pl-1">edit</v-icon>
                            توضیحات
                          </small>
                          <p class="py-2 px-1" v-html="text"></p>
                        </div>
                        <v-divider/>
                      </template>
                      <div class="">
                        <v-icon class="pb-1 pl-1 pt-2">contact_phone</v-icon>
                        <span><small class="font-14 pt-2">شماره موبایل</small>
                          <v-alert :value="true"
                                   v-if="(getProperty(item, 'advert.tradeStatus',false)) && ( hasSubscription || getProperty(item, 'advert.mobile', false))">
                            این اگهی در حال معامله است در صورت توافق طرفین اگهی حذف می شود
                          </v-alert>
                          <b class="left"
                             v-else-if="getProperty(item, 'advert.mobile', false)">
                            <v-btn round outline color="info"
                                   :href="`tel:${getProperty(item, 'advert.mobile', '')}`">
                              {{ getProperty(item, 'advert.mobile', '')}}
                              <v-icon class="px-1">call</v-icon>
                              </v-btn></b>
                          <noSubscriptionAlert v-else :to="premiumLink"/>
                        </span>
                      </div>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-container grid-list-xs>
            <v-layout row wrap>
              <v-flex xs12>
          <span class="right">
            <v-icon class="pl-1 pb-1 green--text">pageview</v-icon>
            <span>لطفا قبل از اقدام <nuxt-link class="red--text" to="/pages/rules">قوانین سایت</nuxt-link> را مطالعه فرمایید.</span>
          </span>
              </v-flex>
              <v-flex xs12>
                <div class="text-left">
                  <Bookmark v-if="false"/>
                  <Report v-if="false"/>
                  <CopyUrl/>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex v-if="false" xs12 xl4>
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
  import noSubscriptionAlert from "~/components/site/noSubscriptionAlert.vue"


  const path = "/site/adverts",
    breadcrumb = "مشاهده‌‌ی آگهی",
    provinceMethod = '/cities?number=3000',
    guaranteeMethod = '/guaranteeTypes',
    loanTypeMethod = '/loanTypes'

  export default {

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
        include: 'advert.user.details,advert.province,loanType,guaranteeTypes'
      }

      try {
        let {data} = await app.$axios.$get(method, {params: query})
        let loading = false

        const breadcrumb = _.get(data, 'title', ''),
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

      itemType() {
        let _item = this.item
        //console.log(Helper.getAdvertType(_item, this.type.type, true))
        return _.get(Helper.getAdvertType(_item, this.type.type, true), 'cardTitle', '-')
      },
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
      hasSubscription() {
        return _.get(this.$store.state, 'user.hasSubscription', false) || false;
      },
      hasImage() {
        return !!this.settings('adverts.isImageAllowed') && !!this.item.advert.image
      },
      link() {
        return this.$route.path;
      },
      getGuaranteeType() {
        let items = [];
        _.forEach(this.item.guaranteeTypes, (item) => {
          items.push(item.name)
        })
        return _.join(items, ', ')
      },
      getLoanType() {
        return _.get(this.item, 'loanType.name',);
      },
      price() {
        return _.get(this, 'item.price',)
      },
      amount() {
        return _.get(this, 'item.amount', '')
      },
      maxAmount() {
        return _.get(this, 'item.maxAmount', '')
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
        return _.get(this, 'item.paybackTime', null);
      },
      interestRate() {
        return _.get(this, 'item.interestRate', null);
      },
      bank() {
        return _.get(this, 'item.bank', '-');
      },
      text() {
        return Helper.nl2br(_.get(this, 'item.advert.text', '-'));
      },
      premiumLink() {
        this.link
      },
    },
    methods: {
      showField(name, val) {
        return Helper.computeAdvertField(name, val, this.$store)
      },
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
    },
    components: {NewAdverts, Report, CopyUrl, Bookmark, noSubscriptionAlert}
  }
</script>
