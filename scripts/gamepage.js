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
                    "../images/compost/bones.png", "../images/compost/leaves.png", "../images/compost/fishbone.png", "../images/compost/watermelon.png"];
//Array for plastic and paper img src on easy difficulty, size 8
let hardPlaPapArr = ["../images/p&p/cerealBox.png", "../images/p&p/waterbottle.png", "../images/p&p/magazine.png", "../images/p&p/newspaper.png", 
                    "../images/p&p/box.png", "../images/p&p/milk.png", "../images/p&p/milkjug.png", "../images/p&p/envelope.png"];
//Array for e-waste img src on easy difficulty, size 8
let hardEwasteArr = ["../images/e-waste/cellphone.png", "../images/e-waste/laptop.png", "../images/e-waste/controller.png", "../images/e-waste/headphone.png",
                    "../images/e-waste/tv.png", "../images/e-waste/microwave.png", "../images/e-waste/keyboard.png", "../images/e-waste/battery.png"];
//Array for trash img src on easy difficulty, size 8
let hardTrashArr = ["../images/trash/chipbag.png", "../images/trash/straw.png", "../images/trash/candywrapper.png", "../images/trash/erasers.png",
                    "../images/trash/gluestick.png", "../images/trash/medicalmask.png", "../images/trash/toiletpaper.webp", "../images/trash/pencil.png"];

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
    console.log(this.id);
    if(this.id == currCategory){
        score++;

        //Update score display
        scoreDisplay.innerHTML = "Score" + "</br>" + score;
    }
    //Change question
    setRandomQuestion();
}

//Onclick function to quit game and return to homepage
function quitGame(){
    location.replace("homePage.html");
}

trashButton.onclick = answerSelect;
compostButton.onclick = answerSelect;
plapapButton.onclick = answerSelect;
ewasteButton.onclick = answerSelect;

//-------------------------------GAMEPLAY FUNCTIONS---------------------------------//
//Generate random number between 1 and 4 to determine the category of question
//1. Compost, 2. Plastic & Paper, 3. E-waste, 4. Trash
function randomCategory(){
    return Math.ceil(Math.random() * CATEGORIES);
}

//Get a random img for the question from the array of img src
function getRandomQuestion(arr){
    let index = Math.floor(Math.random() * arr.length);
    console.log(arr[index]);
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
    location.replace("homePage.html");
}
