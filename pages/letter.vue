<template>
  <v-container class="letter_wrap py-12 px-16 mt-6 elevation-12">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <img src="letter.png" width="200" class="animate__animated animate__fadeInLeft">
      </v-col>
      <v-col class="text-center letter_title animate__animated animate__fadeIn">
        Напишите письмо
      </v-col>
      <v-col class="text-center">
        <img src="letter.png" width="200" class="animate__animated animate__fadeInRight" style="transform: scale(-1, 1);">
      </v-col>
    </v-row>
    <form>
      <v-row>
        <v-col>
          <div class="title font-weight-regular mb-1">
            Ваше имя
          </div>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="40"
            required
            label="От кого письмо"
            outlined
            clearable
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
        </v-col>
        <v-col>
          <div class="title font-weight-regular mb-1">
            Ваш E-mail
          </div>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            outlined
            clearable
            @input="$v.email.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="title font-weight-regular mb-1">
            Заголовок письма
          </div>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="40"
            label="Заголовок"
            outlined
            clearable
            @input="$v.title.$touch()"
          />
        </v-col>
        <v-col>
          <div class="title font-weight-regular mb-1">
            Рубрика
          </div>
          <v-select
            v-model="category"
            :items="categories"
            label="Выберите рубрику"
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="title font-weight-regular mb-1">
            Текст письма
          </div>
          <v-textarea
            v-model="text"
            :error-messages="textErrors"
            :counter="500"
            outlined
            clearable
            label="Текст"
            @input="$v.text.$touch()"
            @blur="$v.text.$touch()"
          />
        </v-col>
      </v-row>
    </form>
    <v-row align="center">
      <v-col>
        <vue-recaptcha
          ref="recaptcha"
          sitekey="6LeM07oUAAAAAE7iDSN3QcTC-knepiStbZ7-GN90"
          :load-recaptcha-script="true"
          size="normal"
          @verify="recaptchaOk"
        />
      </v-col>
      <v-col class="text-center">
        <img
          :class="sendImgClass"
          src="letter.png"
          width="200"
        >
      </v-col>
      <v-col class="text-right">
        <client-only>
          <v-btn
            :dark="!$v.$invalid"
            color="teal darken-3"
            elevation="2"
            x-large
            class="send_letter_btn pa-8"
            :disabled="$v.$invalid"
            @click="sendLetter"
          >
            Отправить письмо
            <v-icon
              right
              large
              class="ml-6"
            >
              mdi-email-multiple-outline
            </v-icon>
          </v-btn>
        </client-only>
      </v-col>
    </v-row>

    <v-dialog
      v-model="errorDialog"
      transition="dialog-top-transition"
      max-width="490"
    >
      <v-card class="pt-4">
        <v-img src="robot.jpg" />
        <p class="text-center title pt-2 mb-0">
          Пройдите проверку на робота, пожалуйста.
        </p>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            plain
            text
            @click="errorDialog = false"
          >
            Хорошо
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: {
    VueRecaptcha
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(40) },
    text: { required, maxLength: maxLength(500) },
    email: { email },
    title: { maxLength: maxLength(40) }
  },
  data () {
    return {
      name: '',
      email: '',
      title: '',
      category: 'Для всех',
      text: '',
      recaptcha: true,
      errorDialog: false,
      sended: false
    }
  },
  computed: {
    categories () { return this.$store.getters.get_categories },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.maxLength && errors.push('Не более 40 символов.')
      !this.$v.name.required && errors.push('Обязательное поле.')
      return errors
    },
    textErrors () {
      const errors = []
      if (!this.$v.text.$dirty) { return errors }
      !this.$v.text.maxLength && errors.push('Не более 500 символов.')
      !this.$v.text.required && errors.push('Обязательное поле.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Введите правильный email.')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) { return errors }
      !this.$v.title.maxLength && errors.push('Не более 40 символов.')
      return errors
    },
    sendImgClass () {
      let cl = ''
      if (!this.$v.$invalid) {
        cl = 'send_img_100'
      } else if (this.sended) {
        cl = 'send_img_100 animate__animated animate__fadeOutTopRight'
      } else {
        cl = 'send_img_50 animate__animated animate__slideInDown'
      }
      return cl
    }
  },
  methods: {
    recaptchaOk () {
      this.recaptcha = true
    },
    sendLetter () {
      if (!this.recaptcha) {
        this.errorDialog = true
      } else {
        this.sended = true
        this.clearForm()
        // this.recaptcha = false
        this.$refs.recaptcha.reset()
        setTimeout(() => {
          this.sended = false
        }, 1500)
      }
    },
    clearForm () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.title = ''
      this.category = 'Для всех'
      this.text = ''
    }
  }
}
</script>

<style lang="scss">
  .letter_wrap {
    background: white;
    border-radius: 22px;
    .letter_title {
      font-family: 'Neucha';
      font-size: 3rem;
    }
    .send_letter_btn {
      font-family: 'Neucha';
      font-size: 22px;
    }
    .send_img_50 { transition: opacity .2s; opacity: .5; }
    .send_img_100 { transition: opacity .2s; opacity: 1; }
  }
</style>
