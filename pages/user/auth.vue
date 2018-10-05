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
              v-if="showPanel=='login'"
              :value="true"
              type="success"
            ><span class="px-1">لطفا مشخصات خود را در زیر وارد کنید. </span></v-alert>
            <v-alert
              v-if="showPanel=='register'"
              :value="true"
              type="info"
            ><span class="px-1">لطفا شماره‌ی خود را وارد کنید و با کد دریافتی وارد پنل شوید.</span>
            </v-alert>
            <v-alert
              v-if="showPanel=='forget'"
              :value="true"
              type="primary"
            ><span class="px-1">لطفا شماره‌ی خود را وارد کنید تا رمز جدید را دریافت کنید.</span>
            </v-alert>
            <v-alert
              v-if="success !== null "
              :value="true"
              type="success"
            ><span class="px-1">{{ success }}</span></v-alert>
            <v-alert
              v-if="error !== null "
              :value="true"
              type="error"
            ><span class="px-1">{{ error }}</span></v-alert>
            <v-card-text class="py-5 mb-4 px-4 text-center">
              <div v-if="showPanel=='login'">
                <v-form>
                  <v-text-field v-model="formUsername" prepend-icon="person"
                                name="formUsername"
                                counter
                                maxlength="11"
                                label="نام کاربری"
                                type="text"/>
                  <v-text-field id="formPassword" v-model="formPassword" prepend-icon="lock"
                                name="formPassword"
                                label="رمز عبور"
                                type="password"/>
                  <br>
                  <div class="my-3">
                    <v-btn :disabled="loginBtn" :loading="loginLoader" color="primary" outline class="my-3"
                           @click="login"><span>ورود</span>
                      <v-icon class="px-1">lock_open</v-icon>
                    </v-btn>
                  </div>
                  <br>
                </v-form>
              </div>
              <div v-if="showPanel=='register'">
                <v-form>
                  <v-text-field
                    v-model="formMobile"
                    prepend-icon="phone"
                    name="formMobile"
                    label="شماره همراه"
                    counter
                    maxlength="11"
                    minlength="11"
                    type="text"/>
                  <v-text-field id="formPassword"
                                v-model="formNewPassword"
                                prepend-icon="lock"
                                name="formNewPassword"
                                label="رمز عبور"
                                type="password"/>

                  <v-text-field v-if="sms_sent" v-model="formCode" prepend-icon="textsms"
                                name="formCode"
                                label="کد دریافت شده"
                                type="text"/>
                  <br>
                  <div class="my-3">
                    <v-btn v-if="!sms_sent" :disabled="formMobile.length!=11" color="primary"
                           outline @click="sendCode">
                      <span>ارسال کد</span>
                      <v-icon class="px-1">sms</v-icon>
                    </v-btn>
                    <v-btn v-if="sms_sent" :disabled="pending" color="primary" outline
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
              <div v-if="showPanel=='forget'">
                <v-form>
                  <v-text-field
                    v-model="forgetMobile"
                    prepend-icon="phone"
                    name="forgetPhone"
                    label="شماره همراه"
                    counter
                    maxlength="11"
                    minlength="11"
                    type="text"/>
                  <br>
                  <div class="my-3">
                    <v-btn v-if="!sms_sent" :loading="forgetLoading" :disabled="forgetPhone.length!=11" color="primary"
                           outline @click="sendForget">
                      <span>ارسال رمز</span>
                      <v-icon class="px-1">sms</v-icon>
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
              <v-btn flat color="success" @click="showPanel = 'login'">
                <span>ورود</span>
                <v-icon>lock</v-icon>
              </v-btn>
              <v-btn flat color="info" @click="showPanel = 'register'">
                <span>ثبت نام سریع</span>
                <v-icon>phonelink_lock</v-icon>
              </v-btn>
              <v-btn flat color="default" @click="showPanel = 'forget'">
                <span>فراموشی رمز عبور</span>
                <v-icon>sms</v-icon>
              </v-btn>
            </v-bottom-nav>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
  import Cookie from "js-cookie"
  //import axios from 'axios'
  let register_path = "/user/register",
    verify_path = "/user/register/verify-mobile",
    login_path = "/oauth/token",
    forget_path = "/user/password"
  export default {
    layout: "auth",
    data() {
      return {
        formUsername: null,
        formPassword: null,
        loginLoader: false,
        forgetLoading: false,
        formCode: null,
        formMobile: "",
        forgetMobile: "",
        formNewPassword: "",
        sms_sent: false,
        auth: null,
        activeBtn: 0,
        showNav: true,
        showPanel: "login",
        pending: true,
        success: null,
        error: null,
        forgetLoader: false,
        forgetPhone: ""
      }
    },
    middleware: "notAuthenticated",
    computed: {
      loginBtn() {
        return !this.formUsername || !this.formPassword
      }
    },
    methods: {
      msgError(msg) {
        this.error = msg
        this.success = null
      },
      msgSuccess(msg) {
        this.error = null
        this.success = msg
      },
      backHome: function () {
        this.$router.push("/")
      },
      sendForget: function () {
        this.forgetLoader = true
        let data = {
          mobile: this.forgetPhone
        }
        this.$axios.post(forget_path, data).then(() => {
          let status = true
          if (status) {
            this.msgSuccess("برای شما ارسال شد.")
            this.forgetLoader = false
          } else {
            this.msgError("مشکلی در ارسال پیش آمد. شماره‌ی خود را بررسی کنید.")
            this.forgetLoader = false
          }
        })
      },
      sendCode: function () {
        let resource = register_path
        let username = this.formMobile
        let password = this.formNewPassword
        let client_secret = this.$store.state.secret
        let client_id = 1
        let formData = {
          username,
          password,
          password_confirmation: password,
          client_secret,
          client_id
        }
        let response = this.$axios
          .post(resource, formData)
          .then(resp => {
            let message = 'کد با موفقیت برای شما ارسال شد.';
            this.msgSuccess(message)
          })
          .catch(res => {
            //console.log(res.response)
            let {status, error} = res.response
            let message = "متاسفانه مشکلی در ارتباط با سرور پیش آمد."
            if (res.response && res.response.data && res.response.data.error && res.response.data.error.message.mobile) {
              message = res.response.data.error.message.mobile;
            } else {
              message = 'این شماره معتبر نمی باشد. ممکن است قبلا با این شماره ثبت نام کرده باشید.';
            }
            this.msgError(message)
          })

        this.pending = true
        setTimeout(() => {
          this.pending = false
        }, 10000)
        this.sms_sent = true
      },
      checkCode: function () {
        let verification_code = this.formCode
        if (verification_code.length > 3) {
          this.$axios
            .post(verify_path, {
              verificationCode: verification_code
            })
            .then(res => {
              this.msgSuccess("کد شما بررسی شد")
              this.formUsername = this.formMobile
              this.formPassword = this.formNewPassword
              return this.login()
            })
            .catch((error) => {
              //console.log(error, error.response);
              this.msgError((error.response.data.error.message || ( "مشکلی پیش آمد!" + error )))
            })
        }
      },
      login: function () {
        this.loginLoader = true
        let resource = login_path
        let username = this.formUsername
        let password = this.formPassword
        let clientsecret = this.$store.state.secret
        let formData = {
          username: username,
          password: password,
          grant_type: "password",
          provider: "users",
          client_id: "2",
          client_secret: clientsecret
        }
        this.$axios
          .$post(resource, formData, {mode: "no-cors"})
          .then(({access_token}) => {
            if (access_token) {
              Cookie.set("auth", access_token)
              this.$store.commit("user/updateToken", access_token)
              window.location = "/user"
              //this.$router.push('/user/')
            } else {
              this.msgError("مشخصات صحیح نمی باشد.")
            }
            this.loginLoader = false
          })
          .catch(error => {

            if (
              error &&
              error.response &&
              error.response.status === 401
            ) {
              if (error.response.data.error.message) {
                this.msgError(error.response.data.error.message)
              } else {
                this.msgError("مشخصات ورود صحیح نمی باشد.")
              }
            } else if (error && error.response && error.response.data.message) {
              this.msgError("مشکلی  پیش آمد:" + error.response.data.message)
            } else {
              this.msgError("مشکل در ارتباط با سرور")
            }
            this.loginLoader = false
          })
      }
    }
  }
</script>
