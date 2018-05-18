<template>
     <table class="table table-striped table-dark">
        <thead>
            <tr class="col-sm-12">
                <th scope="col">Player</th>
                <th scope="col" ></th>
            </tr>
        </thead>
        <tbody>
          
        </tbody>
    </table>
</template>

<script>
import {db} from '@/firebase.js'

export default {
    name:'room',
    data() {
        return {
            player1:null,
            player2:null,
        }
   
    },
    firebase:{
        players:db.ref('players'),
        rooms:db.ref('rooms'),
        roomPlayers: db.ref('rooms/-LCiNvC7HFZOcPP8bVvI')
    },
    methods:{
        ready(index,key){
        },
        leave(key){
             this.$firebaseRefs.players.child(key).remove()
            this.$router.push({name:'lobby'})
        }
    },
    updated(){
        if(this.players.length==2){
            this.$router.push({name:'game'})
        }
    },
    updated(){
          this.user = localStorage.getItem('userId')
        // if(this.players.length==2){
        //     this.$router.push({name:'game'})
        // }
            
    },
    mounted(){
        console.log('masuk')
        // localStorage.setItem('userId','-LCickiSUotdzCk_pMqW')
         this.user = localStorage.getItem('userId')
         console.log(this.rooms)
         console.log(this.roomPlayers[1]['.value'])
         console.log(this.roomPlayers[2]['.value'])
         console.log(this.$route.params.id)
        //  this.$firebaseRefs.rooms.child('-LCiNvC7HFZOcPP8bVvI').on('value',function(snapshot){
        //      console.log(snapshot.val())
        //      this.player1 = snapshot.val().player1
        //      this.player2 = snapshot.val().player2
        //     //  this.roomPlayers.push(snapshot.val().player2)
             
        //  })
        //  console.log(this.player1)
         
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
