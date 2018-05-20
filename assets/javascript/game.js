// Reference the DOM element 

var theGameButton = document.getElementById("new-game-button");
var underscore = document.getElementById("underscore");
var incorrectLettersGuessed = document.getElementById("incorrect-letters-guessed");
var guessesLeftDom = document.getElementById("guesses-left");
var winsDom = document.getElementById("wins");
var lossesDom = document.getElementById("losses");


console.log(incorrectLettersGuessed)

// Create our variables for the game including (wordBank, wins, losses, picked letter, guesses left, game ........)


var wordBank = ["Hey You", "Comfortably Numb", "Wish You were Here", "The Wall", "High Hopes", "Money"];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = "";
var pickedWordPlaceHolderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// NEW game fumctiom reset all stats, and pick a new word from our wordBank

function newGame() {

    // rest all game info 
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceHolderArr = [];
   
    // pick a new word 
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create placeholder out of new pickWord 
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            // if there is a space in the word then push in an empty space
            pickedWordPlaceHolderArr.push(" ");
        }
        // if there is no empty space push underscore
        else {
            pickedWordPlaceHolderArr.push("_");
        }
    }

    // write all new info to DOM
    guessesLeftDom.textContent = guessesLeft;
    underscore.textContent = pickedWordPlaceHolderArr.join("");
    console.log(incorrectLettersGuessed)
    incorrectLettersGuessed.textContent = incorrectLetterBank;
}


// letterGuess function, take in letter u pressed and see if it's in the selected word

function letterGueses(letter) {

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        console.log(letter);
        // run game logic 
        guessedLetterBank.push(letter);

        // check if guessed letter is in my picked word 
        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLocaleLowerCase() == letter.toLocaleLowerCase()) {
                // if a match swap that with acctual word picked
                pickedWordPlaceHolderArr[i] = pickedWord[i];
            }
        }

        underscore.textContent = pickedWordPlaceHolderArr.join("");
        // pass the checkIncorrect function that takes in the same param (letter) to check if incorrect then run the function
        checkIncorrect(letter);
        console.log(letter);
    }
    else {
        // if the user presses any key before pressing the new button alert below
        if (gameRunning === false) {
            alert("The Game isnt's runnig, Press The New Game Button to Start!");
        } else {
            // if the user presses the same letter twice alert
            alert("You already guessed this letter, try another one!");
        }
    }
}

// check if the letter picked is incorrect

function checkIncorrect(letter) {
    // check for both lower and upper case in case the user presses the shift or caps lock is on. 
    // if the letter doesn't make it to the pickedWordPlaceHolderArr then it's incorrect
    if (pickedWordPlaceHolderArr.indexOf(letter.toLocaleLowerCase()) === -1
        && pickedWordPlaceHolderArr.indexOf(letter.toUpperCase()) === -1) {
        // decreament guessesleft 
        guessesLeft--;
        // push the letter
        incorrectLetterBank.push(letter);
        // write the letter in the #incorrect-letter-guessed
        incorrectLettersGuessed.textContent = incorrectLetterBank.join(" ");
        // write new amount of guesses left on the webpage
        guessesLeftDom.textContent = guessesLeft;
        
    }
   checkLoss();
}


// check loses
function checkLoss() {
    if (guessesLeft === 0){
        // increament the losses score
        losses++;
        // set the game to stop
        gameRunning = false;
        // write the new losses score on the page
        lossesDom.innerHTML = losses;
        // Show the correct word to the user
        underscore.innerHTML = pickedWord;
    }
  checkWin(); 
}

// checkwins

function checkWin() {
    if (pickedWord.toLocaleLowerCase() === pickedWordPlaceHolderArr.join("").toLocaleLowerCase()) {
        // increament the wins
        wins++;
        // set the game to stop
        gameRunning = false;
        // write the new wins score on
        winsDom.innerHTML = wins;
    }
}


// add event listner to new game 

theGameButton.addEventListener("click", newGame);

// add onkeyup trigger letter guesses

document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGueses(event.key);
    }
}