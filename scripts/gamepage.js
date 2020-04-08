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
let difficulty = 1;
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
let startTimer;
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

//Buttons
let trashButton = document.getElementById("trash");
let compostButton = document.getElementById("compost");
let plapapButton = document.getElementById("paper");
let ewasteButton = document.getElementById("ewaste");

//Score display
let scoreDisplay = document.getElementById("score");

//----------------------------IMAGE SRC ARRAYS-------------------------------//
//Array for compost img src on easy difficulty, size 4
let easyCompostArr = ["../images/compost/apple.png", "../images/compost/banana.png", "../images/compost/eggshell.png", "../images/compost/strawberry.png"];
//Array for plastic and paper img src on easy difficulty, size 4
let easyPlaPapArr = ["../images/p&p/cerealBox.png", "../images/p&p/waterbottle.png", "../images/p&p/magazine.png", "../images/p&p/newspaper.png"];
//Array for e-waste img src on easy difficulty, size 4
let easyEwasteArr = ["../images/e-waste/cellphone.png", "../images/e-waste/laptop.png", "../images/e-waste/controller.png", "../images/e-waste/headphone.png"];
//Array for trash img src on easy difficulty, size 4
let easyTrashArr = ["../images/trash/chipbag.png", "../images/trash/straw.png", "../images/trash/candywrapper.png", "../images/trash/erasers.png"];
//Array for compost img src on easy difficulty, size 8
let hardCompostArr = ["../images/compost/apple.png", "../images/compost/banana.png", "../images/compost/eggshell.png", "../images/compost/strawberry.png",
    "../images/compost/bones.png", "../images/compost/leaves.png", "../images/compost/fishbone.png", "../images/compost/watermelon.png"
];
//Array for plastic and paper img src on easy difficulty, size 8
let hardPlaPapArr = ["../images/p&p/cerealBox.png", "../images/p&p/waterbottle.png", "../images/p&p/magazine.png", "../images/p&p/newspaper.png",
    "../images/p&p/box.png", "../images/p&p/milk.png", "../images/p&p/milkjug.png", "../images/p&p/envelope.png"
];
//Array for e-waste img src on easy difficulty, size 8
let hardEwasteArr = ["../images/e-waste/cellphone.png", "../images/e-waste/laptop.png", "../images/e-waste/controller.png", "../images/e-waste/headphone.png",
    "../images/e-waste/tv.png", "../images/e-waste/microwave.png", "../images/e-waste/keyboard.png", "../images/e-waste/battery.png"
];
//Array for trash img src on easy difficulty, size 8
let hardTrashArr = ["../images/trash/chipbag.png", "../images/trash/straw.png", "../images/trash/candywrapper.png", "../images/trash/erasers.png",
    "../images/trash/gluestick.png", "../images/trash/medicalmask.png", "../images/trash/toiletpaper.webp", "../images/trash/pencil.png"
];

//------------------------------TIMER FUNCTIONS--------------------------------------//
//Countdown function for easy timer
function easyCountdown() {
    gameClock.innerHTML = easyTime;
    if (easyTime == 0) {
        clearInterval(easyTimer);
        //Game over
        gameOver();
    } else {
        easyTime--;
    }
}
//Countdown function for hard timer
function hardCountdown() {
    gameClock.innerHTML = hardTime;
    if (hardTime == 0) {
        clearInterval(hardTimer);
        //Game over
        gameOver();
    } else {
        hardTime--;
    }
}

//Countdown for start game
function startCountdown() {
    startClock.innerHTML = startTime;
    if (startTime == 0) {
        //Show GO!
        startClock.innerHTML = "GO!";
        startTime--;
    } else if (startTime < 0) {
        clearInterval(startTimer);
        //Hide start coundown and show gameplay UI
        startGame();
    } else {
        startTime--;
    }
}


//--------------------------ONCLICK FUNCTIONS-------------------------------//
//Onclick function for the four answer buttons
function answerSelect() {
    //If selected correct category increment score
    console.log(this.id);
    if (this.id == currCategory) {
        score++;

        //Update score display
        scoreDisplay.innerHTML = "Score" + "</br>" + score;
    }
    //Change question
    setRandomQuestion();
}

//Onclick function to quit game and return to homepage
function quitGame() {
    location.replace("homePage.html");
}

trashButton.onclick = answerSelect;
compostButton.onclick = answerSelect;
plapapButton.onclick = answerSelect;
ewasteButton.onclick = answerSelect;

//-------------------------------GAMEPLAY FUNCTIONS---------------------------------//
//Generate random number between 1 and 4 to determine the category of question
//1. Compost, 2. Plastic & Paper, 3. E-waste, 4. Trash
function randomCategory() {
    return Math.ceil(Math.random() * CATEGORIES);
}

//Get a random img for the question from the array of img src
function getRandomQuestion(arr) {
    let index = Math.floor(Math.random() * arr.length);
    console.log(arr[index]);
    return arr[index];
}

//Sets question image to random question
function setRandomQuestion() {
    //1. Compost, 2. Plastic & Paper, 3. E-waste, 4. Trash
    switch (randomCategory()) {
        //Compost
        case 1:
            //set current category
            currCategory = "compost";
            //Easy
            if (difficulty == 0) {
                question.src = getRandomQuestion(easyCompostArr);
                //Hard
            } else {
                question.src = getRandomQuestion(hardCompostArr);
            }
            break;
            //Plastic & Paper
        case 2:
            //set current category
            currCategory = "paper";
            //Easy
            if (difficulty == 0) {
                question.src = getRandomQuestion(easyPlaPapArr);
                //Hard
            } else {
                question.src = getRandomQuestion(hardPlaPapArr);
            }
            break;
            //E-waste
        case 3:
            //set current category
            currCategory = "ewaste";
            //Easy
            if (difficulty == 0) {
                question.src = getRandomQuestion(easyEwasteArr);
                //Hard
            } else {
                question.src = getRandomQuestion(hardEwasteArr);
            }
            break;
            //Trash
        case 4:
            //set current category
            currCategory = "trash";
            //Easy
            if (difficulty == 0) {
                question.src = getRandomQuestion(easyTrashArr);
                //Hard
            } else {
                question.src = getRandomQuestion(hardTrashArr);
            }
            break;
    }
}

//Start game
function startGame() {
    //Dipslay game UI
    showGame();
    //Start easy timer
    if (difficulty == 0) {
        easyTimer = setInterval(easyCountdown, SECONDS);
        //Start hard timer        
    } else {
        hardTimer = setInterval(hardCountdown, SECONDS);
    }
    setRandomQuestion();
}

//Hide start clock and show game UI
function showGame() {
    //Hide start clock
    startClock.style.display = "none";
    //Show game UI
    let gameUI = document.getElementsByClassName("gameplay");
    for (let i = 0; i < gameUI.length; i++) {
        gameUI[i].style.display = "block";
    }
}

//------------------------------------------------------
// Add Game Info the the Users personal info
//------------------------------------------------------ 

// function addGame() {

//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // Get the currently signed in users UID
//             let id = user.uid;

//             // Create reference for database.
//             let db = firebase.firestore();

//             // Create reference for Users collection.
//             let ref = db.collection('Users');

//             // Get user data.
//             ref.doc(id).get().then(function (doc) {

//                 let highScore = doc.data().Score; // Assign the users current wins

//                 // Create a time stamp for the game.
//                 let date = new Date();
//                 let timestamp = date.getTime();

//                 // Check if the game score is greater than the users current highscore.
//                 if (score > highScore) {
//                     highScore = score; // Increment wins
//                 }

//                 if (difficulty == 0) {
//                     // Update users last time played and score in hard difficulty.
//                     ref.doc(id).update({
//                         'LastTimePlayed': timestamp,
//                         'Scores.Hard': highScore,
//                     }).then(function () {
//                         // Send to landing page.
//                         location.replace('homePage.html');

//                         // log an error in the console.
//                     }).catch(function (error) {
//                         console.error('Error creating game: ', error);

//                         // Send to landing page.
//                         location.replace('homePage.html');
//                     });
//                 } else {
//                     // Update users last time played and score in easy difficulty.
//                     ref.doc(id).update({
//                         'LastTimePlayed': timestamp,
//                         'Scores.Easy': highScore
//                     }).then(function () {
//                         // Send to landing page.
//                         location.replace('homePage.html');

//                         // log an error in the console.
//                     }).catch(function (error) {
//                         console.error('Error creating game: ', error);

//                         // Send to landing page.
//                         location.replace('homePage.html');
//                     });
//                 }
//             })
//         } else {
//             // If no user is signed in.
//             console.log('no user');
//         }
//     })
// }

//------------------------------------------------------
// Add Score to Leaderboard based on Difficulty
//------------------------------------------------------ 

// Add the users score to the Easy_Leaderboard collection.
function addScore() {
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

                // Assign the users name and school to variables.
                let name = doc.data().Name;
                let school = doc.data().School;

                let boardRef; // declare variable for leaderboard reference.
                let highScore; 

                // Create a time stamp for the game.
                let date = new Date();
                let timestamp = date.getTime();

                // Create reference for Easy-Leaderboard collection
                if (difficulty == 0) {
                    boardRef = db.collection('Easy_Leaderboard');
                   
                    // Assign the users current wins
                    highScore = doc.data().ScoresEasy;

                    // Check if the game score is greater than the users current highscore.
                    if (score > highScore) {
                        highScore = score; // Increment wins
                    }

                    // Update users last time played and score in easy difficulty.
                    ref.doc(id).update({
                        'LastTimePlayed': timestamp,
                        'ScoresEasy': highScore
                    }).then(function () {

                        // Update the users wins, loses, and last time played.
                        boardRef.doc().set({
                            'Name': name,
                            'School': school,
                            'Score': score // Set to game score.
                        }).then(function () {
                            // Log an error message
                        }).catch(function (error) {
                            console.error('Error adding game: ', error);
                        });
                        // log an error in the console.
                    }).catch(function (error) {
                        console.error('Error creating game: ', error);
                    });
                } else {
                    boardRef = db.collection('Hard_Leaderboard');

                    // Assign the users current wins
                    highScore = doc.data().ScoresHard;

                    // Check if the game score is greater than the users current highscore.
                    if (score > highScore) {
                        highScore = score; // Increment wins
                    }

                    // Update users last time played and score in hard difficulty.
                    ref.doc(id).update({
                        'LastTimePlayed': timestamp,
                        'ScoresHard': highScore,
                    }).then(function () {

                        // Update the users wins, loses, and last time played.
                        boardRef.doc().set({
                            'Name': name,
                            'School': school,
                            'Score': score // Set to game score.
                        }).then(function () {
                            // Log an error message
                        }).catch(function (error) {
                            console.error('Error adding game: ', error);
                        });
                        // log an error in the console.
                    }).catch(function (error) {
                        console.error('Error creating game: ', error);
                    });
                }
            })
        } else {
            // If no user is signed in.
            console.log('no user');
        }
    })
}

//------------------------------------------------------
// Selects the Game difficulty
//------------------------------------------------------ 

// Takes user to 'hard' version of the game.
function hardMode() {
    document.getElementById("myNav").style.height = "0%";
    startTimer = setInterval(startCountdown, SECONDS);
    difficulty = 1;
}

// Takes user to 'easy' version of the game.
function easyMode() {
    document.getElementById("myNav").style.height = "0%";
    startTimer = setInterval(startCountdown, SECONDS);
    difficulty = 0;
}

function gameOver() {
    addScore();
}