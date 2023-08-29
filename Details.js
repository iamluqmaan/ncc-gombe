import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
}from 'firebase/firestore'

import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyANk07uNTekWglVNoLBHE6dhTkQ7xPaTWM",
    authDomain: "ncctechparkgombe.firebaseapp.com",
    projectId: "ncctechparkgombe",
    storageBucket: "ncctechparkgombe.appspot.com",
    messagingSenderId: "40183315709",
    appId: "1:40183315709:web:033746fc7cd68fa7e05294"
  };

  initializeApp(firebaseConfig)

  // init DataBase
  const db = getFirestore()
  const auth = getAuth()

  //   collection Ref
const colRef = collection(db, 'users')

onAuthStateChanged(auth, (user)=>{
    console.log('user status changed', user)
})

// logging out
const logoutButton = document.querySelector('.logout')

logoutButton.addEventListener('click', ()=>{
    signOut(auth)
    .then(()=>{
        setTimeout(() => {
            window.location = "./index.html";
            }, 100);
    })
    .catch((err)=>{
        console.log(err.messag )
    })
   
})


function updateClock() {
    const clockElement = document.getElementById('clock');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const meridian = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    
    const timeString = `${hours12}:${padZero(minutes)}:${padZero(seconds)} ${meridian}`;
    clockElement.textContent = timeString;
  }

  function padZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  // Update the clock every second
  setInterval(updateClock, 1000);

  // Initialize the clock

  updateClock();

