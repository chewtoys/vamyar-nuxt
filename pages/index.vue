<template>
    <div>
        <Header/>
        <Slider/>
        <lastRequests/>
        <WhyUs/>
        <HowWeDo/>
        <Footer/>
    </div>
</template>

<script>
    import Header from '~/components/site/frontpage/Header.vue'
    import Slider from '~/components/site/frontpage/Slider.vue'
    import WhyUs from '~/components/site/frontpage/WhyUs.vue'
    import HowWeDo from '~/components/site/frontpage/HowWeDo.vue'
    import Categories from '~/components/site/frontpage/Categories.vue'
    import Footer from '~/components/site/Footer.vue'
    import lastRequests from '~/components/site/frontpage/last-requests.vue'
    export default {
        layout: 'frontpage',
        components: {
            Header, WhyUs, HowWeDo, Categories, Slider, lastRequests , Footer
        }
    }
</script>
