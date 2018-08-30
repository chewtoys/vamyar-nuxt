<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 xl8>
                <v-card color="white">
                    <v-card-title>
                        <v-icon class="pl-1 grey--text font-28">bookmark</v-icon>
                        <h1>{{item.title}}</h1>
                        <v-spacer></v-spacer>
                        <i class="grey--text font-12">
                            <v-icon class="pl-1 font-14 pb-1">today</v-icon>
                            {{item.date}}</i>
                    </v-card-title>
                    <div>
                        <v-divider></v-divider>
                        <span>
                            <v-chip outline label class="black--text">
                                <v-icon right>verified_user</v-icon>
                                <span>ثبت شده توسط {{item.user}}</span>
                            </v-chip>
                        </span>
                        <span class="left">
                            <v-chip label color="red" text-color="white" v-if="isUrgent">
                                <span calss="white--text">فوری</span>
                                <v-icon left class="white--text">label</v-icon>
                            </v-chip>
                            <v-chip label color="green" text-color="white" v-if="isUrgent">
                                <span calss="white--text">لیبل های دیگر</span>
                                <v-icon left class="white--text">check_circle</v-icon>
                            </v-chip>
                            <v-chip label color="cyan" text-color="white" v-if="isUrgent">
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
                                    <span v-if="item.has_image">
                                        <img :src="item.image" class="full"/>
                                        <v-divider/>
                                    </span>
                                        <div class="full text-justify py-3">
                                            <h3>نکته و یا هشدار سایت</h3>
                                            <div class="font-13">{{note1}}</div>
                                        </div>
                                        <v-divider/>
                                    </div>
                                </v-flex>
                                <v-flex xs12 md6 class="py-2">
                                    <div>
                                        <div class="pa-2  mx-1">
                                            <h2>جزئیات آگهی</h2>
                                        </div>
                                        <div class="pl-5">
                                            <div class="pa-2 mx-1">
                                                <v-icon class="pb-1 pl-1">monetization_on</v-icon>
                                                <span><small class="font-14">مبلغ</small>
                                                <b class="left">{{item.price}}</b>
                                            </span>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="pa-2 mx-1">
                                                <v-icon class="pb-1 pl-1">location_on</v-icon>
                                                <span><small class="font-14">شهر</small>
                                                <b class="left">{{item.city}}</b>
                                            </span>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="pa-2 mx-1">
                                                <v-icon class="pb-1 pl-1">keyboard_arrow_left</v-icon>
                                                <span> <small class="font-14">بازپرداخت</small>
                                                <b class="left">{{item.payback}}</b>
                                            </span>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="pa-2 mx-1">
                                                <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                                                <span><small class="font-14">ضمانت</small><b
                                                        class="left">{{item.security}}</b></span>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="pa-2 mx-1">
                                                <v-icon class="pb-1 pl-1">how_to_reg</v-icon>
                                                <span>
                                                <small class="font-14">فیلد دیگر</small>
                                                <b class="left">{{item.other}}</b>
                                            </span>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="my-5 mx-1">
                                                <div class="pa-2 mx-1">
                                                    <h2>مشخصات تماس</h2>
                                                </div>
                                                <v-btn v-if="!showContact" color="red" dark calss="white--text"
                                                       @click="showDetail()"
                                                       :loading="showLoading">
                                                    <v-icon class="pa-1">contacts</v-icon>
                                                    <span class="text--white">نمایش مشخصات تماس</span>
                                                </v-btn>
                                                <div name="data" v-if="showContact">
                                                    <div v-if="showPhone">
                                                        <div class="pa-2 mx-1">
                                                            <v-icon class="pl-2">contact_phone</v-icon>
                                                            <small class="font-14">شماره تماس </small>
                                                            <b class="left">
                                                                <a :href="'tel:' + phone ">{{phone}}</a>
                                                            </b>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>
                                                    <div v-if="showMail">
                                                        <div class="pa-2 mx-1">
                                                            <v-icon class="pl-2">contact_mail</v-icon>
                                                            <small class="font-14">ایمیل</small>
                                                            <b class="left">
                                                                <a :href="'mailto:' + mail ">{{mail}}</a>
                                                            </b>
                                                            <v-divider></v-divider>
                                                        </div>
                                                    </div>
                                                    <div v-if="showAddress" class="pa-2 mx-1">
                                                        <v-icon class="pl-2 pb-1 black--text">business</v-icon>
                                                        <small class="font-14">آدرس</small>
                                                        <b class="left">{{address}}</b>
                                                        <v-divider></v-divider>
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
                        <span>لطفا قبل از هزچیز <nuxt-link class="red--text" to="/pages/rules/">قوانین سایت</nuxt-link> را مطالعه فرمایید.</span>
                    </span>
                    <div class="text-left">
                        <v-btn ripple class="elevation-2" color="warning" round>
                            <v-icon>report</v-icon>
                            <span class="px-1">گزارش این آگهی</span>
                        </v-btn>
                        <v-btn ripple class="elevation-2" color="info" round>
                            <v-icon>share</v-icon>
                            <span class="px-1"> اشتراک گذاری</span>
                        </v-btn>
                        <v-btn ripple class="elevation-2" color="success" round>
                            <v-icon>bookmark</v-icon>
                            <span class="px-1">نشانه گذاری</span>
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

    export default {
        data(){
            return {
                phone: '09XXXXXXX',
                mail: 'XXX@mail.yxz',
                address: 'xXXXXx',
                showMail: false,
                showPhone: false,
                showAddress: false,
                showContact: false,
                showLoading: false
            }
        },
        methods: {
            isUrgent: function () {
                return this.item.isUrgent === true;
            },
            showDetail: function () {
                this.showLoading = true;
                let phone = this.item.phone;
                let mail = this.item.mail;
                let address = this.item.address;

                if (phone !== null) {
                    this.phone = (phone);
                    this.showPhone = true;
                }
                if (address !== null) {
                    this.address = (address);
                    this.showAddress = true;
                }
                if (mail !== null) {
                    this.mail = (mail);
                    this.showMail = true;
                }


                setTimeout(() => {
                        this.showContact = true;
                        this.showLoading = false
                    }, 1000
                )
            }
        }
        ,
        computed: {
            note1: function () {
                return this.$store.state.site.notes_on_request_loans;
            }
            ,
            item: function () {
                return this.$store.state.temp.loan.item;
            }
        }
    }
</script>