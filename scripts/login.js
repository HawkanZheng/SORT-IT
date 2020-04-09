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

  // Get a reference to firebase authentication.
  let auth = firebase.auth();

  // Creates a user using the email and password provided.
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
        location.replace('/html/homePage.html');
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

      // Get a reference to the database server.
      let db = firebase.firestore();

      // Add the user info to the database.
      db.collection('Users').doc(id).set({
        'Name': name,
        'School': school,
        'email': email,
        'UID': id, // Unique ID created when signup
        'ScoresHard': START_SCORE, // Starts at zero wins
        'ScoresEasy': START_SCORE // Starts at zero wins
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

  // Get a reference to firebase authentication.
  let auth = firebase.auth();

  // Gives authorization to log in if the email and password are valid.
  auth.signInWithEmailAndPassword(email, password).then(function () {

    // reference user in firebase authentication.
    let user = firebase.auth().currentUser;

    if (user == null) {
      // User not signed in.
      console.log("not logged in");
    } else {
      // user is signed in, send to game page.
      location.replace('/html/homePage.html');
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
    location.replace('index.html');
  }).catch(displayError);
}

//--------------------------------------------------------------------
// Users will automatically logout once they close the browser window.
//--------------------------------------------------------------------

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

// Function to open the navigation bar.
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

// Function close the navigation bar.
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

