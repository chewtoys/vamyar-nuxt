<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6>
        <v-card to="/posts/news" ripple raised>
          <v-card-title>خبرها</v-card-title>
          <v-card-text>
            <p>در این قسمت جدیدترین اخبار و اطلاعیه های سایت وامیار قرار خواهد گرفت.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success">
              <v-icon class="px-1">touch_app</v-icon>
              جهت مشاهده کلیک کنید
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card to="/posts/instructions" ripple raised>
          <v-card-title>آموزش ها</v-card-title>
          <v-card-text>
            <p>در این قسمت آموزش هایی جهت کار با اپلیکیشن و  سایت وامیار قرار خواهد گرفت.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success">
              <v-icon class="px-1">touch_app</v-icon>
              جهت مشاهده کلیک کنید
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    meta: {
      title: 'اخبار و آموزش سایت ',
      breadcrumb: "محتوا"
    },
  }
</script>
