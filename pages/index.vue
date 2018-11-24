<template>
  <div>
    <Header/>
    <LastAdverts path="/site/loans" title="آخرین وام های فروشی و مشارکتی" number="12" link="/categories/loans"/>
    <LastAdverts path="/site/coSigners" title="آخرین ضامن ها" number="12" link="/categories/co-signers"/>
    <LastAdverts path="/site/finances" title="آخرین سرمایه گذارها" number="12" link="/categories/fiances"/>
    <HowWeDo/>
    <WhyUsSlider/>
    <onMedia/>
    <Footer/>
  </div>
</template>

<script>
  import Header from "~/components/site/frontpage/Header.vue"
  import onMedia from "~/components/site/frontpage/onMedia.vue"
  import WhyUsSlider from "~/components/site/frontpage/WhyUsSlider.vue"
  import HowWeDo from "~/components/site/frontpage/HowWeDo.vue"
  import Search from "~/components/site/frontpage/Search.vue"
  import Categories from "~/components/site/frontpage/Categories.vue"
  import Footer from "~/components/site/Footer.vue"
  import LastAdverts from "~/components/site/frontpage/LastAdverts.vue"

  //import Slider from '~/components/site/frontpage/Slider.vue'

  const title = "صفحه نخست",
    breadcrumb = "صفحه نخست"

  export default {
    meta: {
      title,
      breadcrumb,
      link: "/"
    },
    layout: "frontpage",
    components: {
      Header,
      onMedia,
      HowWeDo,
      Categories,
      LastAdverts,
      WhyUsSlider,
      Footer,
      Search
    }
  }
</script>
