<template>
    <v-card
            class="pt-4"
            img="/bg/flower(2).jpg"
            height="100%"
            flat
    >
        <v-container grid-list-lg fill-height>
            <v-layout row wrap color="white" reverse>
                <v-flex xs12 md6 offset-md3>
                    <v-card
                            color="white"
                    >
                        <v-alert
                                v-if="showLogin"
                                :value="true"
                                type="success"
                        ><span class="px-1">لطفا مشخصات خود را در زیر وارد کنید. </span></v-alert>
                        <v-alert
                                v-if="success !== null "
                                :value="true"
                                type="success"
                        ><span class="px-1">{{success}}</span></v-alert>
                        <v-alert
                                v-if="error !== null "
                                :value="true"
                                type="error"
                        ><span class="px-1">{{error}}</span></v-alert>
                        <v-alert
                                v-if="!showLogin"
                                :value="true"
                                type="info"
                        ><span class="px-1">لطفا شماره‌ی خود را وارد کنید و با کد دریافتی وارد پنل شوید.</span>
                        </v-alert>
                        <v-card-text class="py-5 mb-4 px-4 text-center">
                            <div v-if="showLogin">
                                <v-form>
                                    <v-text-field prepend-icon="person" v-model="formUsername"
                                                  name="formUsername"
                                                  label="نام کاربری"
                                                  type="text"></v-text-field>
                                    <v-text-field id="formPassword" v-model="formPassword" prepend-icon="lock"
                                                  name="formPassword"
                                                  label="رمز عبور"
                                                  type="password"></v-text-field>
                                    <br>
                                    <div class="my-3">
                                        <v-btn color="primary" outline class="my-3" @click="login"><span>ورود</span>
                                            <v-icon class="px-1">lock_open</v-icon>
                                        </v-btn>
                                    </div>
                                    <br>
                                </v-form>
                            </div>
                            <div v-if="!showLogin">
                                <v-form>
                                    <v-text-field
                                            prepend-icon="phone"
                                            v-model="formMobile"
                                            name="formMobile"
                                            label="شماره همراه"
                                            counter
                                            maxlength="11"
                                            minlength="11"
                                            type="text"></v-text-field>
                                    <v-text-field id="formPassword"
                                                  v-model="formNewPassword"
                                                  prepend-icon="lock"
                                                  name="formNewPassword"
                                                  label="رمز عبور"
                                                  type="password"></v-text-field>

                                    <v-text-field v-if="sms_sent" prepend-icon="textsms" v-model="formCode"
                                                  name="formCode"
                                                  label="کد دریافت شده"
                                                  type="text"></v-text-field>
                                    <br>
                                    <div class="my-3">
                                        <v-btn v-if="!sms_sent" :disabled="formMobile.length!=11" color="primary"
                                               outline @click="sendCode">
                                            <span>ارسال کد</span>
                                            <v-icon class="px-1">sms</v-icon>
                                        </v-btn>
                                        <v-btn v-if="sms_sent" color="primary" :disabled="pending" outline
                                               @click="sendCode"><span>ارسال مجدد</span>
                                            <v-icon class="px-1">autorenew</v-icon>
                                        </v-btn>
                                        <v-btn v-if="sms_sent" color="primary" outline @click="checkCode">
                                            <span>بررسی کد</span>
                                            <v-icon class="px-1">check</v-icon>
                                        </v-btn>
                                    </div>
                                    <br>
                                </v-form>
                            </div>
                        </v-card-text>
                        <v-bottom-nav
                                :active.sync="activeBtn"
                                :value="showNav"
                                absolute
                                color="transparent"
                        >
                            <v-btn flat color="success" @click="showLogin = true">
                                <span>ورود</span>
                                <v-icon>lock</v-icon>
                            </v-btn>
                            <v-btn flat color="info" @click="showLogin = false">
                                <span>ثبت نام سریع</span>
                                <v-icon>phonelink_lock</v-icon>
                            </v-btn>
                        </v-bottom-nav>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
    import Cookie from 'js-cookie'
    //import axios from 'axios'
    let register_path = '/user/register', login_path = '/oauth/token';

    export default {
        layout: "auth",
        data(){
            return {
                formUsername: '9379745572',
                formPassword: 'secret',
                formCode: null,
                formMobile: '',
                formNewPassword: '',
                sms_sent: false,
                auth: null,
                activeBtn: 0,
                showNav: true,
                showLogin: true,
                pending: true,
                success: null,
                error: null,
            }
        },
        middleware: 'notAuthenticated',
        computed: {
            access_token: {
                // getter
                get: () => {
                    return this.$store.state.auth
                },
                // setter
                set: (newValue) => {
                    this.$store.dispatch('update', newValue)
                }
            }
        },
        methods: {
            msgError(msg){
                this.error = msg;
                this.success = null;
            },
            msgSuccess(msg){
                this.error = null;
                this.success = msg;
            },
            backHome: function () {
                this.$router.push('/')
            },
            debug: function () {
                console.log(this.$store.state.req);
            },
            sendCode: function () {
                let resource = register_path;
                let username = this.formMobile;
                let password = this.formNewPassword;
                let client_secret = this.$store.state.secret;
                let client_id = 1;
                let formData =
                    {
                        username,
                        password,
                        password_confirmation: password,
                        client_secret
                    }

                let response = this.$axios.post(resource, formData).then((resp) => {
                    let {message} = resp;
                    this.msgSuccess(message);
                }).catch((resp) => {
                    let message = 'متاسفانه مشکلی در ارتباط با سرور پیش آمد.'
                    this.msgError(message);
                })
                console.log({response})


                this.pending = true;
                setTimeout(() => {
                    this.pending = false
                }, 10000)
                this.sms_sent = true;
            },
            checkCode: function () {

            },
            login: function () {
                let resource = login_path;
                let username = this.formUsername;
                let password = this.formPassword;
                let clientsecret = this.$store.state.secret
                let formData =
                    {
                        username: username,
                        password: password,
                        grant_type: "password",
                        provider: "users",
                        client_id: '1',
                        client_secret: clientsecret
                    }
                this.$axios.post(resource, formData,{mode:'no-cors'}).then((resp) => {
                    let {token_type, access_token} = resp;
                    if (access_token) {
                        Cookie.set('auth', access_token)
                        if (this.$store.state.debug)
                            this.$store.commit('updateToken', access_token)
                        this.$router.push('/user/')
                    } else {
                        this.msgError('مشخصات صحیح نمی باشد.')
                    }
                }).catch((error) => {
                    this.msgError("مشکلی از طرف سرور پیش آمد." + error)
                })
            }
        }
    }
</script>
