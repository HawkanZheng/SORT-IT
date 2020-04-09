//--------------------------------------------------------------
// Your web app's Firebase configuration
//--------------------------------------------------------------
let config = {
  apiKey: "AIzaSyCI3tPf61sTY3nLoHJG7P8TGBakZU69o3w",
  authDomain: "comp-1800-94b18.firebaseapp.com",
  databaseURL: "https://comp-1800-94b18.firebaseio.com",
  projectId: "comp-1800-94b18",
  storageBucket: "comp-1800-94b18.appspot.com",
  messagingSenderId: "254451731238",
  appId: "1:254451731238:web:ff1e74fe12719d02740fe7"
};
// Initialize Firebase
firebase.initializeApp(config);

//Score of new account
const START_SCORE = 0;

// // Get a reference to the database server.
let db = firebase.firestore();
let auth = firebase.auth();

//------------------------------------------------------
// SignUp
//------------------------------------------------------ 
function createUser() {
  // Grabs dom element references.
  let theEmail = document.getElementById('newEmail');
  let pass = document.getElementById('newPassword');

  // Sets the values for the email and password.
  let email = theEmail.value;
  let password = pass.value;

  auth.createUserWithEmailAndPassword(email, password).then(function () {

    // Gives authorization to log in if the email and password are valid.
    auth.signInWithEmailAndPassword(email, password).then(function () {
      document.getElementById("myNav").style.height = "0%";
      // reference to firebase authentication.
      let user = firebase.auth().currentUser;

      if (user == null) {
        // User not signed in.
        console.log("not logged in");
      } else {
        // user is signed in, send to game page.
        addUserInfo(user);
      }
    }).catch(function (error) {
      window.alert(error.message);
    });

  }).catch(function (error) {
    // Handle Errors here.
    if (password.length < 6) {
      window.alert('Password needs to be at least 6 characters.');
    } else {
      window.alert(error.message);
    }
  });
}

//------------------------------------------------------
// Send new User to database
//------------------------------------------------------ 

//Add user info to user collection on database
function addUserInfo(user) {
  // Grabs user info from firestore.
  let email = user.email;
  let id = user.uid;

  // Grab DOM element info.
  let name = document.getElementById("name").value;
  let school = document.getElementById("school").value;
  db.collection('Users').doc(id).set({
    'Name': name,
    'School': school,
    'email': email,
    'UID': id, // Unique ID created when signup
    'ScoresHard': START_SCORE, // Starts at zero wins
    'ScoresEasy': START_SCORE // Starts at zero wins
  }).then(function () {
    window.location.replace('/html/homePage.html');
    console.log('Doc successfully written!');
  }).catch(function (error) {
    console.error('Error writing document: ', error);
  });
}

//------------------------------------------------------
// Login 
//------------------------------------------------------ 
// Function to handle login for user.
function login() {

  // Grabs the DOM elements.
  let theEmail = document.getElementById('email');
  let pass = document.getElementById('password');

  // Stores the typed in info into variables.
  let email = theEmail.value;
  let password = pass.value;

  // Gives authorization to log in if the email and password are valid.
  auth.signInWithEmailAndPassword(email, password).then(function () {

    // reference user in firebase authentication.
    let user = firebase.auth().currentUser;

    if (user == null) {
      // User not signed in.
      console.log("not logged in");
    } else {
      // user is signed in, send to game page.
      window.location.replace('/html/homePage.html');
    }
  }).catch(function (error) {
    // Handle Errors here.
    window.alert(error.message);
  });
}

//------------------------------------------------------
// Logout
//------------------------------------------------------ 
function logout() {
  firebase.auth().signOut().then(function () {
    window.location.replace('index.html');
  }).catch(displayError);
}

//------------------------------------------------------
// Update password
//------------------------------------------------------ 

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}