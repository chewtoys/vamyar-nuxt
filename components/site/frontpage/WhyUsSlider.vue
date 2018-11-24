<template>
  <v-container v-if="show" fluid grid-list-sm>
    <v-card class="categories pt-5 pb-5 px-2">

      <v-card-title>
        <h2 class="full text-xs-center">چرا ما؟</h2>
        <v-spacer></v-spacer>

      </v-card-title>
      <v-card-text class="py-0">
        <v-timeline dense>
          <v-slide-x-reverse-transition
            group
            hide-on-leave
          >
            <v-timeline-item
              v-for="item in items"
              :key="item.id"
              :color="item.color"
              small
              fill-dot
            >
              <v-alert
                :value="true"
                :color="item.color"
                :icon="item.icon"
              >
                <b class="px-1">{{item.title || 'کاربر'}}</b>
                <br/>
                <div class="px-1" v-html="nl2br(item.desc || 'توضیحات')"></div>
              </v-alert>
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  import Helper from '~/assets/js/helper'

  const COLORS = [
    'info',
    'warning',
    'error',
    'success'
  ]
  const ICONS = {
    info: 'person_pin',
    warning: 'person_pin',
    error: 'person_pin',
    success: 'person_pin'
  }

  export default {
    data: () => ({
      show: false,
      interval: null,
      items: [{
        id: 1,

        color: 'info',
        icon: ICONS['info']
      }],
      allItems: [],
      nonce: 2
    }),
    beforeDestroy() {
      this.stop()
    },

    methods: {
      nl2br(text) {
        return Helper.nl2br(text)
      },
      getItems() {
        return this.settings('frontpage.whyUs', [])
      },
      settings(key, def = '') {
        return _.get(this.$store.state.settings.data, key, def)
      },
      addEvent() {
        let count = this.allItems.length;
        let activeItemsCount = this.items.length;
        let lastId = _.get(this.allItems, [count - 1, 'id']);
        let lastActiveItemId = _.first(this.items).id;
        let allowableCountForShow = count > 4 ? 4 : count - 1;

        let newItemId = lastActiveItemId === lastId ? 1 : lastActiveItemId + 1;
        let newItem = _.find(this.allItems, {id: newItemId});
        let items = this.items
        //console.log({          count, lastId, activeItemsCount, lastActiveItemId, newItemId, newItem, items});
        this.items.unshift(newItem);

        if (activeItemsCount >= allowableCountForShow) {
          this.items.pop()
        }

      },
      start() {
        this.interval = setInterval(this.addEvent, 5000)
      },
      stop() {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    mounted() {
      if (_.isArray(this.allItems) && this.allItems.length > 0) {
        this.allItems = this.getItems();
        _.forEach(this.allItems, (value, index) => {
          let colorIndex = index % 4;
          let color = COLORS[colorIndex]
          _.set(this.allItems, [index, 'icon'], ICONS[color])
          _.set(this.allItems, [index, 'id'], index + 1)
          _.set(this.allItems, [index, 'color'], color)
        })
        this.items = [_.first(this.allItems)];
        //console.log(this.allItems, this.items);
        this.start();
        this.show = true;
      }
    }
  }
</script>
