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
let easyTimer = setInterval(easyCountdown, SECONDS);
let hardTimer = setInterval(hardCountdown, SECONDS);
//Timer
let timer = document.getElementById("timer");
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
let easyEwasteArr = [];
//Array for trash img src on easy difficulty, size 4
let easyTrashArr = [];
//Array for compost img src on easy difficulty, size 8
let hardCompostArr = [];
//Array for plastic and paper img src on easy difficulty, size 8
let hardPlaPapArr = [];
//Array for e-waste img src on easy difficulty, size 8
let hardEwasteArr = [];
//Array for trash img src on easy difficulty, size 8
let hardTrashArr = [];

//------------------------------FUNCTIONS--------------------------------------//
//Countdown function for easy timer
function easyCountdown(){
    timer.innerHTML = easyTime;
    if(easyTime == 0){
        clearInterval(easyTimer);
        //Game over
        //Send score to server
    } else {
        easyTime--;
    }
}
//Countdown function for hard timer
function hardCountdown(){
    timer.innerHTML = hardTime;
    if(hardTime == 0){
        clearInterval(hardTimer);
        //Game over
        //Send score to server
    } else {
        hardTime--;
    }
}

//Countdown for start game
function startCountdown(){
    if(startTime == 0){
        //Show GO!

        //Hide start coundown and show gameplay UI
        startGame();
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
    location.reload("homepage.html");
}

//Start game
function startGame(){
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