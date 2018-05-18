<template>
    <div class="board">
    <h3>Alphabet Racer</h3>
    <p>Room loaded has ID: {{ $route.params.id }}</p>
    <div class='board'>
      <ul>
        <li v-for="(alphabet, i) in randomData" :key="i">
          <div v-if='alphabet.status'>
            <button class="myButton" @click="sendAlphabet(alphabet)">{{ alphabet.huruf }}</button>
          </div>
          <div v-else>
            <button class="myButton-2" disabled="disabled">{{ alphabet.huruf }}</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
// import swal from 'sweetalert'
import { db } from '@/firebase.js'
import { mapState } from 'vuex'

export default {
  name:'game',
  data () {
    return {
      alphabetDefault: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      state: 0,
      warning: 'You click wrong alphabet!',
      randomData: this.randomMethod()
    }
  },
  computed: {
    random () {
      return _.shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
    }
  },
  firebase: {
    rooms: db.ref('rooms')
  },
  created: function () {
    this.updateStatusGame(false)
  },
  methods: {
    randomMethod () {
      return _.shuffle([
        { huruf: 'A', status: true },
        { huruf: 'B', status: true }, 
        { huruf: 'C', status: true },
        { huruf: 'D', status: true },
        { huruf: 'E', status: true },
        { huruf: 'F', status: true },
        { huruf: 'G', status: true },
        { huruf: 'H', status: true },
        { huruf: 'I', status: true }
      ])
    },
    gameIsOver () {
      let tempRoom = {}
      this.rooms.forEach(room => {
        let key = this.$route.params.id
        if(room['.key'] === key) {
          if (room.winner != false) {
            alert(`Winner of game is ${room.winner}`)
            // swal(`Winner of game is ${room.winner}`)
          }
          // console.log('game is over', room.winner)
        }
      })  
    },
    updateStatusGame (status) {
      let tempRoom = {}
      this.rooms.forEach(room => {
        if(room['.key'] === this.$route.params.id) tempRoom = room
      })
      const copy = { ...tempRoom }
      delete copy['.key']
      copy.winner = status
      this.$firebaseRefs.rooms.child(this.$route.params.id).set(copy)
    },
    isWon () {
      if (this.state == 9) {
        let username = localStorage.getItem('username')
        this.updateStatusGame(username)
        this.state = 0
      }
    },
    sendAlphabet: function (alphabet) {
      if (alphabet.huruf == this.alphabetDefault[this.state]) {
        alphabet.status = false
        this.state++
        this.isWon()
        this.gameIsOver();
      }
    }
  }
}
</script>

<style scoped>
.board {
  width: 450px;
  height: 450px;
  background: white;
  margin: auto;
}
.board > ul {
  margin: 0;
  padding: 0;
}
.board > ul > li {
  float: left;
  width: 150px;
  height: 150px;
  list-style: none;
  padding: -1px;
  border: thin solid white;
}
.board > ul > li > button {
  font-size: 70px;
  width: 100%;
  height: 100%;
}
.myButton {
	-moz-box-shadow: 0px 10px 14px -7px #276873;
	-webkit-box-shadow: 0px 10px 14px -7px #276873;
	box-shadow: 0px 10px 14px -7px #276873;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #599bb3), color-stop(1, #408c99));
	background:-moz-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:-webkit-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:-o-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:-ms-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#599bb3', endColorstr='#408c99',GradientType=0);
	background-color:#599bb3;
	-moz-border-radius:8px;
	-webkit-border-radius:8px;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:20px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
}
.myButton:hover {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #408c99), color-stop(1, #599bb3));
	background:-moz-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:-webkit-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:-o-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:-ms-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#408c99', endColorstr='#599bb3',GradientType=0);
	background-color:#408c99;
}
.myButton:active {
	position:relative;
	top:1px;
}
.myButton-2 {
    -moz-box-shadow: 0px 10px 14px -7px #276873;
    -webkit-box-shadow: 0px 10px 14px -7px #276873;
    box-shadow: 0px 10px 14px -7px #276873;
    background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #599bb3), color-stop(1, #408c99));
    background:-moz-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background:-webkit-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background:-o-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background:-ms-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#599bb3', endColorstr='#408c99',GradientType=0);
    background-color:red;
    -moz-border-radius:8px;
    -webkit-border-radius:8px;
    border-radius:8px;
    display:inline-block;
    cursor:pointer;
    color:red;
    font-family:Arial;
    font-size:20px;
    font-weight:bold;
    padding:13px 32px;
    text-decoration:none;
    text-shadow:0px 1px 0px #3d768a;
}
</style>