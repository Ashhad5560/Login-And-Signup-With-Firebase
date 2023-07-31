import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, addDoc,doc,setDoc, getDocs ,getDoc , collection,  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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



let body = document.querySelector('body')
// let mainusers = document.getElementById('#mainusers')


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  let {firstname,signupemail,profileimage} = doc.data();
//   console.log(email,name,profileimage);
  let div =  document.createElement('div');
  console.log(div);
//   div.setAttribute("class" ,'usersMain')
  
  
  let userContent = 
`<div className="usersmain">
<div id="user">
  <h1>${firstname}</h1>
  <div class="userimage">
    <img
      src="/Login-And-Signup-With-Firebase/pic.JPG"
      height="100px"
      width="100px"
      alt=""
    />
  </div>
  <h4>${signupemail}</h4>
  <p id="userpara">
    <button id="btnusersame">Follow</button>
    <button id="btnusersame">profile</button>
  </p>
</div>
</div>`
    div.innerHTML = userContent;
    // console.log(div);
    body.appendChild(div);

});