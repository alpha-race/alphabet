import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    login (state, payload){
      state.username = payload
    }
  },
  actions: {

  }
})
