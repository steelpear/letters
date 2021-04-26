<template>
  <v-app>
    <section class="main_section">
      <v-app-bar
        fixed
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
          src="letters-white.svg"
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
            <p>
              <span class="mr-1">Поделиться</span>
              <ShareNetwork
                v-for="network in networks"
                :key="network.network"
                :network="network.network"
                :url="sharing.url"
                :title="sharing.title"
                :description="sharing.description"
                :quote="sharing.quote"
                :hashtags="sharing.hashtags"
                :twitter-user="sharing.twitterUser"
                class="mx-1"
              >
                <v-icon>{{ network.icon }}</v-icon>
              </ShareNetwork>
            </p>
            <p>
              <nuxt-link to="/policy" class="text-decoration-underline">
                Использование файлов cookie и политика конфиденциальности
              </nuxt-link>
            </p>
          </v-col>
        </v-row>
      </v-footer>
    </section>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sharing: {
        url: 'https://news.vuejs.org/issues/180',
        title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
        description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: 'The hot reload is so fast it\'s near instant. - Evan You',
        hashtags: 'vuejs,vite,javascript',
        twitterUser: 'youyuxi'
      },
      networks: [
        { network: 'twitter', icon: 'mdi-twitter' },
        { network: 'telegram', icon: 'mdi-telegram' },
        { network: 'facebook', icon: 'mdi-facebook' },
        { network: 'vk', icon: 'mdi-vk' },
        { network: 'odnoklassniki', icon: 'mdi-odnoklassniki' },
        { network: 'whatsapp', icon: 'mdi-whatsapp' },
        { network: 'pinterest', icon: 'mdi-pinterest' }
      ]
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
