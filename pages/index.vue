<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-chip
          v-for="(category, index) in categories"
          :key="index"
          class="mx-2"
          link
          outlined
          color="white"
        >
          {{ category }}
        </v-chip>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        'Для всех',
        'Любимым',
        'Родным',
        'Коллегам',
        'Поздравления',
        'Благодарности',
        'Ищу тебя',
        'Просьба о помощи'
      ]
    }
  }
}
</script>
