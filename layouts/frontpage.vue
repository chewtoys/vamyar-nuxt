<template>
    <v-app>
        <Toolbar/>
        <nuxt/>
    </v-app>
</template>
<script>
    import Toolbar from '~/components/site/ToolBar.vue'
    export default {
        components: {Toolbar},
        computed: {}
    }
</script>
