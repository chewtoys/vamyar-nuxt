<template>
    <v-app>
        <ToolBar/>
        <v-content>
            <v-container fluid>
                <Breadcrumb/>
                <nuxt/>
            </v-container>
        </v-content>
        <Footer/>
    </v-app>
</template>
<script>
    import Breadcrumb from '~/components/user/Breadcrumb.vue'
    import ToolBar from '~/components/user/ToolBar.vue'
    import Footer from '~/components/user/Footer.vue'
    export default {

        middleware: ["authenticated", "navigation"],
        components: {
            ToolBar, Footer, Breadcrumb
        }
    }
</script>