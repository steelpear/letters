<template>
  <v-app>
    <section class="main_section">
      <v-app-bar
        fixed
        app
        dark
        elevation="0"
        color="transparent"
      >
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
        <Banner />
        <v-container>
          <v-fade-transition>
            <nuxt />
          </v-fade-transition>
        </v-container>
      </v-main>
      <v-footer
        app
      >
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </section>
  </v-app>
</template>

<script>
import Banner from '~/components/Banner.vue'
export default {
  components: {
    Banner
  },
  data () {
    return {
      //
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
  }
</style>
