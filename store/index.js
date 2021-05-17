export const state = () => ({
  categories: [
    'Поздравления',
    'Благодарности',
    'Коллегам',
    'Любимым',
    'Родным',
    'Ищу тебя',
    'Просьбы о помощи',
    'Для всех'
  ],
  token: ''
})

export const getters = {
  get_categories: state => state.categories,
  hasToken: state => !!state.token
}

export const mutations = {
  setToken (state, payload) { state.token = payload },
  clearToken (state) { state.token = null }
}

export const actions = {
  login ({ commit }) { commit('setToken', 'truetoken') },
  logout ({ commit }) { commit('clearToken') }
}
