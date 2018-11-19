<template>
  <v-card>
    <v-card-title>
      <h3>پلن ها</h3>
    </v-card-title>
    <v-card-text>
      <div v-html=" text ">
      </div>
      <table>
        <tr>
          <th>عنوان پلن ها</th>
        </tr>
        <tr>
          <td>
            <v-btn round class="warning" to="/user/premium">فعال سازی</v-btn>
          </td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    meta: {
      title: 'مشاهده‌ی پلن ها',
      breadcrumb: 'پلن ها'
    },
    data() {
      return {}
    },
    computed: {
      text() {
        return this.$store.state.temp.lorem
      }
    }
  }
</script>
