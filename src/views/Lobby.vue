<template>
  <div class="lobby">
    <div class="row">
      <div class="col-12">
        <h3 class="titleSection mt-3">Lobby!</h3>
      </div>
      <div class="col-lg-9 col-xs-12 roomsSection">
        <h4 class="roomHeader m-3">Rooms</h4>
        <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAddRoom">
            Add New Room
          </button>
          <table class="table table-hover">
            <tbody v-for="(room, index) in rooms" :key="index">
              <tr>{{ room.name }}</tr>
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
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addNewRoom">Add Room</button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-lg-3 col-xs-12 usersSection">
        <h5 class="userHeader m-3">Users Online</h5>
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
      roomName: ''
    }
  },
  computed: {
    ...mapState(['username'])
  },
  firebase: {
    players: db.ref('players'),
    rooms: db.ref('rooms')
  },
  created () {
    this.$store.commit('setUsername', localStorage.getItem('username'))
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
      }
    }
  }
}
</script>

<style scoped>
.roomsSection {
  border: 1px solid white;
}
.usersSection {
  border: 1px solid white;
}
</style>
