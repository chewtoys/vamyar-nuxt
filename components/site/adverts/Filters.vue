<template>
  <v-card class="elevation-0 pa-2" color="transparent" light>
    <v-layout rwo wrap>
      <v-flex xs12 sm4 class="pa-1">
        <div>
          <v-select
            :items="['فوری','همه']"
            v-model="instant"
            :loading="instantLoading"
            :menu-props="{contentClass:'farsi mx-3'}"
            label="فوری"
            light
            flat
            hide-details
            solo-inverted
            append-icon="list"
          />
        </div>
      </v-flex>
      <v-flex xs12 sm4 class="pa-1">
        <div>
          <v-autocomplete
            :menu-props="{contentClass:'farsi mx-3'}"
            :loading="city_loading"
            :items="city_items"
            :search-input.sync="city_search"
            v-model="city_select"
            append-icon="location_on"
            clearable
            light
            no-data-text="شهری یافت نشد"
            label="جست و جوی شهر"
            flat
            hide-no-data
            hide-details
            solo-inverted
          />
        </div>
      </v-flex>
      <v-flex xs12 sm4 class="pr-1 pt-1 pb-1 pl-0">
        <div>
          <v-text-field
            v-model="title_search"
            :loading="title_loading"
            solo-inverted
            label="عنوان"
            append-icon="label"
            light
            flat
            clearable
            @change="loadAgain()"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>

</script>
