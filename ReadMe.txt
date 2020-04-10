This is our COMP 1800 Project. 

This is an educational game for kids to learn about waste management in Vancouver.

//----------------------Folder Organization----------------------------//


1. audio
Contains audio files that we use during the game play.

----------------------------------------------------------------------
2. html
Constains all html shell pages except for index.html 

    accountpage - Holds the users account information

    easyLeaderboard - Displays the top ten user scores in easy difficulty
                      descending order

    gamepage - The shell for the game play.

    hardLeaderboard - Displays the top ten user scores in hard difficulty by 
                      descending order.

    homePage - Displays button choices to navigate through the different pages.

    studyGuide - Contains info on the icons used in the game.

----------------------------------------------------------------------
3. scripts
    account - Used on the users account page so that we can retrieve 
                 the users info from our database and update the info.

    gamepage - Used for all of the game play. This contains all 
                  functions related to the gameplay logic and any 
                  functions that require interaction between the users
                  score and the database.
    
    leaderboard - Retrieves information from the database and displays
                     that info on our two leaderboard pages. 

    login - Used to handle login, signup, and logout for the user. 
               It also contains functions to automatically update the 
               database with a new user if they don't already have an 
               account.

    navigation - Contains functions to send users between pages.

----------------------------------------------------------------------
4. images
Contains all images used for the game. 
All icons were used from iconFinder
https://icons8.com

----------------------------------------------------------------------
5. style
Contains all external css files. However, because we used bootstrap on 
some most of our pages, there was some inline styling needed. the files 
names are similar to their respective html files.

//----------------------Libraries Used--------------------------------//

FireBase SDK and API
"https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js"
"https://www.gstatic.com/firebasejs/7.9.2/firebase-auth.js"
"https://www.gstatic.com/firebasejs/7.9.2/firebase-firestore.js"

Bootstrap API
"https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
