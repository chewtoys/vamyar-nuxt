<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-list-tile
        :key="item.title"
        avatar
        ripple
        :to="item.link"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">{{ item.price }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ item.type }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
          <v-icon
            v-if="selected.indexOf(index) < 0"
            color="grey lighten-1"
          >
            star_border
          </v-icon>
          <v-icon
            v-else
            color="yellow darken-2"
          >
            eye
          </v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider
        v-if="index + 1 < items.length"
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>
<script>
  export default {
    props: ['items']
  }
</script>
