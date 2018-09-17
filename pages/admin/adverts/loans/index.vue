<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-card class="pa-5" light color=" cyan darken-4">
        <div class="text-xs-right">
          <h2 class="white--text">
            <v-icon class="white--text font-24 pb-2 pl-1">filter_list</v-icon>
            <span>لیست وام های ثبت شده</span>
          </h2>
        </div>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12>
      <v-card>
        <v-container grid-list-lg fluid>
          <v-layout row wrap>
            <v-flex
              v-for="n in 12"
              :key="n"
              xs6
              sm4
              md3
              lg3
              xl2
            >
              <v-card :to="getLink(n)" tile color="grey lighten-4">
                <v-card-title>

                  <div class="full">
                    <b>عنوان آگهی</b>
                    <v-icon class="pb-1 left">bookmark</v-icon>
                  </div>
                  <v-layout row wrap class="deep-purple--text font-11">
                    <v-flex lg6 xs12>
                      <div>
                        <div class="red--text">
                          <v-icon class="font-14 pb-1 pl-1">monetization_on</v-icon>
                          <u class="red--text">2,000,000 ریال</u>
                        </div>
                        <div>
                          <v-icon class="font-14 pb-1 pl-1">keyboard_arrow_left</v-icon>
                          <span>بازدپرداخت</span>
                        </div>
                        <div>
                          <v-icon class="font-14 pb-1 pl-1">location_on</v-icon>
                          <span>شهر</span>
                        </div>
                      </div>
                    </v-flex>
                    <v-flex lg6 xs12>
                      <div>
                        <div>
                          <v-icon class="font-14 pb-1 pl-1">how_to_reg</v-icon>
                          <span>نوع ضمانت</span>
                        </div>
                        <div>
                          <v-icon class="font-14 pb-1 pl-1">redo</v-icon>
                          <span>بازدپرداخت وام</span>
                        </div>
                        <div>
                          <v-icon class="font-14 pb-1 pl-1">today</v-icon>
                          <i>7 بهمن 97 ساعت 3:09</i>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <v-card-text>
                  <div class="text-justify">
                  <p>متن آگهی</p></div>
                </v-card-text>
                <v-card-actions class="text-left full">
                  <v-spacer/>
                  <v-btn :to="getLink(n)" small color="info" info>
                    <v-icon>touch_app</v-icon>
                    <span>مشاهده</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12>
      <v-card class="pa-5" color="grey lighten-5">
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="15"
            :total-visible="7"
          />
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    size: "sm",
    items: [
      { text: "Extra small (2px)", value: "xs" },
      { text: "Small (4px)", value: "sm" },
      { text: "Medium (8px)", value: "md" },
      { text: "Large (16px)", value: "lg" },
      { text: "Extra large (24px)", value: "xl" }
    ]
  }),
  methods: {
    getLink(id) {
      return "/admin/adverts/loans/show/" + id
    }
  }
}
</script>
