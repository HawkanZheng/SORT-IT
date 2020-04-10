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

//--------------------CONSTANTS------------------------//
const START_SCORE = 0;

// Creates new user.
function createUser() {

  // Get a reference to the firestore authentication.
  let auth = firebase.auth();

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

//Add user info to user collection on database
function addUserInfo(user) {

  // Get a reference to the database server.
  let db = firebase.firestore();

  // Grabs user info from firestore.
  let email = user.email;
  let id = user.uid;

  // Grab DOM element info.
  let name = document.getElementById("name").value;
  let school = document.getElementById("school").value;

  // Add new User to database.
  db.collection('Users').doc(id).set({
    'Name': name,
    'School': school,
    'email': email,
    'UID': id, // Unique ID created when signup
  }).then(function () {
    window.location.replace('/html/homePage.html');
    console.log('Doc successfully written!');
  }).catch(function (error) {
    console.error('Error writing document: ', error);
  });
}

// Function to handle login for user.
function login() {

  // Get a reference to the firestore authentication.
  let auth = firebase.auth();

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

// Logs user out
function logout() {
  firebase.auth().signOut().then(function () {
    window.location.replace('index.html');
  }).catch(displayError);
}

// Users will automatically log out when they close browser window.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    // Existing and future Auth states are now persisted in the current
    // session only.
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

//-------------------NAVBAR SECTION---------------------//

// Opens the nav bar
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

// Closes the nav bar
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}