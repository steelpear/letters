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
                {{ letter.letterName }}
                <v-spacer />
                <v-chip>{{ letter.letterCategory }}</v-chip>
              </v-row>
              <p class="display-1 text--primary">
                {{ letter.letterTitle }}
              </p>
              <div class="text--primary">
                {{ letter.letterText }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                color="deep-purple accent-4"
              >
                Прочитать письмо
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from '~/components/Banner.vue'
export default {
  components: {
    Banner
  },
  data () {
    return {
      letters: [],
      timeOut: 0,
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
    fetchData (done) {
      setTimeout(() => {
        axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip, {
        })
          .then((response) => {
            const array = response.data
            if (array.length > 0) {
              this.letters = this.letters.concat(array)
              this.routeProps.skip = this.routeProps.skip + this.routeProps.limit
              this.timeOut = 1000
              done()
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }, this.timeOut)
    }
  }
}
</script>
