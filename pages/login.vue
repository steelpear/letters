<template>
  <v-container>
    <img src="letters-white.svg" class="d-block mx-auto" width="250">
    <v-card class="pa-6 mx-auto" width="400">
      <form>
        <v-text-field
          v-model="login"
          :error-messages="loginErrors"
          prepend-icon="mdi-account"
          label="Логин"
          required
          clearable
          @blur="$v.login.$touch()"
        />
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          prepend-icon="mdi-lock"
          label="Пароль"
          required
          clearable
          @blur="$v.password.$touch()"
        />
        <v-card-actions>
          <v-btn text color="indigo" @click="clear">
            Очистить
          </v-btn>
          <v-spacer />
          <v-btn text color="indigo" @click="submit">
            Войти
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  layout: 'empty',
  middleware: 'check',

  validations: {
    login: { required },
    password: { required }
  },

  data: () => ({
    login: '',
    password: ''
  }),

  computed: {
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) { return errors }
      !this.$v.login.required && errors.push('Обязательное поле!')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('Обязательное поле!')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      this.$store.dispatch('login')
      // this.$router.push('/admin')
    },
    clear () {
      this.$v.$reset()
      this.login = ''
      this.password = ''
    }
  }
}
</script>
