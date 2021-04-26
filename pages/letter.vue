<template>
  <v-container class="letter_wrap py-12 px-16 mt-6 elevation-12">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <img src="letter.png" width="200">
      </v-col>
      <v-col class="text-center letter_title">
        Напишите письмо
      </v-col>
      <v-col class="text-center">
        <img src="letter.png" width="200" style="transform: scale(-1, 1);">
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="title font-weight-regular mb-1">
          Ваше имя
        </div>
        <v-text-field
          v-model="autorName"
          label="Имя"
          outlined
          clearable
          hide-details
        />
      </v-col>
      <v-col>
        <div class="title font-weight-regular mb-1">
          Ваш E-mail
        </div>
        <v-text-field
          v-model="autorEmail"
          label="E-mail"
          outlined
          clearable
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="title font-weight-regular mb-1">
          Заголовок письма
        </div>
        <v-text-field
          v-model="title"
          label="Заголовок"
          outlined
          clearable
          hide-details
        />
      </v-col>
      <v-col>
        <div class="title font-weight-regular mb-1">
          Рубрика
        </div>
        <v-select
          v-model="category"
          :items="categories"
          label="Выберите рубрику"
          outlined
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="title font-weight-regular mb-1">
          Текст письма
        </div>
        <v-textarea
          v-model="text"
          outlined
          clearable
          counter
          label="Текст"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      autorName: '',
      autorEmail: '',
      title: '',
      category: '',
      text: ''
    }
  },
  computed: {
    categories () {
      return this.$store.getters.get_categories
    }
  }
}
</script>

<style lang="scss">
  .letter_wrap {
    background: white;
    border-radius: 22px;
    .letter_title {
      font-family: 'Neucha';
      font-size: 3rem;
    }
  }
</style>
