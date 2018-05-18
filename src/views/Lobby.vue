<template>
  <div class="lobby">
    <div class="row">
      <div class="col-12">
        <h3 class="titleSection mt-3">Lobby!</h3>
        <button class="btn btn-outline-primary" @click="logout">Exit Game!</button>
      </div>
      <div class="col-lg-8 col-xs-12 roomsSection mt-4">
        <h4 class="roomHeader m-3">Rooms</h4>
        <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#modalAddRoom">
            Add New Room
          </button>
          <table class="table table-striped m-1">
            <tbody v-for="(room, index) in rooms" :key="index">
              <tr ><button :disabled="room.status == 1 ? true : false" @click="enterRoom(room)" class="btn btn-success m-4">{{ room.name }}</button></tr>
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
      <div class="col-lg-2 col-xs-12 usersSection">
        <table class="table table-striped mt-3">
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
      disabled: 0,
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
          player1: this.username,
          status: 0
        })
        let key = this.rooms[this.rooms.length-1]['.key']
        this.$router.push(`/room/${key}`)
      }
    },
    enterRoom (roomDetail) {
      const roomData = { ...roomDetail }
      delete roomData['.key']
      roomData.player2 = this.username
      roomData.status = 1
      this.$firebaseRefs.rooms.child(roomDetail['.key']).set(roomData)
      console.log(roomDetail)
      this.$router.push(`/room/${roomDetail['.key']}`)
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
.ok {
  background: #99ff99 ;
  color: black;
  border: 1px solid green;
}
.full {
  background: #ffb3b3;
  color: black;;
  border: 1px solid red;
}
.roomsSection {
  background: #ffbe4f;
  margin: 3%;
}
.usersSection {
  background: #a9d15e;
  margin: 2% 3%;
}
button {
    width: 150px;
    font-weight: bold;
}

a.btn.btn-outline-success.0 {
    width: 150px;
    font-weight: bold;
}
</style>
