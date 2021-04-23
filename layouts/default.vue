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
        <v-toolbar-title v-text="title" />
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container>
          <nuxt />
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
export default {
  data () {
    return {
      title: 'Vuetify.js'
    }
  }
}
</script>

<style>
  .main_section {
      background: linear-gradient(71.88deg,#66a29c,#04817c);
      height: 100%;
  }
</style>
