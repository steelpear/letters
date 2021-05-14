import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

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
  ]
})

export const getters = {
  get_categories: state => state.categories
}

export const mutations = {

}
