<template>
  <div>
    <Banner />
    <v-container>
      <v-row align="center" justify="center">
        <v-chip
          class="mx-2"
          link
          :outlined="selectedCategory != 'Все'"
          color="white"
          @click="selectCategory('Все')"
        >
          Все письма
        </v-chip>
        <v-chip
          v-for="(category, index) in categories"
          :key="index"
          class="mx-2"
          link
          :outlined="selectedCategory != category"
          color="white"
          @click="selectCategory(category)"
        >
          {{ category }}
        </v-chip>
      </v-row>
      <v-row
        v-masonry
        origin-left="true"
        horizontal-order="true"
        transition-duration="0.3s"
        item-selector=".letter"
        class="letters-wrap mt-16"
      >
        <v-col
          v-for="(letter, index) in filteredLetters"
          :key="index"
          v-masonry-tile
          class="letter"
          xs="12"
          sm="6"
          md="6"
          lg="6"
        >
          <v-card elevation="4">
            <v-card-text>
              <v-row align="center" justify="center" class="pa-4">
                <v-avatar v-if="letter.letterAvatar" left class="mr-4">
                  <v-img :src="letter.letterAvatar" />
                </v-avatar>
                <span>{{ letter.letterName }}</span>
                <v-spacer />
                <v-chip
                  color="teal"
                  text-color="white"
                >
                  {{ letter.letterCategory }}
                </v-chip>
              </v-row>
              <p class="headline font-weight-bold blue-grey--text text--darken-3 mt-2">
                <v-hover
                  v-slot="{ hover }"
                >
                  <span
                    style="cursor: pointer;"
                    :class="{ 'orange--text text--darken-3': hover }"
                    @click.prevent="openLetter(letter.letterId)"
                  >
                    {{ letter.letterTitle }}
                  </span>
                </v-hover>
              </p>
              <div class="text--primary body-1">
                {{ letter.letterText }}
              </div>
            </v-card-text>
            <v-card-actions class="pb-4">
              <share />
              <v-btn
                v-clipboard:copy="url + '/letters/' + letter.letterId"
                v-clipboard:success="onCopy"
                icon
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="qrCode(letter)"
              >
                <v-icon>mdi-qrcode-scan</v-icon>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="py-10">
        <v-btn
          v-if="visibleMoreBtn"
          dark
          x-large
          outlined
          @click="fetchData"
        >
          <v-icon large class="mr-2">
            mdi-eye-plus-outline
          </v-icon>
          Читать ещё
        </v-btn>
      </v-row>
      <v-snackbar
        v-model="copied"
        timeout="2500"
        top
        dark
        rounded
        color="orange darken-1"
      >
        <span class="body-1">Ссылка скопирована в буфер обмена</span>
        <v-btn
          dark
          icon
          @click="copied = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-spacer>
      </v-snackbar>
    </v-container>
    <v-dialog v-model="openQr" max-width="310">
      <v-card tile class="text-center">
        <div class="small-title caption text--primary">
          {{ currentTitle }}
        </div>
        <qr-code :value="url + '/letters/' + currentId" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue'
import Share from '~/components/Share.vue'
import QrCode from '~/components/QrCode.vue'
export default {
  components: {
    Banner,
    Share,
    QrCode
  },
  data () {
    return {
      letters: [],
      copied: false,
      openQr: false,
      currentId: '',
      currentTitle: '',
      selectedCategory: 'Все',
      countedLetters: 0,
      routeProps: {
        limit: 20,
        skip: 0
      }
    }
  },
  computed: {
    categories () { return this.$store.getters.get_categories },
    filteredLetters () {
      const cat = this.selectedCategory
      return this.letters.filter(function (elem) {
        if (cat === 'Все') { return true } else { return elem.letterCategory.includes(cat) }
      })
    },
    url () { return process.env.VUE_APP_URL },
    visibleMoreBtn () {
      if (this.countedLetters > this.letters.length) { return true } else { return false }
    }
  },
  mounted () {
    this.routeProps.skip = 0
    this.fetchData()
  },
  methods: {
    async fetchData () {
      await this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip + '/' + true, {
      })
        .then((response) => {
          const array = response.data
          if (array.length > 0) {
            this.letters = this.letters.concat(array)
            this.routeProps.skip = this.routeProps.skip + this.routeProps.limit
            this.countLetters()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    openLetter (id) {
      this.$router.push('/letters/' + id)
    },
    onCopy () {
      this.copied = true
    },
    selectCategory (category) {
      this.selectedCategory = category
    },
    qrCode (letter) {
      this.currentId = letter.letterId
      this.currentTitle = letter.letterTitle
      this.openQr = true
    },
    countLetters () {
      this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/countpublic')
        .then((response) => {
          this.countedLetters = response.data
        })
    }
  }
}
</script>

<style>
.small-title {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 10px;
}
.letter { transition: opacity .6s cubic-bezier(0.455, 0.03, 0.515, 0.955); }
.letters-wrap:hover .letter:not(:hover) { opacity: .8; }
</style>
