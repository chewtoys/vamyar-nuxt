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
              {{ getProperty(item, 'date', '-') }}</i>
          </v-card-title>
          <div>
            <v-divider/>
            <span>
              <v-chip outline label class="black--text">
                <v-icon right>verified_user</v-icon>
                <span>ثبت شده توسط
                {{getProperty(item, 'user.name', '-')}}
                </span>
              </v-chip>
            </span>
            <span class="left">
              <v-chip v-if="isInstant" label color="red" text-color="white">
                <span calss="white--text">فوری</span>
                <v-icon left class="white--text">label</v-icon>
              </v-chip>
              <v-chip v-if="getProperty(item, 'advert.verified',false)" label color="green" text-color="white">
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
                    <span v-if=" hasImage">
                      <img :src="getProperty(item, 'advert.image','')" class="full">
                      <v-divider/>
                    </span>
                    <div class="full text-justify py-3">
                      <h3>نکته و یا هشدار سایت</h3>
                      <div class="font-13">{{ settings('adverts.noticeOnAdvertShow') }}</div>
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
                      <div class="pa-2 mx-1 red--text">
                        <v-icon class="pb-1 pl-1 red--text">monetization_on</v-icon>
                        <span><small class="font-14">مبلغ</small>
                          <b class="left">{{ getProperty(item, amount, '').toLocaleString('fa-IR') }} ريال</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1">
                        <v-icon class="pb-1 pl-1">shopping_cart</v-icon>
                        <span><small class="font-14">قیمت</small>
                          <b class="left">{{ getProperty(item, 'price', '').toLocaleString('fa-IR') }} ريال</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1">
                        <v-icon class="pb-1 pl-1">location_on</v-icon>
                        <span><small class="font-14">شهر</small>
                          <b class="left">{{ getProperty(item, 'city.name', '') }}</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1">
                        <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                        <span> <small class="font-14">بازپرداخت</small>
                          <b class="left">{{ getProperty(item, 'paybackTime', '') }} ماه</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1">
                        <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                        <span><small class="font-14">ضمانت</small><b
                          class="left">{{ getProperty(item, 'security', '') }}</b></span>
                      </div>
                      <v-divider/>
                      <div class="pa-2 mx-1">
                        <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                        <span>
                          <small class="font-14">فیلد دیگر</small>
                          <b class="left">{{ getProperty(item, 'other', '') }}</b>
                        </span>
                      </div>
                      <v-divider/>
                      <div class="my-5 mx-1">
                        <div class="pa-2 mx-1">
                          <h2>مشخصات تماس</h2>
                        </div>
                        <v-btn v-if="!showContact" :loading="showLoading" color="red" dark
                               calss="white--text"
                               @click="showDetail()">
                          <v-icon class="pa-1">contacts</v-icon>
                          <span class="text--white">نمایش مشخصات تماس</span>
                        </v-btn>
                        <div v-if="showContact" name="data">
                          <div v-if="showPhone">
                            <div class="pa-2 mx-1">
                              <v-icon class="pl-2">contact_phone</v-icon>
                              <small class="font-14">شماره تماس </small>
                              <b class="left">
                                <a :href="'tel:' + phone ">{{ phone }}</a>
                              </b>
                            </div>
                            <v-divider/>
                          </div>
                          <div v-if="showMail">
                            <div class="pa-2 mx-1">
                              <v-icon class="pl-2">contact_mail</v-icon>
                              <small class="font-14">ایمیل</small>
                              <b class="left">
                                <a :href="'mailto:' + mail ">{{ mail }}</a>
                              </b>
                              <v-divider/>
                            </div>
                          </div>
                          <div v-if="showAddress" class="pa-2 mx-1">
                            <v-icon class="pl-2 pb-1 black--text">business</v-icon>
                            <small class="font-14">آدرس</small>
                            <b class="left">{{ address }}</b>
                            <v-divider/>
                          </div>
                          <div v-if="showNoContactAvailable" class="pa-2 mx-1">
                            <v-icon class="pl-2 pb-1 black--text">no_meeting_room</v-icon>
                            <small class="font-14">خطا</small>
                            <b class="left">متاسفانه هیچ مشخصاتی برای تماس ثبت نشده است.</b>
                            <v-divider/>
                          </div>
                        </div>
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
    number = 4,
    include = "advertable",
    advertableType = "loan",
    breadcrumb = "مشاهده‌‌ی آگهی"

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
        include: 'user.details,city'
      }
      try {

        let {data} = await app.$axios.$get(method, {params: query})
        let loading = false

        const breadcrumb = 'نمایش آگهی',
          page_title = ` آگهی - ${data.title || 'بدون عنوان'}`;
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
      }
    },
    methods: {
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
        if (address) {
          this.address = address
          this.showAddress = true
        }
        if (mail) {
          this.mail = mail
          this.showMail = true
        }
        if (!phone && !mail && !address) {
          this.showNoContactAvailable = true
        }

        setTimeout(() => {
          this.showContact = true
          this.showLoading = false
        }, 1000)
      }
    }
  }
</script>
