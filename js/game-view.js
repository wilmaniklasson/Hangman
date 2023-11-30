import { alfabetet } from "./svenska-ord.js";
import { words } from "./svenska-ord.js";
import { newUserObject } from "./start-view.js";

// display containers
const gameViewSection = document.querySelector(".game-view-section");
const scoreViewSection = document.querySelector(".score-view-section");

const hangingMan = document.querySelector(".hanging-man");
const hangmanBody = ["#ground", "#scaffold", "#legs", "#arms", "#body", "#head"];

// const letterContainer = document.createElement('div');
const numberOfLetters = 10;
const currentWord = pickNewWord(numberOfLetters);
// const newUserObject = localStorage.getItem('newUserObject')

let svgElement = document.querySelector(".hanging-man");

let visibleWord = Array(currentWord.length).fill("_"); // initialize with underscores
let incorrectGuesses = 0;
let match = false;

// gameplay variables
let wordContainer = createNewElement("div", "word-container");
let letterContainer = createNewElement("div", "letter-container");
letterContainer.className = "letter-container";

// ------------------------------------------------------------------------ //

// game loop

newGame(newUserObject);

// game logic functions
export function newGame(newUserObject) {
	incorrectGuesses = 0;
	renderAlphabet(alfabetet, letterContainer);
	renderWord(visibleWord);
	console.log(currentWord);
	console.log("New Game started with difficulty level: " + newUserObject.difficulty);
	console.log('incorrect guesses: ' + incorrectGuesses);
}

function renderAlphabet(alfabetet, letterContainer) {
	// we first need to wipe the alphabet container clean whenever we make a new game
	while (letterContainer.firstChild) {
		console.log("removing child" + letterContainer.firstChild);
		letterContainer.removeChild(letterContainer.firstChild);
	}

	// loop through each char in currentWord, append the text node to our newly created element
	for (let char of alfabetet) {
		let characterContainer = createNewElement("div", "character-container");
		let character = createNewElement("div", "character");
		let textNode = document.createTextNode(char.toUpperCase());

		characterContainer.appendChild(character);
		character.appendChild(textNode);
		letterContainer.appendChild(character);

		// add the event listener to the character
		character.addEventListener("click", function () {
			this.remove();
			handleGuess(character);
			renderWord(visibleWord);
		});
	}
	gameViewSection.append(letterContainer);
}

function renderWord(visibleWord) {
	// Every time this runs we need to clear the previous wordContainer so we don't render double words
	while (wordContainer.firstChild) {
		wordContainer.removeChild(wordContainer.firstChild);
	}

	//
	for (let char of visibleWord) {
		let charElement = createNewElement("div", "character-word");
		let textNode = document.createTextNode(char.toUpperCase());
		charElement.appendChild(textNode);
		wordContainer.appendChild(charElement);
	}

	// Append the wordContainer to gameViewSection
	gameViewSection.append(wordContainer);
}

function handleGuess(character) {
	let match = false;
	let guessedChar = character.innerText;
	let newVisibleWord = "";
	for (let i = 0; i < currentWord.length; i++) {
		if (currentWord[i].toUpperCase() === guessedChar.toUpperCase()) {
			newVisibleWord += currentWord[i].toUpperCase();
			match = true;
		} else {
			newVisibleWord += visibleWord[i];
		}
	}

	if (!match && incorrectGuesses < 6) {
		// Get the SVG part to show
		let svgPartId = hangmanBody[incorrectGuesses];
		let svgPart = document.querySelector(svgPartId);
		// console.log('incorrect guesses: ' + incorrectGuesses);
		// Make the SVG part visible
		svgPart.classList.remove("hidden");
		// console.log('class removed: ' + svgPartId);

		// Increment the counter
		incorrectGuesses++;
		console.log("incorrect guesses: " + incorrectGuesses);


	}

	visibleWord = newVisibleWord;
	renderWord(visibleWord);
	updateGameState(newUserObject);
}
export function updateGameState(newUserObject) {
	// we get the user in local storage (we probably shouldn't do it like this, in case we have billions of users though)
	//  and store it in a variable
	let userObjectsArray = JSON.parse(localStorage.getItem('userObjectsArray'));
	let currentUser = userObjectsArray.find(user => user.userName === newUserObject.userName);

	if (!visibleWord.includes('_')) {
		gameViewSection.classList.add("hidden");
		scoreViewSection.classList.remove("hidden");
		console.log("You won!");
		currentUser.win++;
	}
	else if (incorrectGuesses >= 6) {
		gameViewSection.classList.add("hidden");
		scoreViewSection.classList.remove("hidden");
		console.log("You loose!");
		currentUser.lost++;
	}
	//  then we store it again on local storage
	localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));
}

// helper functions
function createNewElement(typeOfElement, className) {
	let newElement = document.createElement(typeOfElement);
	newElement.className = className;
	return newElement;
}

function pickNewWord(numberOfLetters) {
	// find the ten letter letters from the list by filtering
	const currentWordList = words.filter((word) => word.length === numberOfLetters);

	/* generate random float based on length of currentWordList,
	then floor it to an integer.
	This is so we have a whole number to use for selecting from the array :)
	*/
	const newWord = Math.floor(Math.random() * currentWordList.length);

	// then return the word that we got from the array
	return currentWordList[newWord];
}
