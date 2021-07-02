export const state = () => ({
  token: null,
  categories: [
    'Поздравления',
    'Благодарности',
    'Коллегам',
    'Любимым',
    'Родным',
    'Ищу тебя',
    'Просьбы о помощи',
    'Для всех'
  ]
})

export const getters = {
  hasToken: state => !!state.token,
  get_categories: state => state.categories
}

export const mutations = {
  setToken (state, token) { state.token = token },
  clearToken (state) { state.token = null }
}

export const actions = {
  login ({ commit }) { commit('setToken', 'truetoken') },
  logout ({ commit }) { commit('clearToken') }
}
