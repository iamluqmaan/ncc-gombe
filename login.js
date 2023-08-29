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

console.log(colRef)

// logging in

const loginFormModal = document.querySelector('.login');
const successModal = document.getElementById('success-modal');
const closeModalButton = document.getElementById('close-modal');

loginFormModal.addEventListener('submit', function (e) {
  e.preventDefault();
  
    const loginForm = document.querySelector('.login')

    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const email = loginForm.email.value
        const password = loginForm.password.value

        signInWithEmailAndPassword(auth, email, password )
            .then((Credential)=>{
                console.log('userlogged in', Credential)
            })
            .catch((err)=>{
                console.log(err.message)
            })
    })

    // subscribing to auth changes
    onAuthStateChanged(auth, (user)=>{
        console.log('user status changed', user)
    })

  showSuccessModal();

  setTimeout(() => {
    window.location = "./Details.html";
    }, 3000);

});

closeModalButton.addEventListener('click', function () {
  closeSuccessModal();
});

function showSuccessModal() {
  successModal.style.display = 'block';
}

function closeSuccessModal() {
  successModal.style.display = 'none';
}
