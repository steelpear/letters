<template>
  <div>
    <v-container class="py-16">
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
          <v-btn
            v-clipboard:copy="url + $route.path"
            v-clipboard:success="onCopy"
            icon
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="openQr = true"
          >
            <v-icon>mdi-qrcode-scan</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="openQr" max-width="310">
      <v-card class="text-center">
        <qr-code :value="url + $route.path" />
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="copied"
      multi-line
      timeout="2000"
      bottom
      dark
    >
      Ссылка скопирована в буфер обмена
      <v-btn
        dark
        icon
        @click="copied = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-spacer>
    </v-snackbar>
  </div>
</template>

<script>
import Share from '~/components/Share.vue'
import QrCode from '~/components/QrCode.vue'
export default {
  components: {
    Share,
    QrCode
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, params, error }) {
    try {
      const letter = await $axios.$get(process.env.VUE_APP_SERVER + '/api/records/find/' + params.id)
      if (letter.length !== 0) { return { letter } } else { return error }
    } catch (e) {
      error({ statusCode: 404, message: 'Letter not found' })
    }
  },
  data () {
    return {
      copied: false,
      openQr: false
    }
  },
  computed: {
    url () { return process.env.VUE_APP_URL }
  },
  mounted () {
    this.$vuetify.goTo(0)
  },
  methods: {
    onCopy () {
      this.copied = true
    }
  }
}
</script>
