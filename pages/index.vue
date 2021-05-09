<template>
  <div>
    <Banner />
    <v-container>
      <v-row align="center" justify="center">
        <v-chip
          v-for="(category, index) in categories"
          :key="index"
          class="mx-2"
          link
          outlined
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
        class="mt-16"
      >
        <v-col
          v-for="(letter, index) in letters"
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
              <div class="text--primary">
                {{ letter.letterText }}
              </div>
            </v-card-text>
            <v-card-actions class="pb-4">
              <share />
              <v-btn
                v-clipboard:copy="$route.path"
                v-clipboard:success="onCopy"
                icon
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="copied"
      multi-line
      timeout="2500"
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
import axios from 'axios'
import Banner from '~/components/Banner.vue'
import Share from '~/components/Share.vue'
export default {
  components: {
    Banner,
    Share
  },
  data () {
    return {
      letters: [],
      filteredLetters: [],
      timeOut: 0,
      copied: false,
      routeProps: {
        limit: 50,
        skip: 0
      }
    }
  },
  computed: {
    categories () {
      return this.$store.getters.get_categories
    }
  },
  mounted () {
    this.routeProps.skip = 0
    this.fetchData()
  },
  methods: {
    fetchData () {
      setTimeout(() => {
        axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip, {
        })
          .then((response) => {
            const array = response.data
            if (array.length > 0) {
              this.letters = this.letters.concat(array)
              this.routeProps.skip = this.routeProps.skip + this.routeProps.limit
              this.timeOut = 1000
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }, this.timeOut)
    },
    openLetter (id) {
      this.$router.push('/letters/' + id)
    },
    onCopy () {
      this.copied = true
    },
    selectCategory (category) {
      // this.fetchData()
      this.letters = this.letters.filter(item => category.includes(item.letterCategory))
    }
  }
}
</script>
