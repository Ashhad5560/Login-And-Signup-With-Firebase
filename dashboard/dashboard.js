import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, addDoc,doc,setDoc, getDocs ,getDoc , collection } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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
const postBtn = document.querySelector('.postBtn')
// console.log(postBtn);
const inputText = document.querySelector('#input-text')
// console.log(inputtext);
const postArea = document.querySelector('#postArea')
// console.log(postArea);


let loggedInUser;


onAuthStateChanged(auth,async (user) => {
    if (user) {
      
        // console.log(user)
      const uid = user.uid;
      loggedInUser = uid
      // console.log(loggodinuser);
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


postBtn.addEventListener('click', posthandler)

function posthandler() {
  storePost()
  createPost()
}


 async function storePost(){
  try {
    const docRef = await addDoc(collection(db, "posts"), {
     postContent: inputText.value,
     author: loggedInUser
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
  
}


async function createPost() {

  postArea.innerHTML = ''

  const querySnapshot = await getDocs(db, 'posts');
  querySnapshot.forEach((doc) => {
    const {postContent, author} = doc.data() 
       // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());


    let div = document.createElement('div')
    div.setAttribute('container shadow mt-3 p-3 mb-5 bg-body rounded')
    div.innerHTML = `   <div class="row">
    <div class="col">
        <div class="full-box">
            <h6 class="account-title-name  ">
                <img src="https://scontent.fkhi4-3.fna.fbcdn.net/v/t39.30808-6/344859260_9764027536941505_5188833060278820647_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH7vxBxRC8BIXXDfKxmKp_QIQqlHeM23VkhCqUd4zbdWUQP10T73idj9leNJ4HhuNE3NEJ2L2biQphwS3SpwqfO&_nc_ohc=Ev9NJMTiCH8AX9tS5LP&_nc_oc=AQm3HNrP-TdlBksGX79ATJtssRpdwujV4v09mFkqiz8fflH_efOIfbCadtWmLeq6I70&_nc_zt=23&_nc_ht=scontent.fkhi4-3.fna&oh=00_AfBVdO1b8Yk6YnFz6w6L08gRX270M3_UhUPeWLMuTQEWvg&oe=648F185F"
                    alt="" width="35px" class="rounded-circle">
                <span class="user-name ps-2 "> <a href="../profile/profile.html"
                        class="text-dark User_name">Muhammad Ashhad khan</a> </span> <br>
            </h6>
            <span class="time ps-5 fs-6 mb-0"><a href="" class="text-dark">5h</a> <i
                    class="fa-solid fa-globe"></i></span>
            <div class="description ps-2">
                Hey ! Welcome to my Facebook App. “I don’t know where I’m going, but I’m on my
                way.”
            </div>
            <div class="post">
                <img src="./assets/edit underwater.jpg " alt="" class="">
            </div>
            <div class="like-share d-flex justify-content-around align-items-center">
                <div class="lik-box ">
                    <img src="./assets/Edit like thumbsup.jpg" alt="" width="30px">
                    <span class="like-text"> <strong>Like</strong></span>
                </div>
                <div class="comment-box ">
                    <img src="./assets/comment.png" alt="" width="40px">
                    <span> <strong>Comment</strong></span>
                </div>
                <div class="share-box">
                    <img src="./assets/Share edit.jpg" alt="" width="55px">
                    <span> <strong>Share</strong></span>
                </div>
            </div>
        </div>
    </div>


</div>`
postArea.prepend(div)
inputText.Value = ''
  });
}


