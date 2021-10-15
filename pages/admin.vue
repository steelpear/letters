<template>
  <v-container>
    <client-only>
      <v-data-table
        v-model="selected"
        item-key="letterId"
        dense
        show-select
        :headers="headers"
        :items="letters"
        :search="search"
        no-data-text="Писем пока нет"
        :footer-props="{
          itemsPerPageOptions: [25,50,100,-1],
          itemsPerPageText: 'Строк на страницу',
          itemsPerPageAllText: 'Все'
        }"
        @click:row="rowClick"
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
              :disabled="selected == '' || currentRole == 'Гость'"
              :color="selected ? 'red' : ''"
              @click="deleteMany"
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
        <template
          #item.letterDate="{ item }"
        >
          {{ new Date(item.letterDate).toLocaleString("ru", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }) }}
        </template>
      </v-data-table>
    </client-only>
    <v-dialog
      v-model="letterDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title>
          {{ letter.letterId }}
          <v-spacer />
          <v-chip
            class="ma-2"
            color="primary"
          >
            {{ letter.letterCategory }}
          </v-chip>
          <v-spacer />
          <v-avatar v-if="letter.letterAvatar" left class="mr-4">
            <v-img :src="letter.letterAvatar" />
          </v-avatar>
          {{ letter.letterName }}
        </v-card-title>
        <v-card-text>
          <div v-if="letter.letterEmail" class="text-right text--primary">
            <v-row align="center" justify="end">
              <v-switch
                v-model="notice"
                label="Уведомить"
                class="mr-3"
              />
              {{ letter.letterEmail }}
            </v-row>
          </div>
          <div v-else class="text-right text--primary">
            Почта не указана
          </div>
          <div class="text-center text-h5 font-weight-medium mb-3">
            {{ letter.letterTitle }}
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="text--primary body-1 letter-text" v-html="letter.letterText" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="letterDialog = false"
          >
            Отмена
          </v-btn>
          <v-spacer />
          <!-- <v-btn
            color="red darken-1"
            text
            :disabled="currentRole == 'Гость'"
            @click="deleteLetterConfirm"
          > -->
          <v-btn
            color="red darken-1"
            text
            disabled
          >
            Удалить
          </v-btn>
          <v-btn
            v-if="!letter.letterPublic"
            color="indigo darken-1"
            text
            :disabled="currentRole == 'Гость'"
            @click="publicLetter(true)"
          >
            Опубликовать
          </v-btn>
          <v-btn
            v-else
            color="indigo darken-1"
            text
            :disabled="currentRole == 'Гость'"
            @click="publicLetter(false)"
          >
            Снять с публикации
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          <div class="text-center" style="width: 100%">
            Уверены?
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="deleteDialog = false"
          >
            Нет
          </v-btn>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="deleteLetter"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'check',
  data () {
    return {
      search: '',
      notice: true,
      publicSelect: false,
      letterDialog: false,
      deleteDialog: false,
      selected: [],
      letters: [],
      letter: {},
      currentRole: '',
      routeProps: {
        limit: 30,
        skip: 0
      },
      headers: [
        {
          text: '№ письма',
          align: 'start',
          sortable: false,
          value: 'letterId'
        },
        { text: 'От кого', value: 'letterName' },
        { text: 'Заголовок', value: 'letterTitle' },
        { text: 'Категория', value: 'letterCategory' },
        { text: 'Дата', value: 'letterDate' }
      ]
    }
  },
  fetch () {
    this.getLetters()
    this.currentRole = this.$store.getters.get_role
  },
  head () {
    return {
      title: 'Панель администратора'
    }
  },
  methods: {
    getLetters () {
      this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip + '/' + this.publicSelect, {
      }).then((response) => {
        this.letters = response.data
      })
    },
    rowClick (item, row) {
      this.letter = item
      row.select(true)
      this.letterDialog = true
    },
    publicLetter (val) {
      this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/public/' + this.letter._id + '/' + val, {
      }).then((response) => {
        this.letterDialog = false
        this.selected = []
        this.getLetters()
        if (this.letter.letterEmail !== '' && this.notice) { this.mailer(val) }
        this.notice = true
      })
    },
    deleteLetterConfirm () {
      this.letterDialog = false
      this.deleteDialog = true
    },
    deleteLetter () {
      this.$axios.delete(process.env.VUE_APP_SERVER + '/api/records/delete/' + this.letter._id, {
      }).then((response) => {
        this.deleteDialog = false
        this.selected = []
        this.getLetters()
      })
    },
    deleteMany () {
      const sel = this.selected
      const ids = []
      sel.forEach(function (item, i, sel) { ids.push(item._id) })
      this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/delmany', {
        ids
      }).then((response) => {
        this.selected = []
        this.getLetters()
      })
    },
    mailer (val) {
      const text = val ? 'Ваше письмо №' + this.letter.letterId + ' опубликовано' : 'Ваше письмо №' + this.letter.letterId + ' снято с публикации'
      this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/mailer', {
        email: this.letter.letterEmail,
        text
      })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.data)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .v-data-table__wrapper table tbody tr {cursor: pointer}
</style>
