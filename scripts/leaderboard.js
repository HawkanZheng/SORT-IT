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

// Go to the game page.
function playGame() {
    location.replace('game.html'); // Sent to game page.
}

//------------------------------------------------------------
// Welcome message 
//------------------------------------------------------------

// // Create a users reference.
// let ref = db.collection('Users');

// function welcome() {
//     let user = auth.currentUser;

//     ref.get().then(function(doc) {
//         console.log(doc.data());
//     })

//     let message = document.getElementById('welcome');

//     message.innerHTML = 'Welcome to BlahBlahBlah ' + user.email;
// }

//------------------------------------------------------------
// Leaderboards
//------------------------------------------------------------

// Max number of players to display on leaderboard.
const TOP_PLAYERS = 10;

// Get leaderboard element.
let boards = document.getElementById('leaderboards');

//------------------ Default Shows Easy Leaderboard ------------------------//

// Add leaderboard information to the page.
function leaderboard() {

    // Create a leaderboards reference.
    let leaders = db.collection('Easy_Leaderboard');

    // Organize users based on their score.
    let topTen = leaders.orderBy('Score', 'desc').limit(TOP_PLAYERS);

    let place = 1; // Rank amongst other users.

    // Get the top 10 players based on their score, in descending order.
    topTen.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let players = doc.data();

            // Create a cell element.
            boards.innerHTML += '<tr>' +
                '<td>' + place + '<td>' +
                players.Name + '<td>' +
                players.Score + '<td>' +
                players.School + '<td>'+
                '<tr>';

            // increment the users rank.
            place++;
        })
    })
}

// Call the function.
leaderboard();

//------------------ Choose to show Hard Leaderboard ------------------------//

// Add leaderboard information to the page.
function hardLeaders() {

    // Create a hard leaderboard reference
    let leaders = db.collection('Hard_Leaderboard');

    // Organize users based on their score.
    let topTen = leaders.orderBy('Score', 'desc').limit(TOP_PLAYERS);

    let place = 1; // Rank amongst other users.

    // Get the top 10 players based on their score, in descending order.
    topTen.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let players = doc.data();

            // Create a cell element.
            boards.innerHTML += '<tr>' +
                '<td>' + place + '<td>' +
                players.Name + '<td>' +
                players.Score + '<td>' +
                players.School + '<td>'+
                '<tr>';

            // increment the users rank.
            place++;
        })
    })
}

//------------------------------------------------------
// Add Game
//------------------------------------------------------ 

function addGame(outcome) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Get the currently signed in users UID
            let id = user.uid;

            // Create reference for database.
            let db = firebase.firestore();

            // Create reference for Users collection.
            let ref = db.collection('Users');

            // Get user data.
            ref.doc(id).get().then(function (doc) {

                let highScore = doc.data().HighScore; // Assign the users current wins
                let gamesPlayed = doc.data().GamesPlayed; // Grab number of games played.

                gamesPlayed++; // increment games played.

                // Create a time stamp for the game.
                let date = new Date();
                let timestamp = date.getTime();

                // Check if the game score is greater than the users current highscore.
                if (outcome > highScore) {
                    highScore = outcome; // Increment wins
                } else {
                    highScore = prevScore; // Increment losses
                }

                // Update the users wins, loses, and last time played.
                ref.doc(id).update({
                    'LastTimePlayed': timestamp,
                    'GamesPlayed': gamesPlayed,
                    'HighScore': highScore
                }).then(function () {
                    // Send to landing page.
                    location.replace('homePage.html');

                    // log an error in the console.
                }).catch(function (error) {
                    console.error('Error creating game: ', error);
                    window.alert('Error Game failed to uplaod to server.');

                    // Send to landing page.
                    location.replace('homePage.html');
                });
            })
        } else {
            // If no user is signed in.
            console.log('no user');
        }
    })
}
