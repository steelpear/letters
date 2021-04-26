import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  categories: [
    'Для всех',
    'Любимым',
    'Родным',
    'Коллегам',
    'Поздравления',
    'Благодарности',
    'Ищу тебя',
    'Просьба о помощи'
  ]
})

export const getters = {
  get_categories: state => state.categories
}

export const mutations = {

}
