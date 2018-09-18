<template>
  <v-card :to="getLink" white raised light ripple hover>
    <v-card-title>
      <div class="full">
        <b>{{ item.title }}</b>
        <v-icon class="pb-1 left">bookmark</v-icon>
      </div>
      <v-layout row wrap class="deep-purple--text font-11">
        <v-flex lg6 xs12>
          <div>
            <div class="red--text">
              <v-icon class="font-14 pb-1 pl-1">monetization_on</v-icon>
              <u class="red--text">{{ item.price }}</u>
            </div>
            <div>
              <v-icon class="font-14 pb-1 pl-1">keyboard_arrow_left</v-icon>
              <span>{{ item.loan_type }}</span>
            </div>
            <div>
              <v-icon class="font-14 pb-1 pl-1">location_on</v-icon>
              <span>{{ item.city }}</span>
            </div>
          </div>
        </v-flex>
        <v-flex lg6 xs12>
          <div>
            <div>
              <v-icon class="font-14 pb-1 pl-1">how_to_reg</v-icon>
              <span>{{ item.security }}</span>
            </div>
            <div>
              <v-icon class="font-14 pb-1 pl-1">redo</v-icon>
              <span>{{ item.payback }}</span>
            </div>
            <div>
              <v-icon class="font-14 pb-1 pl-1">today</v-icon>
              <i>{{ item.date }}</i>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 class="text-left full">
          <div class="text-justify">{{ item.text }}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions align-end>
      <v-icon class="green--text darken-4 pl-1">shopping_cart</v-icon>
      <span class="green--text">{{ item.price }}</span>
      <v-spacer/>
      <v-btn outline small color="info">
        <b>مشاهده</b>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["item"],
  computed: {
    getLink: function() {
      return "/categories/loan/show/" + this.item.id
    }
  }
}
</script>
