<template>
  <div>
    <v-breadcrumbs v-if="meta && meta.length > 0">
      <v-icon slot="divider">chevron_left</v-icon>

      <v-breadcrumbs-item
        v-for="(item,i ) in meta"
        v-if="item && item.breadcrumb"
        :disabled="!item.link"
        :to="item.link"
        :key="i"
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
