<template>
  <div class="lobby">
    <div class="row">
      <div class="col-12">
        <h3 class="titleSection mt-3">Lobby!</h3>
        <button class="btn btn-outline-primary" @click="logout">Exit Game!</button>
      </div>
      <div class="col-lg-9 col-xs-12 roomsSection mt-4">
        <h4 class="roomHeader m-3">Rooms</h4>
        <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#modalAddRoom">
            Add New Room
          </button>
          <table class="roomtable table table-hover m-1">
            <tbody v-for="(room, index) in rooms" :key="index">
              <tr class="disabled"><router-link :to="{ name: 'room', params: { id: room['.key'] }}" @click.native="enterRoom(room)">{{ room.name }}</router-link></tr>
            </tbody>
          </table>
          <!-- Modal -->
          <div class="modal fade" id="modalAddRoom" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Room</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <input type="text" class="form-control" v-model="roomName">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary " data-dismiss="modal" @click="addNewRoom">Add Room</button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-lg-3 col-xs-12 usersSection">
        <table class="pemaintable table table-borderless mt-3">
          <thead>
            <tr>
              <th>Users Online</th>
            </tr>
          </thead>
          <tbody v-for="(player, index) in players" :key="index">
            <tr>
              <td>{{ player.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/firebase.js'
import { mapState } from 'vuex'

export default {
  name: 'lobby',
  data () {
    return {
      roomName: '',
      testing: {}
    }
  },
  computed: {
    ...mapState(['username', 'userId'])
  },
  firebase: {
    players: db.ref('players'),
    rooms: db.ref('rooms')
  },
  created () {
    this.$store.commit('setUsername', localStorage.getItem('username'))
    this.$store.commit('setUserId', localStorage.getItem('userId'))
  },
  methods: {
    addNewRoom () {
      if(this.roomName === ''){
        alert('Room must have a name!')
      } else {
        this.$firebaseRefs.rooms.push({
          name: this.roomName,
          player1: this.username
        })
        let key = this.rooms[this.rooms.length-1]['.key']
        this.$router.push(`/room/${key}`)
      }
    },
    enterRoom (roomDetail) {
      const roomData = { ...roomDetail }
      delete roomData['.key']
      roomData.player2 = this.username
      this.$firebaseRefs.rooms.child(roomDetail['.key']).set(roomData)
    },
    logout () {
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      this.$firebaseRefs.players.child(this.userId).remove()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
table{
  border: 3px;
  border-collapse: separate;
}
tr{
  border-style: dashed
}
.pemaintable{
  border-style: groove;
}
.disabled {
   pointer-events: none;
   cursor: default;
}

</style>
