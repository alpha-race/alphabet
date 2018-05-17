import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyAtLMt0QxmEdAVjxos9GUzzk5GGC5TvVxk",
  authDomain: "alphabet-race-52c34.firebaseapp.com",
  databaseURL: "https://alphabet-race-52c34.firebaseio.com",
  projectId: "alphabet-race-52c34",
  storageBucket: "alphabet-race-52c34.appspot.com",
  messagingSenderId: "1091528537001"
})

export const db = app.database()
