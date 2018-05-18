<template>
    <div>
        <table class="table table-striped table-dark">
            <thead>
                <tr class="col-sm-12">
                    <th scope="col">{{player1}}</th>
                    <th scope="col" >{{player2}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <button v-if='username==player1' type='btn' class='btn btn-danger' @click='leave(userId)' >Leave</button> </td>
                    <td> <button v-if='username==player2' type='btn' class='btn btn-danger' @click='leave(userId)' >Leave</button> </td>
                </tr>
            </tbody>
        </table>
        <div v-if="roomStatus=='ok'" >
            <button v-if='username==player2' type='btn' class='btn btn-info' @click='start' >Start</button>
        </div>
    </div>
</template>

<script>
import {db} from '@/firebase.js'

export default {
    name:'room',
    data() {
        return {
            player1:null,
            player2:null,
            username:null,
            userId:null,
            roomStatus:null,
        }
   
    },
    firebase:{
        players:db.ref('players'),
        rooms:db.ref('rooms'),
    },
    methods:{
        leave(key){
            this.$firebaseRefs.players.child(key).remove()
            this.$router.push({name:'lobby'})
        },
        start(){
            this.$router.push({name:'game',params:{userId:this.$route.params.id}})
        }
    },
    updated(){
        let key = this.$route.params.id
        let roomTemp = {}

        this.rooms.forEach(room => {
            if(room['.key'] === key) {
                roomTemp = room
            }
        })
        this.player1 = roomTemp.player1
        this.player2 = roomTemp.player2
    },
    mounted(){
        
        this.username = localStorage.getItem('username')
        this.userId = localStorage.getItem('userId')
        this.roomStatus = roomTemp.status
    }
}
</script>

<style scoped>
    body {
            background-image: url('../assets/background-game.jpg');
            background-size:cover;
            background-repeat: no-repeat;
        }
</style>
