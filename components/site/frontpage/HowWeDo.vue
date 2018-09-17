<template>
  <v-container fluid>
    <v-subheader>
      {{ title }}
    </v-subheader>
    <div style="background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);">
      <v-card class="transparent frontpage howwedo pt-5 pb-5 px-5">
        <v-layout align-center justify-center class="my-4" row>
          <v-flex xs12 sm6 offset-sm1>
            <div v-for="item in items" :key="item.title" class="mt-1 mb-2 text-xs-right">
              <div class="deep-purple--text text-xs-right">
                <h3 class="font-17">{{ item.title }}</h3>
              </div>
              <div>
                <p class="font-14 grey--text text-xs-right">{{ item.desc }}</p>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card class="cyan" height="300px">
              <div class="transparent white--text text-xs-center">
                <h1>کلیپ</h1>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  computed: {
    title: function() {
      return "چه کارهایی در وامیار انجام می شود؟"
    },
    items: function() {
      return [
        {
          img: "https://randomuser.me/api/portraits/men/64.jpg",
          title: "مورد اول",
          desc:
            "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
        },
        {
          img: "https://randomuser.me/api/portraits/men/99.jpg",
          title: "مورد دوم",
          desc:
            "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
        },
        {
          img: "https://randomuser.me/api/portraits/men/51.jpg",
          title: "مورد سوم",
          desc:
            "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
        }
      ]
    }
  }
}
</script>
