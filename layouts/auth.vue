<template>
    <v-app>
        <v-content>
            <ToolBar/>
            <nuxt/>
        </v-content>
    </v-app>
</template>

<script>
    import ToolBar from '~/components/site/ToolBar.vue';
    export default {
        data()  {
            return {
                title: ""
            }
        },
        components: {
            ToolBar
        },
        computed: {}
    }
</script>
<style>

</style>
