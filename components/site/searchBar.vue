<template>

  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    chips
    clearable
    hide-details
    hide-selected
    flat
    :dark="isDark"
    :color="getColor"
    item-text="name"
    item-value="symbol"
    :label="label"
    solo
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-title>
{{desc}}
        </v-list-tile-title>
      </v-list-tile>
    </template>
    <template
      slot="selection"
      slot-scope="{ item, selected }"
    >
      <v-chip
        :selected="selected"
        color="blue-grey"
        class="white--text"
      >
        <v-icon left>mdi-coin</v-icon>
        <span v-text="item.name"></span>
      </v-chip>
    </template>
    <template
      slot="item"
      slot-scope="{ item, tile }"
    >
      <v-list-tile flat :to="link(item)">
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-autocomplete>

</template>
<script>
  import axios from 'axios'

  export default {
    props: ['placeholder', 'subtext','dark','color'],
    data: () => ({
      isLoading: false,
      items: [],
      model: null,
      search: null
    }),
    computed: {
      label() {
        return _.get(this, 'placeholder', 'جست و جو...')
      },
      desc() {
        return _.get(this, 'subtext', 'جست و جو برای آگهی ها و مطالب')
      },
      isDark() {
        return _.get(this, 'dark', true)
      },
      getColor() {
        return _.get(this, 'color', '')
      }
    }
    ,
    watch: {
      search(val) {
// Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

// Lazily load input items
        axios.get('https://api.coinmarketcap.com/v2/listings/')
          .then(res => {
            this.items = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    },
    methods: {
      link(item) {
        return `/item/${item.id}`
      }
    }
  }
</script>
