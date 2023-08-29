import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    query, doc,
    orderBy,
    serverTimestamp,
    getDoc
}from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword
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

// queries
const q =  query(colRef, orderBy('createdAt'))

// real time collection data
const unsubCol = onSnapshot(q,colRef, (snapshot)=>{
   let users = []
   snapshot.docs.forEach((doc)=>{
     users.push({ ...doc.data(), id: doc.id })
   })
    console.log(users)
  })

// adding new user
const addNewUser = document.querySelector('.register');

addNewUser.addEventListener('submit', (e)=>{
    e.preventDefault();

    addDoc(colRef, {
        username: addNewUser.username.value,
        email: addNewUser.email.value,
        password:addNewUser.password.value,
        createdAt: serverTimestamp()
    })
    .then(()=>{
        addNewUser.reset()
    })
}) 

// get a singl document

const docRef = doc(db, 'users', "30R7HDWKq4zwfDchDk9l")

const unsubDoc = onSnapshot(docRef, (doc)=>{
    console.log(doc.data(), doc.id)
})


const signUpModal = document.querySelector('.register')
const successModal = document.getElementById('success-modal');
const closeModalButton = document.getElementById('close-modal');

signUpModal.addEventListener('submit', function (e) {
  e.preventDefault();

    // signing new users up
    const signUpForm = document.querySelector('.register')
    signUpForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const email = signUpForm.email.value
        const password = signUpForm.password.value

        createUserWithEmailAndPassword(auth, email, password )
        .then((Credential)=>{
            console.log(' user created', Credential.user);
            signUpForm.reset()
            
            // redirecting users to home page

            // window.location = "./index.html";

        })
        .catch((err)=>{
            console.log(err.message)
        })

    })

  showSuccessModal();

  setTimeout(() => {
    window.location = "./index.html";
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



// unsubscribe form db

// const UnsubscribeButton = document.querySelector(".unsubscribe")
// UnsubscribeButton.addEventListener('click', ()=>{  
//     console.log("unsubscribing")
//     unsubCol()
//     unsubDoc()
// })
// if(unsubCol && unsubDoc){
//     console.log('successfull')
// }else{
//     console.log(error);
// }