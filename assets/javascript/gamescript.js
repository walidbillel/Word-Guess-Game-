// Reference the DOM elements/ link to html 

// create the DOM / print things on the web

var $newGameButton = document.getElementById("new-game-button");
var $guessedLetters = document.getElementById("guessed-letters");
var $placeholders = document.getElementById("placeholders");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
var $gueesesLeft = document.getElementById("guessed-left");

// create variables for the game 

var wordBank =["Hey You", "Layla", "Wish You were Here", "The Eye of The Tiger", "Imagine", "Don't cry"];
var wins = 0;
var losses = 0;
var GuessesLeft = 12;
var wordPicked = "";
var incorrectLetters = [];
var lettersGuessed = [];

