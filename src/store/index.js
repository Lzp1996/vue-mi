import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    cartCount: 10
  },
  mutations: {
    saveUserName (state, username) {
      state.username = username
    },
    setCartCount (state, count) {
      state.cartCount = count
    }
  },
  actions: {
    saveUserName (context, username) {
      context.commit('saveUserName', username)
    }
  },
  modules: {
  }
})
