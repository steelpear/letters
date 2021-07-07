<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      dark
    >
      <nuxt-link to="/">
        <v-img
          max-height="100"
          max-width="220"
          src="letters-white.svg"
          class="mt-5"
        />
      </nuxt-link>
      <v-divider />
      <v-list>
        <v-list-item
          nuxt
          to="/admin"
        >
          <v-list-item-icon>
            <v-icon large>
              mdi-email-multiple-outline
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Письма</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          nuxt
          to="/accounts"
        >
          <v-list-item-icon>
            <v-icon large>
              mdi-account-multiple
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Аккаунты</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-btn
        icon
        large
        @click="logOut"
      >
        <v-icon large>
          mdi-exit-run
        </v-icon>
      </v-btn> -->
    </v-navigation-drawer>
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    logOut () {
      this.$store.dispatch('logout')
      this.$router.push('/admin')
    }
  }
}
</script>
