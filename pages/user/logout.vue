<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            خروج از پروفایل
          </v-card-title>
          <v-card-text>
            <v-btn :loading="loading" outline round color="primary" @click="logout">
              <v-icon>lock</v-icon>
              خروج
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const page = { title: "خروج از مدیریت", icon: "lock_open" }
export default {
  meta: {
    breadcrumb: "خروج",
    title: page.title
  },
  data() {
    return {
      loading: false,
      page
    }
  },
  layout: "user",
  methods: {
    logout() {
      this.loading = true
      setTimeout(() => {
        this.$store.dispatch("user/logout")
        this.$router.push("/user")
      }, 2000)
    }
  }
}
</script>
