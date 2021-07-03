<template>
  <v-container>
    <v-data-table
      v-model="selected"
      item-key="letterId"
      show-select
      dense
      :headers="headers"
      :items="letters"
      :search="search"
      :footer-props="{
        itemsPerPageOptions: [15,25,50,-1],
        itemsPerPageText: 'Строк на страницу',
        itemsPerPageAllText: 'Все'
      }"
    >
      <template #top>
        <v-row
          align="center"
          class="px-5"
        >
          <v-switch
            v-model="publicSelect"
            :label="publicSelect ? 'Опубликованные' : 'Не опубликованные'"
            class="pa-3"
            @change="getLetters"
          />
          <v-spacer />
          <v-btn
            icon
            large
            :disabled="selected == ''"
            :color="selected ? 'red' : ''"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
          />
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'check',
  data () {
    return {
      search: '',
      publicSelect: false,
      selected: [],
      letters: [],
      routeProps: {
        limit: 50,
        skip: 0
      },
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'letterId'
        },
        { text: 'Name', value: 'letterName' },
        { text: 'Title', value: 'letterTitle' },
        { text: 'Category', value: 'letterCategory' },
        { text: 'Date', value: 'letterDate' }
      ]
    }
  },
  fetch () {
    this.getLetters()
  },
  methods: {
    getLetters () {
      this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip + '/' + this.publicSelect, {
      }).then((response) => {
        this.letters = response.data
      })
    }
  }
}
</script>
