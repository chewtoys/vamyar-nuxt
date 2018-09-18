<template>
  <div>
    <v-card color="grey lighten-4">

      <v-card-text>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="white">
                <v-card-media
                  :src="src"
                  height="400px"
                />
                <v-card-title>
                  <v-icon class="pl-1">flag</v-icon>
                  <h3>آموزش خاص</h3>
                </v-card-title>
                <v-card-text>
                  <div>{{ lorem }}</div>
                </v-card-text>
                <v-divider/>
                <v-card-actions class="ltr">
                  <Copy/>
                </v-card-actions>
                <v-divider/>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Copy from "~/components/site/buttons/CopyUrl.vue"
export default {
  meta: {
    title: "آموزش "
  },
  components: { Copy },
  data() {
    return {
      src: "http://placehold.it/600x300",
      lorem:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
    }
  },
  asyncData({ params }) {
    let item = params.item
    let slug = params.slug
    return { item, slug }
  },
  computed: {
    path() {
      return this.item
    }
  },
  mounted() {
    //console.log(this.slug, this.item)
  }
}
</script>
