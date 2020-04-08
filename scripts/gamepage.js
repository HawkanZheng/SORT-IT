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

  
  function hardMode() {
    document.getElementById("myNav").style.height = "0%";
    startTimer = setInterval(startCountdown, SECONDS);
    difficulty = 1;
  }

  function easyMode() {
    document.getElementById("myNav").style.height = "0%";
    startTimer = setInterval(startCountdown, SECONDS);
    difficulty = 0;
  }
function gameOver(){
    location.replace("HTML Shell/homePage.html");
}
