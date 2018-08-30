<template>
    <v-app>
        <ToolBar/>
        <v-content>
            <v-container fluid>
                <Breadcrumb/>
                <nuxt/>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    import Breadcrumb from '~/components/admin/Breadcrumb.vue'
    import ToolBar from '~/components/admin/ToolBar.vue'
    import Footer from '~/components/admin/Footer.vue'
    export default {
        middleware: ["adminAuthenticated", "navigation"],
        components: {
            ToolBar, Footer, Breadcrumb
        }
    }
</script>