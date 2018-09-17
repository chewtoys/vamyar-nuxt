<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_left</v-icon>
      <v-breadcrumbs-item
        v-for="_item in _items"
        :disabled="_item.disabled"
        :key="_item.text"
        :href="_item.to"
      >
        {{ _item.text }}



      </v-breadcrumbs-item>
      <v-breadcrumbs-item
        v-for="item in items"
        :disabled="item.disabled"
        :key="item.text"
        href="./"

      >
        {{ item.text }}

      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  computed: {
    _items() {
      return [
        {
          text: "پنل مدیریت",
          disabled: false,
          to: "/admin"
        }
      ]
    },
    items() {
      return this.$store.state.page.breadcrumb
    }
  }
}
</script>
