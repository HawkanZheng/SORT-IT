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

// Get a reference to the database server.
let db = firebase.firestore();
let auth = firebase.auth();

//------------------------------------------------------
// SignUp
//------------------------------------------------------ 
function createUser() {

    let theEmail = document.getElementById('username');
    let pass = document.getElementById('password');

    let email = theEmail.value;
    let password = pass.value;

    auth.createUserWithEmailAndPassword(email, password).then(function () {

        // Send them to landing page
        location.replace('studyGuide.html');

    }).catch(function (error) {
        // Handle Errors here.
        if (password.length < 6) {
            window.alert('Password needs to be at least 6 characters.');
        }
        window.alert('That is Invalid');
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

//------------------------------------------------------
// Login 
//------------------------------------------------------ 
function login() {

    let theEmail = document.getElementById('username');
    let pass = document.getElementById('password');

    let email = theEmail.value;
    let password = pass.value;

    auth.signInWithEmailAndPassword(email, password).then(function () {
        let user = firebase.auth().currentUser;
        if (user == null) {
            // User not signed in.
            console.log("not logged in");
        } else {
            // user is signed in, send to game page.
            location.replace('studyGuide.html');
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        window.alert('Not a valid log in.');
        var errorMessage = error.message;
        // ...
    });
    // Store the users information into the database.
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
// Send new User to database
//------------------------------------------------------ 

let user = firebase.auth().currentUser;
let email, curentGame;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    console.log('logged in');

    // user information 
    userEmail = user.email;
    uid = user.uid;

    // Add the user info to the database.
    db.collection('Users').doc(uid).set({
        // CurrGameId: currentGame,
        email: userEmail,
        UID: uid
    }).then(function() {
        console.log('Doc successfully written!');
    }).catch(function(error) {
        console.error('Error writing document: ', error);
    })

    } else {
      // No user is signed in.
      console.log('not logged in');
    }
  });

//------------------------------------------------------
// Send Password Reset email
//------------------------------------------------------ 

// Reference firebase authentication
let auth = firebase.auth();

// Get the users email address.
let emailAddress = "user@example.com";

// Send the password reset email.
auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});

//------------------------------------------------------
// Update password
//------------------------------------------------------ 

// Grab the currently logged in user.
let user = firebase.auth().currentUser;

// Get the new password.
let newPassword = getASecureRandomPassword();

// Update the pasword in firestore.
user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});

//------------------------------------------------------
// Get User's profile information
//------------------------------------------------------ 

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  emailVerified = user.emailVerified;
  uid = user.uid;
}