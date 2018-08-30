<template>
    <v-container grid-list fluid>
        <nuxt-child :key="$route.params.id" />
    </v-container>
</template>
<script>
    export default {
        //components: {NuxtChild},
    }
</script>