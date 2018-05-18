import Vue from 'vue'
import Router from 'vue-router'
import Lobby from './views/Lobby.vue'
import Login from './views/Login.vue'
import Room from './views/Room.vue'
import Game from './views/Game.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/room/:id',
      name: 'room',
      component: Room,
    },
    {
      path: 'game/:id',
      name: 'game',
      component: Game
    }
  ]
})
