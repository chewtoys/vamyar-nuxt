<template>
  <div>
    <v-card :to="getLink" white raised light ripple hover>
      <v-card-title>
        <section>
          <div class="full">
            <b>{{ item.title }}</b>
            <v-icon class="pb-1 left">bookmark</v-icon>
          </div>
          <v-container fluid>
            <v-layout row wrap class="deep-purple--text font-11">
              <v-flex lg6 xs12>
                <div>
                  <div class="red--text">
                    <v-icon class="font-14 pb-1 pl-1">monetization_on</v-icon>
                    <u class="red--text">{{ item.advertable.amount }}</u>
                  </div>
                  <div>
                    <v-icon class="font-14 pb-1 pl-1">keyboard_arrow_left</v-icon>
                    <span>{{ item.advertable.loanTypeId }}</span>
                  </div>
                  <div>
                    <v-icon class="font-14 pb-1 pl-1">location_on</v-icon>
                    <span>{{ item.provinceId }}</span>
                  </div>
                </div>
              </v-flex>
              <v-flex lg6 xs12>
                <div>
                  <div>
                    <v-icon class="font-14 pb-1 pl-1">how_to_reg</v-icon>
                    <span>{{ item.advertable.guaranteeTypeId }}</span>
                  </div>
                  <div>
                    <v-icon class="font-14 pb-1 pl-1">redo</v-icon>
                    <span>{{ item.advertable.paybackTime }}</span>
                  </div>
                  <div>
                    <v-icon class="font-14 pb-1 pl-1">today</v-icon>
                    <i>{{ item.jCreatedAt }}</i>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 class="text-left full">
            <div class="text-justify">{{ item.text }}</div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions align-end>
        <v-icon>touch_app</v-icon>
        <v-spacer/>
        <v-btn outline small color="info">
          <b>مشاهده</b>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["item"],
  computed: {
    getLink: function() {
      return "/categories/loans/show/" + this.item.advertable.id
    }
  }
}
</script>
