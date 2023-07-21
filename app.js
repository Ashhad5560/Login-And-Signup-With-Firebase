// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore,addDoc,doc,setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWytg80JBULz8HiNUs0KRadCmVyA2KgC8",
  authDomain: "social-media-app-4a904.firebaseapp.com",
  projectId: "social-media-app-4a904",
  storageBucket: "social-media-app-4a904.appspot.com",
  messagingSenderId: "856488660664",
  appId: "1:856488660664:web:540b138d2bc6e541142e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const firstname = document.querySelector('#firstName')
// console.log(firstname);
const surname = document.querySelector('#surName')
// console.log(surname);
const signupemail = document.querySelector('#email-MobNum')
// console.log(signupemail);
const mobilenum = document.querySelector('#userMobNum')
// console.log(mobilenum);
const password = document.querySelector('#new-Password')
// console.log(password);

const signupbtn = document.querySelector('#signup-btn')
// console.log(signupbtn);

const loginBtn  = document.querySelector('#loginBtn')
// console.log(loginBtn);

signupbtn.addEventListener('click', signuphandler)

 function signuphandler () {
       createUserWithEmailAndPassword(auth, signupemail.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    if (user) {
      adddata (user.uid);    
      fieldempty ();
    }
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });

}

function fieldempty () {
    firstname.value = ''
    surname.value = ''
    signupemail.value = ''
    mobilenum.value = ''
    password.value = ''
}


// function loginfieldempty () {
//   setTimeout(() => {
//     loginfieldempty() 
//   }, 10000);
//   loginEmailAddress.value = ''
//   loginPassword.value = ''
// }


 async function adddata (uid) {
    try {
        const docRef = await setDoc(doc(db, "users",uid), {
            firstname : firstname.value,
            surname : surname.value,
            signupemail :  signupemail.value, 
            mobilenum : mobilenum.value
        });
      
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
}

 const loginEmailAddress = document.querySelector('#loginEmailAddress')
//  console.log(loginEmailAddress)
 const loginPassword = document.querySelector('#loginPassword')
//  console.log(loginPassword)

loginBtn.addEventListener('click', loginhandler)


function  loginhandler (){
  signInWithEmailAndPassword(auth, loginEmailAddress.value,  loginPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log(user)
    if (user) {
      // loginfieldempty ()
      window.location.href = '../dashboard/dashboard.html'
      
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  

}

