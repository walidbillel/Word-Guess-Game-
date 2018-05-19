// Reference the DOM element 

var theGameButton = document.getElementById("new-game-button");
var underscore = document.getElementById("underscore");
var falseLettersGuessed = document.getElementById("incorrect-letters=guessed");
var guessesLeftDom = document.getElementById("guesses-left");
var winsDom = document.getElementById("wins");
var lossesDom = document.getElementById("losses");

// Create car for game (wordBank, wins, losses, picked letter, guesses left, game ........)


var wordBank = ["Hey You", "Layla", "Wish You were Here", "The Eye of The Tiger", "Imagine", "Don't cry"];
var wins = 0;
var losses = 0;
var guessesLeft = 12;
var gameRunning = false;
var pickedWord = "";
var pickedWordPlaceHolderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


// NEW game fumctiom reset all stats, pick new word
function newGame() {
    // rest all game info 
    gameRunning = true;
    guessesLeft = 12;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceHolderArr = [];

    // pick a new word 
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create placeholder out of new pickWord 
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] == " ") {
            pickedWordPlaceHolderArr.push(" ");
        }
        else {
            pickedWordPlaceHolderArr.push("_");
        }
    }

    // write all new infor to DOW 
    guessesLeftDom.textContent = guessesLeft;
    underscore.textContent = pickedWordPlaceHolderArr.join("");
    // falseLettersGuessed.textContent = incorrectLetterBank;
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
        checkIncorrect(letter);
        console.log(letter);
    }
    else {
        if (gameRunning === false) {
            alert("The Game isnt's runnig");
        } else {
            alert("You already guessed this letter");
        }
    }
}

// check if letter is incorrect

function checkIncorrect(letter) {
    if (pickedWordPlaceHolderArr.indexOf(letter.toLocaleLowerCase()) === -1

        && pickedWordPlaceHolderArr.indexOf(letter.toUpperCase()) === -1) {

        guessesLeft--;
        incorrectLetterBank.push(letter);
        falseLettersGuessed.innerHTML = incorrectLetterBank.join(" ");
        // write new amount of guesses left to DOM
        guessesLeftDom.textContent = guessesLeft;
    }
    checkLoss();
}


// check loses
function checkLoss() {
    if (guessesLeft === 0){
        losses++;
        gameRunning = false;
        lossesDom.innerHTML = losses;
        underscore.innerHTML = pickedWord;
    }
    checkWin();
}

// checkwins

function checkWin() {
    if (pickedWord.toLocaleLowerCase() === pickedWordPlaceHolderArr.join("".toLocaleLowerCase())) {
        wins++;
        gameRunning = false;
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