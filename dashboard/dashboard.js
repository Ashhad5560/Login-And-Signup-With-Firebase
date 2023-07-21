import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore,addDoc,doc,setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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


const Username = document.querySelector('.User_name')
// console,console.log(Username);



onAuthStateChanged(auth,async (user) => {
    if (user) {
      
        // console.log(user)
      const uid = user.uid;
    //   console.log(uid);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    const {firstname , surname } = docSnap.data()
    Username.innerHTML = `${firstname} ${surname}`

    } else {
      // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
  

    }

    } else {
      // User is signed out
     window.location.href = '../index.html'
    }
  });



  const logoutBtn = document.querySelector('#logoutBtn')
//   console.log(logoutBtn);

logoutBtn.addEventListener('click',  logouthandler)


function logouthandler () {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}