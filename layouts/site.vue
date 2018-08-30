<template>
    <v-app>
        <ToolBar/>
        <nuxt/>
        <Footer/>
    </v-app>
</template>

<script>
    import ToolBar from '~/components/site/ToolBar.vue';
    import Footer from '~/components/site/Footer.vue';
    export default {
        components: {
            ToolBar,
            Footer
        }
    }
</script>
<style>

</style>
