<template>
  <v-container>
    <v-card class="elevation-0">
      <v-card-title>
        <v-spacer />
        <v-btn
          icon
          large
          @click.stop="addDialog = true"
        >
          <v-icon large>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <!-- <v-simple-table>
          <template #default>
            <tbody>
              <tr
                v-for="(account, i) in accounts"
                :key="i"
              >
                <td>{{ i + 1 }}</td>
                <td>{{ account.login }}</td>
                <td>{{ account.role }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> -->
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(account, i) in accounts"
            :key="i"
          >
            <v-expansion-panel-header>
              <v-row>
                <v-col cols="12" md="1">
                  {{ i + 1 }}
                </v-col>
                <v-col>{{ account.login }}</v-col>
                <v-col>{{ account.role }}</v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row align="center" justify="space-between" class="py-3">
                <v-col>
                  <v-text-field
                    v-model="newpassword"
                    label="Новый пароль"
                    hide-details
                    outlined
                    dense
                  />
                </v-col>
                <v-col>
                  <v-select
                    v-model="newrole"
                    :items="roles"
                    menu-props="auto"
                    label="Новые права"
                    hide-details
                    outlined
                    single-line
                    dense
                  />
                </v-col>
                <v-col>
                  <v-btn
                    color="indigo"
                    tile
                    outlined
                  >
                    Сохранить изменения
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    color="red"
                    tile
                    outlined
                  >
                    Удалить аккаунт
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="addDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>
          <div class="text-center" style="width: 100%">
            Добавить аккаунт
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="login"
            label="Логин"
            prepend-inner-icon="mdi-account"
          />
          <v-text-field
            v-model="password"
            label="Пароль"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
          />
          <v-select
            v-model="role"
            :items="roles"
            menu-props="auto"
            label="Права"
            hide-details
            prepend-icon="mdi-text-box-plus-outline"
            single-line
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="addDialog = false"
          >
            Отмена
          </v-btn>
          <v-spacer />
          <v-btn
            color="indigo darken-1"
            text
            @click="addAccount"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'check',
  data () {
    return {
      addDialog: false,
      login: '',
      password: '',
      newpassword: '',
      role: 'Гость',
      newrole: '',
      roles: ['Администратор', 'Модератор', 'Гость'],
      accounts: [],
      showPass: false
    }
  },
  fetch () {
    this.getAccounts()
  },
  methods: {
    getAccounts () {
      this.$axios.get(process.env.VUE_APP_SERVER + '/api/login', {
      })
        .then((response) => {
          this.accounts = response.data
        })
    },
    addAccount () {
      this.$axios.post(process.env.VUE_APP_SERVER + '/api/login/new', {
        login: this.login,
        password: this.password,
        role: this.role
      })
        .then((response) => {
          this.addDialog = false
          this.getAccounts()
        })
    }
  }
}
</script>
