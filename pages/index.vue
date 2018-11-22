<template>
  <div>
    <Header/>
    <Search/>
    <LastAdverts/>
    <WhyUs/>
    <WhyUsSlider/>
    <HowWeDo/>
    <Footer/>
  </div>
</template>

<script>
  import Header from "~/components/site/frontpage/Header.vue"
  import WhyUs from "~/components/site/frontpage/WhyUs.vue"
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
      WhyUs,
      HowWeDo,
      Categories,
      LastAdverts,
      WhyUsSlider,
      Footer,
      Search
    }
  }
</script>
