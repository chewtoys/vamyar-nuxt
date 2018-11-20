<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-subheader>
              پروفایل شما
            </v-subheader>
          </v-card-title>
          <v-progress-linear v-if="loader" :indeterminate="true"/>
          <v-card-text>
            <v-chip color="info" text-color="white">
              کل آگهی ها
              <v-avatar class="info darken-4">۲۳</v-avatar>
            </v-chip>
            <v-chip color="success" text-color="white">
              آگهی های تایید شده
              <v-avatar class="success darken-4">۲۰</v-avatar>
            </v-chip>
            <v-chip color="orange" text-color="white">
              تیکت ها

              <v-avatar class="orange darken-4">۱۰</v-avatar>
            </v-chip>
            <v-chip color="danger" text-color="white">
              مشاوره ها
              <v-avatar class="danger darken-4">۴۲</v-avatar>
            </v-chip>

          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <v-subheader>
              دسترسی سریع
            </v-subheader>
          </v-card-title>
          <v-progress-linear v-if="loader" :indeterminate="true"/>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6 sm4 lg2 v-for="item in links" :key="item.id">
                <v-btn
                  large
                  round
                  dark
                  outline
                  ripple
                  block
                  :to="item.link"
                  :color="item.color"
                >
                  <v-icon class="px-1">{{item.icon || 'note_add' }}</v-icon>
                  {{item.title}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <v-subheader>
              آخرین آگهی های شما
            </v-subheader>
          </v-card-title>
          <v-progress-linear v-if="loader" :indeterminate="true"/>
          <v-card-text>

            <v-list-tile v-for="item in rawData" :key="item.id">
              <span>{{item.title}}</span>
            </v-list-tile>

          </v-card-text>
        </v-card>


      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  const path = "/user/adverts"
  export default {
    components: {},
    data() {
      return {
        loader: false,
        rawData: [],
        rawAdverts: []
      }
    },
    computed: {
      links() {
        return [
          {title: 'ثبت وام', color: 'blue', link: '/adverts/loans/create', icon: 'note_add'},
          {title: 'ثبت درخواست وام', color: 'blue', link: '/adverts/loan-requests/create', icon: 'note_add'},
          {title: 'ثبت ضامن', color: 'blue', link: '/adverts/co-signers/create', icon: 'note_add'},
          {title: 'ثبت درخواست ضامن', color: 'blue', link: '/adverts/co-signer-requests/create', icon: 'note_add'},
          {title: 'ثبت سرمایه', color: 'blue', link: '/adverts/finances/create', icon: 'note_add'},
          {title: 'ثبت وام', color: 'blue', link: '/adverts/finance-requests/create', icon: 'note_add'},
        ]
      },
      adverts() {
        return this.rawData
      }
    },
    mounted() {
      this.loader = true
      this.$axios
        .get(path)
        .then(response => {
          this.rawData = response.data;
          this.loader = false
        })
        .catch(err => {
          this.$store.commit("snackbar/setSnack", err.message)
          this.rawData = [];
          this.loader = false
        })
    }
  }
</script>
