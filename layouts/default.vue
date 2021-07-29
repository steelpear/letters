<template>
  <v-app>
    <section v-cloak class="main_section">
      <v-app-bar
        app
        dark
        elevation="0"
        color="transparent"
        style="position: relative"
        class="px-16 py-3"
      >
        <v-fade-transition>
          <v-col v-if="$route.path !='/'">
            <v-img
              max-height="100"
              max-width="220"
              :src="mimeTypeUrl()"
              class="mt-10 ml-12"
            />
          </v-col>
          <v-col
            v-else
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="search"
              outlined
              rounded
              single-line
              label="Номер письма"
              hide-details
              class="search"
              @keyup.enter="findLetter"
            >
              <template #prepend-inner>
                <v-progress-circular
                  v-if="loadingRandom"
                  size="40"
                  color="#EFC84A"
                  class="mt-n2 mr-4"
                  indeterminate
                />
                <v-tooltip
                  v-if="!loadingRandom"
                  bottom
                  color="#F8BF0E"
                  content-class="toolt"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      fab
                      icon
                      x-small
                      class="mr-4"
                      v-bind="attrs"
                      v-on="on"
                      @click="random"
                    >
                      <img
                        width="40"
                        height="40"
                        src="letter.svg"
                        class="mt-n2"
                        style="cursor:pointer"
                      >
                    </v-btn>
                  </template>
                  <span>Случайное письмо</span>
                </v-tooltip>
              </template>
              <template #append>
                <v-progress-circular
                  v-if="loading"
                  size="40"
                  color="#EFC84A"
                  class="mt-n2"
                  indeterminate
                />
                <v-tooltip
                  v-if="!loading"
                  bottom
                  color="#F8BF0E"
                  content-class="toolt"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      fab
                      icon
                      x-small
                      v-bind="attrs"
                      v-on="on"
                      @click="findLetter"
                    >
                      <img
                        width="40"
                        height="40"
                        src="magnifier.svg"
                        class="mt-n2"
                        style="cursor:pointer"
                      >
                    </v-btn>
                  </template>
                  <span>Поиск письма</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
        </v-fade-transition>
        <v-spacer />
        <v-btn
          to="/"
          text
          nuxt
          :ripple="false"
          plain
          class="top_btn px-2"
          x-large
        >
          Главная страница
        </v-btn>
        <v-btn
          to="/about"
          text
          nuxt
          :ripple="false"
          plain
          class="top_btn px-2"
          x-large
        >
          О сайте
        </v-btn>
        <v-btn
          to="/letter"
          text
          nuxt
          :ripple="false"
          plain
          class="top_btn px-2"
          x-large
        >
          Написать письмо
        </v-btn>
        <v-btn
          to="/donate"
          text
          nuxt
          :ripple="false"
          plain
          class="top_btn px-2"
          x-large
        >
          Помочь сайту
        </v-btn>
      </v-app-bar>
      <v-main>
        <nuxt />
      </v-main>
      <v-footer
        app
        dark
        absolute
        color="#2c3b42"
        class="py-10 px-16"
      >
        <v-row justify="center">
          <v-col>
            <p>&copy; {{ new Date().getFullYear() }} ваши-письма.рф</p>
            <p>
              <nuxt-link to="/rules" class="text-decoration-underline">
                Правила размещения писем
              </nuxt-link>
            </p>
            <p>Вопросы и предложения: <a href="mailto:steelpear@gmail.com">steelpear@gmail.com</a></p>
          </v-col>
          <v-spacer />
          <v-col>
            <p class="mb-7 ml-3">
              <v-row align="center">
                <div class="mr-2">
                  Поделиться
                </div>
                <share />
              </v-row>
            </p>
            <p>
              <a href="https://qr-board.ru/" target="_blank">QR-Board - Доска объявлений</a>
            </p>
            <p>
              <a href="https://qr-generator.ru/" target="_blank">QR-Generator - Генератор QR-кодов</a>
            </p>
            <!-- <p>
              <nuxt-link to="/policy" class="text-decoration-underline">
                Использование файлов cookie и политика конфиденциальности
              </nuxt-link>
            </p> -->
          </v-col>
        </v-row>
        <v-bottom-sheet
          v-model="cookiePolicy"
          hide-overlay
          persistent
          inset
        >
          <v-card class="py-10">
            <v-row align="center" justify="center">
              <v-row align="center" justify="center" class="px-8">
                <v-icon large class="ml-3 mr-1 hidden-sm-and-down">
                  info
                </v-icon>
                <v-col :class="$vuetify.breakpoint.smAndDown ? 'text-justify' : 'text-center'" style="max-width: fit-content;">
                  Для Вашего удобства на этом сайте используются файлы <a href="https://ru.wikipedia.org/wiki/Cookie" targen="_blank">cookie</a>.
                </v-col>
              </v-row>
              <v-btn outlined color="indigo" class="mr-12" @click="cookieOk">
                Понятно
              </v-btn>
            </v-row>
          </v-card>
        </v-bottom-sheet>
      </v-footer>
      <v-fab-transition>
        <v-btn
          v-show="offsetTop > 25"
          color="white"
          fab
          icon
          outlined
          plain
          fixed
          bottom
          right
          @click="$vuetify.goTo(0)"
        >
          <v-icon>
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </section>
  </v-app>
</template>

<script>
import Share from '~/components/Share.vue'
export default {
  components: {
    Share
  },
  data () {
    return {
      cookiePolicy: false,
      offsetTop: 0,
      loading: false,
      loadingRandom: false,
      search: ''
    }
  },
  beforeMount () {
    window.addEventListener('scroll', (e) => {
      requestAnimationFrame(() => {
        const scrollPos = window.scrollY
        const winHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight
        const perc = (100 * scrollPos) / (docHeight - winHeight)
        this.offsetTop = perc
      })
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', (e) => {})
  },
  mounted () {
    if (this.$cookies.get('cookie_assent')) {
      this.cookiePolicy = false
    } else { this.cookiePolicy = true }
  },
  methods: {
    cookieOk () {
      this.cookiePolicy = false
      this.$cookies.set('cookie_assent', 'cookie_session', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    mimeTypeUrl () { return require('~/static/letters-white.svg') },
    findLetter () {
      if (this.search !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$router.push('/letters/' + this.search)
          this.search = ''
        }, 2000)
      }
    },
    random () {
      this.loadingRandom = true
      setTimeout(() => {
        this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/random', {
        })
          .then((response) => {
            this.loadingRandom = false
            this.$router.push('/letters/' + response.data[0].letterId)
          })
          .catch((error) => {
          // eslint-disable-next-line no-console
            console.log(error)
          })
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
  [v-cloak] { display:none; }
  .main_section {
    background: linear-gradient(71.88deg,#66a29c,#04817c);
    // background: linear-gradient(90deg, #4e4e52 20px, transparent 1%) center, linear-gradient(#4e4e52 20px, transparent 1%) center, #635f5f;
    // background-size: 22px 22px;
    height: 100%;
    .top_btn {
      text-transform: none;
      font-size: 23px;
      font-family: 'Neucha';
    }
    a {
      color: inherit;
      text-decoration: inherit;
    }
    .search {
      .v-label { font-family:'Neucha'; font-size: 22px;}
      .v-input__slot { font-family: 'Roboto'; font-size: 24px; }
    }
  }
  .toolt {
    font-size: 20px;
    font-family: 'Neucha';
  }
</style>
