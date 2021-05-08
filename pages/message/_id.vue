<template>
  <v-container>
    <v-card elevation="4" max-width="800" class="mx-auto pa-8 animate__animated animate__fadeIn">
      <v-card-text>
        <v-row align="center" justify="center" class="pa-4">
          <v-avatar v-if="letter.letterAvatar" left class="mr-4">
            <v-img :src="letter.letterAvatar" />
          </v-avatar>
          <span class="text--primary body-1">{{ letter.letterName }}</span>
          <v-spacer />
        </v-row>
        <p class="headline font-weight-bold blue-grey--text text--darken-3 mt-2 mb-4 text-center">
          {{ letter.letterTitle }}
        </p>
        <div class="text--primary body-1">
          {{ letter.letterText }}
        </div>
      </v-card-text>
      <v-card-actions>
        <share />
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Share from '~/components/Share.vue'
export default {
  components: {
    Share
  },
  // validate ({ params }) {
  //   return /^\d+$/.test(params.id)
  // },
  async asyncData ({ $axios, params }) {
    const letter = await $axios.$get(process.env.VUE_APP_SERVER + '/api/records/find/' + params.id)
    return { letter }
  },
  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>
