<template>
  <div>
    <h3>Alphabet Racer</h3>
    <div class="board">
      <ul>
        <li v-for="alphabet in random" :key="alphabet">
          <button class="myButton" @click="sendAlphabet(alphabet)">{{ alphabet }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
// import swal from 'sweetalert'

export default {
  data () {
    return {
      alphabetDefault: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      alphabetResult: []
    }
  },
  computed: {
    random () {
      return _.shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
    }
  },
  methods: {
    sendAlphabet: function (alphabet) {
      console.log(alphabet)
      // swal(alphabet);
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
</style>