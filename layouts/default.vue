<template>
  <v-app>
    <section class="main_section">
      <v-app-bar
        app
        dark
        elevation="0"
        color="transparent"
        style="position: relative"
      >
        <v-img
          v-if="$route.path !='/'"
          max-height="100"
          max-width="220"
          :src="mimeTypeUrl()"
          class="mt-10 ml-12"
        />
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
          О проекте
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
          Пожертвовать
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-fade-transition>
          <nuxt />
        </v-fade-transition>
      </v-main>
      <v-footer
        app
        dark
        color="#2c3b42"
        class="py-10 px-16"
        style="position: relative"
      >
        <v-row justify="center">
          <v-col>
            <p>&copy; {{ new Date().getFullYear() }} письма.ру</p>
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
              <nuxt-link to="/policy" class="text-decoration-underline">
                Использование файлов cookie и политика конфиденциальности
              </nuxt-link>
            </p>
          </v-col>
        </v-row>
        <v-bottom-sheet
          v-model="cookiePolicy"
          hide-overlay
          persistent
        >
          <v-card class="py-10">
            <v-row align="center" justify="center">
              <v-row align="center" justify="center" class="px-8">
                <v-icon large class="ml-3 mr-1 hidden-sm-and-down">
                  info
                </v-icon>
                <v-col :class="$vuetify.breakpoint.smAndDown ? 'text-justify' : 'text-center'" style="max-width: fit-content;">
                  На этом сайте используются файлы <span class="font-weight-bold">cookie</span>. Продолжая использовать его, Вы соглашаетесь с этим. Чтобы узнать больше <nuxt-link to="/policy" class="indigo--text font-weight-bold">
                    нажмите здесь
                  </nuxt-link>.
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
      cookiePolicy: true,
      offsetTop: 0
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
    }
  },
  methods: {
    cookieOk () {
      this.cookiePolicy = false
      this.$cookies.set('cookie_assent', 'cookie_session', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    mimeTypeUrl () {
      return require('~/static/letters-white.svg')
    }
  }
}
</script>

<style lang="scss">
  .main_section {
    background: linear-gradient(71.88deg,#66a29c,#04817c);
    // background: linear-gradient(to right, #93F9B9, #1D976C);
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
  }
</style>
