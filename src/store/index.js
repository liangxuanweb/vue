import Vue from 'vue'
import Vuex from 'vuex'
import { getUserName } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:
      JSON.parse(window.sessionStorage.getItem('isCollapse')) || false,
    username: getUserName() || '',
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      //html5存储
      window.sessionStorage.setItem(
        'isCollapse',
        JSON.stringify(state.isCollapse)
      )
    },
  },
  actions: {},
  modules: {},
})
