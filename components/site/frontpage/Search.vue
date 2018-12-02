<template>
  <v-container fluid >
    <v-subheader>
      {{ title }}
    </v-subheader>
    <v-card class="full">
      <v-card-text>
        <SearchBar :dark="false" placeholder="چیزی بنویسید..."/>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  import SearchBar from "~/components/site/searchBar.vue"

  const title = "جست و جو کنید"
  export default {
    components: {
      SearchBar
    },
    data() {
      return {
        title,
      }
    },
    mounted() {
    }
  }
</script>
