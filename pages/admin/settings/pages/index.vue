<template>
  <div>
    <v-card color="white" raised light class="mt-5 py-5 px-4">
      <v-card-title>
        <v-icon class="px-1">{{ icon }}</v-icon>
        <h3>{{ title }}</h3>
        <v-spacer/>
        <v-btn color="success" outline round large to="./create">صفحه ی جدید </v-btn>
      </v-card-title>
      <v-card-text>
        <v-layout row>
          <v-divider class="my-3"/>
          <v-flex xs12 md12 sm12 lg12>
            <div>
              <v-data-table
                :headers="headers"
                :items="desserts"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.calories }}</td>
                  <td class="text-xs-right">{{ props.item.fat }}</td>
                  <td class="text-xs-right">{{ props.item.carbs }}</td>
                  <td class="text-xs-right">{{ props.item.protein }}</td>
                  <td class="justify-center layout px-0">
                    <v-icon
                      :to="'./edit/'+item.id"
                      small
                      class="mr-2"
                    >
                      edit




                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(item)"
                    >delte
                    </v-icon>
                  </td>
                </template>
                <template slot="no-data">
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
              </v-data-table>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
const page = { title: "لیست صفحات دلخواه سایت", icon: "flag" }
export default {
  meta: {
    breadcrumb: "نویگیشن",
    title: page.title
  },
  layout: "admin",
  data() {
    return {
      icon: page.title,
      title: page.icon,

      // table
      dialog: false,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Actions", value: "name", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
      //end table
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  async asyncData() {
    let items = [
      {
        id: 1,
        slug: ""
      }
    ]
    return { items }
  },
  methods: {
    // form
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
