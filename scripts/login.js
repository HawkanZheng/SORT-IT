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

// // Get a reference to the database server.
let db = firebase.firestore();
let auth = firebase.auth();

//------------------------------------------------------
// SignUp
//------------------------------------------------------ 
function createUser() {

  document.getElementById("myNav").style.height = "0%"
  // Grabs dom element references.
  let theEmail = document.getElementById('email');
  let pass = document.getElementById('password');

  // Sets the values for the email and password.
  let email = theEmail.value;
  let password = pass.value;

  auth.createUserWithEmailAndPassword(email, password).then(function () {

    // Gives authorization to log in if the email and password are valid.
    auth.signInWithEmailAndPassword(email, password).then(function () {

      // reference to firebase authentication.
      let user = firebase.auth().currentUser;

      if (user == null) {
        // User not signed in.
        console.log("not logged in");
      } else {
        // user is signed in, send to game page.
        window.location.replace('homePage.html');
      }
    }).catch(function (error) {
      window.alert(error.message);
    });

  }).catch(function (error) {
    // Handle Errors here.
    if (password.length < 6) {
      window.alert('Password needs to be at least 6 characters.');
    }
    window.alert(error.message);
  });
}

//------------------------------------------------------
// Send new User to database
//------------------------------------------------------ 

// Reference to the authentication in firestore.
let user = firebase.auth().currentUser;

// Declares variables used to store user info in the database.
let email, name, school;
const START_SCORE = 0;

// Checks for changes in the signed in user.
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let checkUser = true;
    db.collection('Users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.data().UID == user.uid) {
          checkUser = false;    
          console.log(checkUser);
        }
      })
    });
    if (checkUser) {
      // Grabs user info from firestore.
      email = user.email;
      id = user.uid;

      // Grab DOM element info.
      name = document.getElementById("name").value;
      school = document.getElementById("school").value;

      // Add the user info to the database.
      db.collection('Users').doc(id).set({
        'Name': name,
        'School': school,
        'email': email,
        'UID': id, // Unique ID created when signup
        'Scores.Hard': START_SCORE, // Starts at zero wins
        'Scores.Easy': START_SCORE // Starts at zero wins
      }).then(function () {
        console.log('Doc successfully written!');
      }).catch(function (error) {
        console.error('Error writing document: ', error);
      });
    } else {
      // No user is signed in.
      console.log('already has an account.');
    }
  }
});


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
      window.location.replace('homePage.html');
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
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  // If they put in the correct password, promt to type in new pasword.
  if (knowPass) {

    let newPassword;
    // Get the new password.
    let newPasswordOne = document.getElementById("newPassw").value;
    let newPasswordTwo = document.getElementById("confirm").value;

    if (newPasswordOne == newPasswordTwo) {
      newPassword = newPasswordOne;
    }

    // Update the pasword in firestore.
    user.updatePassword(newPassword).then(function () {
      // Update successful.
      window.alert("Your password has been reset.");
    }).catch(function (error) {
      // An error happened.
      console.log('error');
    });
  }
}

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

//------------------------------------------------------
// My Account Stuff
//------------------------------------------------------ 



//------------------------------------------------------
// Send Password Reset email
//------------------------------------------------------ 

// // Get the users email address.
// let emailAddress = document.getElementById("resetEmail").value;

// // Send the password reset email.
// auth.sendPasswordResetEmail(emailAddress).then(function () {
//   // Email sent.
//   window.alert("An email has been sent!");
// }).catch(function (error) {
//   // An error happened.
//   console.log('error');
// });

// //------------------------------------------------------
// // Get User's profile information
// //------------------------------------------------------ 

// // var user = firebase.auth().currentUser;
// // var name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   emailVerified = user.emailVerified;
//   uid = user.uid;
// }