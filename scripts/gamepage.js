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


//---------------------------------CONSTANTS-----------------------------------//
//1 second in milliseconds
const SECONDS = 1000;
//Number of question categories
const CATEGORIES = 4;
//Number of questions per easy category
const EASYSELECT = 4;
//Number of questions per hard category
const HARDSELECT = 8;
//------------------------------GLOBAL VARIABLES------------------------------//
//Difficulty level for game, 0: easy, 1: hard
let difficulty = 0;
//3 second start countdown timer
let startTime = 3;
//Time for easy 30 second timer
let easyTime = 30;
//Time for hard 45 second timer
let hardTime = 45;
//Easy and Hard timers
let easyTimer;
let hardTimer;
//Start Timer
let startTimer = setInterval(startCountdown, SECONDS);
//Start clock timer
let startClock = document.getElementById("startClock");
//Game clock timer
let gameClock = document.getElementById("clock");
//User's score
let score = 0;

//Question image
let question = document.getElementById("question");
//Current question category
let currCategory;

//----------------------------IMAGE SRC ARRAYS-------------------------------//
//Array for compost img src on easy difficulty, size 4
let easyCompostArr = [];
//Array for plastic and paper img src on easy difficulty, size 4
let easyPlaPapArr = [];
//Array for e-waste img src on easy difficulty, size 4
let easyEwasteArr = ["images/ewaste/cellphone.png", "images/ewaste/laptop.png", "images/ewaste/controller.png", "images/ewaste/headphone.png"];
//Array for trash img src on easy difficulty, size 4
let easyTrashArr = [];
//Array for compost img src on easy difficulty, size 8
let hardCompostArr = [];
//Array for plastic and paper img src on easy difficulty, size 8
let hardPlaPapArr = [];
//Array for e-waste img src on easy difficulty, size 8
let hardEwasteArr = ["images/ewaste/cellphone.png", "images/ewaste/laptop.png", "images/ewaste/controller.png", "images/ewaste/headphone.png",
                    "images/ewaste/tv.png", "images/ewaste/microwave.png", "images/ewaste/keyboard.png", "images/ewaste/battery.png"];
//Array for trash img src on easy difficulty, size 8
let hardTrashArr = [];

//------------------------------TIMER FUNCTIONS--------------------------------------//
//Countdown function for easy timer
function easyCountdown(){
    gameClock.innerHTML = easyTime;
    if(easyTime == 0){
        clearInterval(easyTimer);
        //Game over
        gameOver();
        //Send score to server
    } else {
        easyTime--;
    }
}
//Countdown function for hard timer
function hardCountdown(){
    gameClock.innerHTML = hardTime;
    if(hardTime == 0){
        clearInterval(hardTimer);
        //Game over
        gameOver();
        //Send score to server
    } else {
        hardTime--;
    }
}

//Countdown for start game
function startCountdown(){
    startClock.innerHTML = startTime;
    if(startTime == 0){
        //Show GO!
        startClock.innerHTML = "GO!";
        startTime--;
    } else if(startTime < 0) {
        clearInterval(startTimer);
        //Hide start coundown and show gameplay UI
        startGame(); 
    } else {
        startTime--;
    }
}


//--------------------------ONCLICK FUNCTIONS-------------------------------//
//Onclick function for the four answer buttons
function answerSelect(){
    //If selected correct category increment score
    if(this.id == currCategory){
        score++;
    }
    //Change question
    setRandomQuestion();
}

//Onclick function to quit game and return to homepage
function quitGame(){
    location.replace("HTML Shell/homePage.html");
}

//Start game
function startGame(){
    //Dipslay game UI
    showGame();
    //Start easy timer
    if(difficulty == 0){
        easyTimer = setInterval(easyCountdown, SECONDS);
    //Start hard timer        
    } else {
        hardTimer = setInterval(hardCountdown, SECONDS);
    }
  
    setRandomQuestion();
}

//-------------------------------GAMEPLAY FUNCTIONS---------------------------------//
//Generate random number between 1 and 4 to determine the category of question
//1. Compost, 2. Plastic & Paper, 3. E-waste, 4. Trash
function randomCategory(){
    return Math.ceil(Math.random(CATEGORIES));
}

//Get a random img for the question from the array of img src
function getRandomQuestion(arr){
    let index = Math.floor(Math.random(arr.length));
    return arr[index];
}

//Sets question image to random question
function setRandomQuestion(){
    //1. Compost, 2. Plastic & Paper, 3. E-waste, 4. Trash
    switch(randomCategory()){
        //Compost
        case 1:
            //set current category
            currCategory = "compost";
            //Easy
            if(difficulty == 0){
                question.src = getRandomQuestion(easyCompostArr);
            //Hard
            } else{
                question.src = getRandomQuestion(hardCompostArr);
            }
            break;
        //Plastic & Paper
        case 2:
            //set current category
            currCategory = "paper";
            //Easy
            if(difficulty == 0){
                question.src = getRandomQuestion(easyPlaPapArr);
            //Hard
            } else{
                question.src = getRandomQuestion(hardPlaPapArr);
            }
            break;
        //E-waste
        case 3:
            //set current category
            currCategory = "ewaste";
            //Easy
            if(difficulty == 0){
                question.src = getRandomQuestion(easyEwasteArr);
            //Hard
            } else{
                question.src = getRandomQuestion(hardEwasteArr);
            }
            break;
        //Trash
        case 4:
            //set current category
            currCategory = "trash";
            //Easy
            if(difficulty == 0){
                question.src = getRandomQuestion(easyTrashArr);
            //Hard
            } else{
                question.src = getRandomQuestion(hardTrashArr);
            }
            break;  
    }
}

//Hide start clock and show game UI
function showGame(){
    //Hide start clock
    startClock.style.display = "none";
    //Show game UI
    let gameUI = document.getElementsByClassName("gameplay");
    for(let i = 0; i < gameUI.length; i++){
        gameUI[i].style.display = "block";
    }
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
                    'Scores.Hard': highScore,
                    'Scores.Easy': highScore
                }).then(function () {
                    // Send to landing page.
                    location.replace('homePage.html');

                    // log an error in the console.
                }).catch(function (error) {
                    console.error('Error creating game: ', error);

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

//------------------------------------------------------
// Add Score to Easy Leaderboard
//------------------------------------------------------ 

// Add the users score to the Easy_Leaderboard collection.
function addEasyGame(easyScore) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Get the currently signed in users UID
            let id = user.uid;
    
            // Create reference for database.
            let db = firebase.firestore();
    
            // Create reference for Users collection.
            let ref = db.collection('Easy_Leaderboard');
    
            // Get user data.
            ref.doc(id).then(function (doc) {
    
                // Update the users wins, loses, and last time played.
                ref.doc(id).set({
                    'Name': timestamp,
                    'School': gamesPlayed,
                    'Score': easyScore // Set to game score.
                }).then(function () {
                    // Send to landing page.
                    location.replace('homePage.html');
    
                    // log an error in the console.
                }).catch(function (error) {
                    console.error('Error adding game: ', error);
    
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

//------------------------------------------------------
// Add Score to Hard Leaderboard
//------------------------------------------------------ 

// Add the users score to the Hard_Leaderboard collection.
function addHardGame(hardScore) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Get the currently signed in users UID
            let id = user.uid;
            
            console.log(id);
            // Create reference for database.
            let db = firebase.firestore();
    
            // Create reference for Users collection.
            let ref = db.collection('Hard_Leaderboard');
    
            ref.doc(id).get().then(function (doc) {

                console.log(user);
                
                let name = doc.data().Name;
                let school = doc.data().School;

                // Update the users wins, loses, and last time played.
                ref.doc().set({
                    'Name': name,
                    'School': school,
                    'Score': hardScore // Set to game score.
                }).then(function () {
                    // Send to landing page.
                    location.replace('homePage.html');
    
                    // log an error in the console.
                }).catch(function (error) {
                    console.error('Error adding game: ', error);
    
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

addHardGame(12);

function gameOver(){
    location.replace("HTML Shell/homePage.html");
}
