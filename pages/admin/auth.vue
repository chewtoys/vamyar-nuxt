<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title> ورود و ثبت نام</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout align-center justify-center>
                                    <v-flex xs12 md6 offset-md1>
                                        <v-form>
                                            <v-text-field prepend-icon="person" v-model="formUsername"
                                                          name="formUsername"
                                                          label="نام کاربری"
                                                          type="text"></v-text-field>
                                            <v-text-field id="formPassword" v-model="formPassword" prepend-icon="lock"
                                                          name="formPassword"
                                                          label="رمز عبور"
                                                          type="password"></v-text-field>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" @click="login">ورود</v-btn>
                                        </v-form>
                                    </v-flex>
                                    <v-flex xs-12 md5>
                                        <v-form>
                                            <v-text-field v-if="!sms_sent" prepend-icon="mobile" v-model="formMobile"
                                                          name="formMobile"
                                                          label="شماره همراه"
                                                          type="text"></v-text-field>
                                            <v-text-field v-if="sms_sent" prepend-icon="code" v-model="formCode"
                                                          name="formCode"
                                                          label="کد دریافت شده"
                                                          type="text"></v-text-field>
                                            <v-spacer></v-spacer>

                                            <v-btn v-if="!sms_sent" color="primary" @click="sendCode">ارسال کد</v-btn>
                                            <v-btn v-if="sms_sent" color="primary" @click="checkCode">بررسی کد</v-btn>

                                        </v-form>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="backHome">بازگشت به خانه</v-btn>
                                <v-btn @click="debug">Debug!</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Cookie from 'js-cookie'
    import axios from 'axios'


    export default {
        layout: "adminAuth",
        data(){
            return {
                formUsername: '9379745572',
                formPassword: 'secret',
                formCode: null,
                formMobile: null,
                sms_sent: false,
                auth: null,
            }
        },
        middleware: 'adminNotAuthenticated',
        computed: {
            access_token: {
                // getter
                get: () => {
                    return this.$store.state.auth
                },
                // setter
                set: (newValue) => {
                    this.$store.dispatch('updateAdminToken', newValue)
                }
            }
        },
        methods: {
            backHome: function () {
                this.$router.push('/')
            },
            debug: function () {
                alert(this.$store.state.req);
                console.log(this.$store.state.req);
            },
            sendCode: function () {
                this.sms_sent = true;
            },
            checkCode: function () {
                alert('validating');
            },
            login: function () {
                let resource = "/oauth/token";
                let username = this.formUsername;
                let password = this.formPassword;
                let clientsecret = this.$store.state.secret
                let formData =
                    {
                        username: username,
                        password: password,
                        grant_type: "password",
                        provider: "admin",
                        client_id: '1',
                        client_secret: clientsecret
                    };
                let response = this.$axios.$post(resource, formData).then((resp) => {
                    let access_token = resp.access_token;
                    let token_type = resp.token_type;
                    Cookie.set('adminauth', access_token)
                    if (this.$store.state.debug) alert('redirecting...')
                    this.$store.commit('updateAdminToken', access_token)
                    this.$router.push('/admin/')
                }).catch((resp) => {
                    if (this.$store.state.debug) alert('error!')
                    if (this.$store.state.debug) console.log(resp)
                })
            }
        }
    }
</script>