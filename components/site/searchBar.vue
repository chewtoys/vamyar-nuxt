<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    clearable
    flat
    :dark="isDark"
    :color="getColor"
    item-text="name"
    item-value="link"
    :label="label"
    @change="goTo"
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
      <v-list-tile flat>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="item.type"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-autocomplete>

</template>
<script>
  import Helper from '~/assets/js/helper'

  export default {
    props: ['placeholder', 'subtext', 'dark', 'color'],
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
        setTimeout(() => {
          if (val !== this.search) {
            return null
          }
        }, 300)
        this.isLoading = true
// Lazily load input items
        //adverts?filter=title=exampleTitle,text=exampleTitle
        //posts?filter=title=exampleTitle,text=exampeTitle

        let query = {
          params: {
            filter: `title=${val},text=${val}`
          }
        }

        this.$axios.$get('site/adverts', query)
          .then(res => {
            //console.log(res.data)
            _.forEach(res.data, (item, x) => {
              if (x < 10) {
                let type = Helper.getTypeByAdvertType(item.advertableType);
                let link = `/categories/${type.alias}/show/${item.advertableId}`
                this.items.push({name: item.title, type: type.title, id: item.id, link})
              }
            })
          })
          .catch(err => {
            //console.log(err)
          })
          .finally(() => {

            let contentQuery = {
              params: {
                filter: `title=${val},text=${val}`,
                include: 'categories'
              }
            }

            this.$axios.$get('site/posts', contentQuery)
              .then(res => {
                //console.log(res.data)
                _.forEach(res.data, (item, x) => {
                  if (x < 10) {
                    let link = `/posts/show/${item.slug}`
                    this.items.push({
                      name: item.title,
                      type: _.join(_.map(item.categories, 'name') || ['مطالب و محتوا'], ' ,'),
                      id: item.id,
                      link
                    })
                  }
                })
              })
              .catch(err => {
                //console.log(err)
              })
              .finally(() => {
                this.isLoading = false;
                if (this.items.length < 1) {
                  this.$store.commit('snackbar/setSnack', 'متاسفانه نتیجه ای یافت نشد :(');
                }
              })
          })
      }

    },
    methods: {
      link(item) {
        return `
        /item/${item.id}`
      },
      goTo(to) {
        if (to) this.$router.push(to);
      }
    }
  }
</script>
