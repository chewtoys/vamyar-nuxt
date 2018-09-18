<template>

  <v-container fluid>
    <v-subheader>
      {{ title }}
    </v-subheader>
    <v-card class="frontpage whyus pt-5 pb-5 px-2">
      <v-layout align-center justify-center row>
        <v-flex v-for="item in items" :key="item.title" xs12 sm3>
          <div class="text-xs-center">
            <v-card-media
              :src="item.img"
              class="text-xs-center circle"
              style="height:100px;width:100px;margin: 10px auto"/>
            <div class="deep-purple--text text-xs-center">
              <h3>{{ item.title }}</h3>
            </div>
            <div class="grey--text text-xs-center">
              {{ item.desc }}
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
export default {
  computed: {
    title: function() {
      return "چرا ما؟"
    },
    items: function() {
      return [
        {
          img: "https://randomuser.me/api/portraits/men/64.jpg",
          title: "عنوان اول",
          desc:
            "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
        },
        {
          img: "https://randomuser.me/api/portraits/men/99.jpg",
          title: "عنوان دوم",
          desc:
            "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
        },
        {
          img: "https://randomuser.me/api/portraits/men/51.jpg",
          title: "عنوان سوم",
          desc:
            "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
        }
      ]
    }
  }
}
</script>
