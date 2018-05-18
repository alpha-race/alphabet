import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userId: ''
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setUserId (state, userId) {
      state.userId = userId
    }
  },
  actions: {
    
  }
})
