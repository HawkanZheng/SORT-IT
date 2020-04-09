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

//------------------------------------------------------------
// Leaderboards (EASY AND HARD)
//------------------------------------------------------------

// Max number of players to display on leaderboard.
const TOP_PLAYERS = 10;

//------------------ Choose to show Easy Leaderboard ------------------------//

// Add leaderboard information to the page.
function getEasyLeaders() {

    // Get leaderboard element.
    let boards = document.getElementById('easy_leaderboards');

    // Create a leaderboards reference.
    let leaders = db.collection('Users');

    // Organize users based on their score.
    let topTen = leaders.orderBy('ScoresEasy', 'desc').limit(TOP_PLAYERS);

    let place = 1; // Rank amongst other users.

    // Get the top 10 players based on their score, in descending order.
    topTen.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let players = doc.data();

            // Create a cell element.
            boards.innerHTML += '<tr>' +
                '<td>' + place + '<td>' +
                players.Name + '<td>' +
                players.ScoresEasy + '<td>' +
                players.School + '<td>' +
                '<tr>';

            // increment the users rank.
            place++;
        })
    })
}

// Call the function.
getEasyLeaders();

//------------------ Choose to show Hard Leaderboard ------------------------//

// Add leaderboard information to the page.
function getHardLeaders() {

    // Get leaderboard element.
    let boards = document.getElementById('hard_leaderboards');

    // Create a hard leaderboard reference
    let leaders = db.collection('Users');

    // Organize users based on their score.
    let topTen = leaders.orderBy('ScoresHard', 'desc').limit(TOP_PLAYERS);

    let place = 1; // Rank amongst other users.

    // Get the top 10 players based on their score, in descending order.
    topTen.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let players = doc.data();

            // Create a cell element.
            boards.innerHTML += '<tr>' +
                '<td>' + place + '<td>' +
                players.Name + '<td>' +
                players.ScoresHard + '<td>' +
                players.School + '<td>' +
                '<tr>';

            // increment the users rank.
            place++;
        })
    })
}

// Call the function.
getHardLeaders();

// Sends user to the leaderboard page.
function getHome() {
    location.replace('homePage.html');
}

// Hides pop up menu.
function hidePop() {
    document.getElementById("myNav").style.height = "0%";
}