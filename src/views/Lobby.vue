<template>
  <div class="lobby">

  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/firebase.js'

export default {
  name: 'lobby',
  firebase: {
    players: db.ref('players'),
    rooms: db.ref('rooms')
  },
  methods: {
    
  }
}
</script>
