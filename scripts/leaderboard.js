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

// Create a users reference.
let ref = db.collection('Users');

function welcome() {
    let user = auth.currentUser;

    ref.get().then(function(doc) {
        console.log(doc.data());
    })

    let message = document.getElementById('welcome');

    message.innerHTML = 'Welcome to BlahBlahBlah ' + user.email;
}

//------------------------------------------------------------
// Leaderboards
//------------------------------------------------------------

// Max number of players to display on leaderboard.
const TOP_PLAYERS = 10;

// Create a leaderboards reference.
let leaders = db.collection('Users');

// Get leaderboard element.
let boards = document.getElementById('leaderboards');

function leaderboard() {
    let topTen = leaders.orderBy('wins', 'desc').limit(TOP_PLAYERS);

    let i = 1;

    // Create a row element
    let list = document.createElement('ol');
    list.setAttribute('list-style-type', 'none');

    topTen.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let players = doc.data();

            console.log(players);
            // Create a cell element.
            let item = document.createElement('li');

            // Set the contents.
            item.appendChild(document.createTextNode(players.email
                + ', ' + 'Wins: ' + players.wins));

            // Add it to the list.
            list.appendChild(item);

             // Gives each user a rank.
             i++;
        })
    });
    
    // Append the list.
    boards.appendChild(list);
}

leaderboard();