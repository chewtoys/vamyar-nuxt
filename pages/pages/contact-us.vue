<template>
  <v-container grid-list>
    <v-card>
      <v-layout row wrap reverse>
        <v-flex xs12 md6 fill>
          <v-card light color="brown lighten-5" height="100%">
            <v-card-title>
              <h2>
                <v-icon class="pb-2 pl-1">email</v-icon>
              <span>پیشنهادات، شکایات و انتقادات</span></h2>
            </v-card-title>
            <v-card-text>
              <div>{{ lorem }}</div>
              <br>
              <v-divider/>
              <br>
              <form>
                <v-text-field
                  v-validate="'required'"
                  v-model="name"
                  :error-messages="errors.collect('name')"
                  box
                  light
                  label="نام"
                  data-vv-name="name"
                  required
                />
                <v-text-field
                  v-validate="'email'"
                  v-model="email"
                  :error-messages="errors.collect('email')"
                  box
                  light
                  label="پست الکترونیک"
                  data-vv-name="email"
                  required
                />
                <v-textarea
                  v-validate="'required'"
                  v-model="text"
                  box
                  light
                  solo
                  required
                  label="متن خود را اینجا بنویسید"
                  data-vv-name="text"
                />
                <v-btn outline round color="blue" flat @click="submit">
                  ثبت
                  <v-icon class="pr-1 font-19 pb-1">save</v-icon>
                </v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card flat>
            <v-card-title>
              <h2>
                <v-icon class="pb-2">location_on</v-icon>
                <span>ارتباط با ما</span>
              </h2>
            </v-card-title>
            <v-card-text>
              <div>{{ lorem }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
export default {
  meta: {
    title: "درباره‌ی ما"
  },
  layout: "site",
  data: () => ({
    text: "",
    name: "",
    email: "",
    checkbox: null,
    dictionary: {
      attributes: {
        email: "آدرس ایمیل",
        name: "نام",
        text: "متن"
        // custom attributes
      }
    }
  }),
  computed: {
    lorem() {
      return this.$store.state.temp.lorem
    }
  },
  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("fa", this.dictionary)
  },
  methods: {
    submit() {
      this.$validator.validateAll()
    },
    clear() {
      this.name = ""
      this.email = ""
      this.select = null
      this.checkbox = null
      this.$validator.reset()
    }
  }
}
</script>
