<template>
  <v-container>
    <v-layout>
      <v-card color="transparent" flat text-color="black">
        <v-card-text>
          <v-container grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card color="white">
                  <v-card-title>
                    <v-icon class="pl-1">flag</v-icon>
                    <h3>آموزش ها</h3>
                  </v-card-title>
                  <v-card-text>
                    <div v-html="settings('pages.educationText')"></div>
                  </v-card-text>
                  <v-divider/>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex v-for="item in 14" :key="item" xs12 sm6 md4>
                <v-card>
                  <v-card-title><h3>عنوان آیتم</h3></v-card-title>
                  <v-card-media
                    :src="src"
                    height="300"
                  />
                  <v-card-text>
                    <div>{{ lorem }}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :to="'/education/' + item" color="info" outline round>
                      <span>مشاهده ی مطالب</span>
                      <v-icon class="pr-1">keyboard_arrow_left</v-icon>
                    </v-btn>

                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    meta: {
      title: "آموزش ها"
    },
    data() {
      return {
        src: "http://placehold.it/600x300",
        lorem:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
      }
    }, methods: {
      settings(key) {
        return _.get(this.$store.state.settings.data, key, '')
      }
    }
  }
</script>
