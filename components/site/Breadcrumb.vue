<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_left</v-icon>

      <v-breadcrumbs-item
        v-for="(item,i ) in meta"
        :disabled="!item.link"
        :to="item.link"
        :key="i"
        v-if="item && item.breadcrumb"
      >
        {{ item.breadcrumb }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    computed: {
      meta() {
        return this.$store.state.navigation.meta
      }
    },
    mounted() {

    }
  }
</script>
