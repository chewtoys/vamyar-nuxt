<template>

  <v-card
    class="mx-auto"
  >
    <v-card-title
      class="blue-grey white--text"
    >
      <span class="title">چرا ما؟</span>
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
              <b>{{item.title || 'کاربر'}}</b>
              <br/>
              {{ item.desc || 'توضیحات'}}
            </v-alert>
          </v-timeline-item>
        </v-slide-x-reverse-transition>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
  const COLORS = [
    'info',
    'warning',
    'error',
    'success'
  ]
  const ICONS = {
    info: 'mdi-information',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
    success: 'mdi-check-circle'
  }

  export default {
    data: () => ({

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
        console.log({
          count, lastId, activeItemsCount, lastActiveItemId, newItemId, newItem, items
        });
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
      this.allItems = this.getItems();
      _.forEach(this.allItems, (value, index) => {
        let colorIndex = index % 4;
        let color = COLORS[colorIndex]
        _.set(this.allItems, [index, 'icon'], ICONS[color])
        _.set(this.allItems, [index, 'id'], index + 1)
        _.set(this.allItems, [index, 'color'], color)
      })
      this.items = [_.first(this.allItems)];
      console.log(this.allItems, this.items);
      this.start();
    }
  }
</script>
