import { alfabetet } from './svenska-ord.js';
import { words } from './svenska-ord.js';
import { newUserObject } from './start-view.js';

// display containers
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const hangingMan = document.querySelector('.image-content');
const hangmanBody = ['#ground', '#scaffold', '#legs', '#arms', '#body', '#head'];

const letterContainer = document.createElement('div');
const numberOfLetters = 10;
const currentWord = pickNewWord(numberOfLetters);


letterContainer.className = 'letter-container';
let svgElement = document.querySelector('.hanging-man');

let visibleWord = Array(currentWord.length).fill('_'); // initialize with underscores
let incorrectGuesses = 0;
let match = false;
let currentUser;
let userObjectsArray;

// gameplay variables
let wordContainer = createNewElement('div', 'word-container');


// ------------------------------------------------------------------------ //

// game loop


// game logic functions
export function newGame() {

	// Create a new user object if it doesn't exist already
	if (!currentUser) {
		currentUser = {
			userName: newUserObject.userName,
			win: null,
			lost: null,
			date: null,
			time: null,
			correct: null,
			wordLength: null,
			numberOfFailedGuesses: null,
			difficulty: null,
			secretWord: null,
		};
	}
	incorrectGuesses = 0;

	currentUser.secretWord = currentWord;
	currentUser.incorrectGuesses = 0;
	currentUser.wordLength = currentWord.length;

	renderAlphabet(alfabetet);
	renderWord(visibleWord);
	console.log("user secrect word: " + currentUser.secretWord);

}

function renderAlphabet(alfabetet) {

	let letterContainer = createNewElement('div', 'letter-container');

	// loop through each char in currentWord, append the text node to our newly created element
	for (let char of alfabetet) {

		let characterContainer = createNewElement('div', 'character-container');
		let character = createNewElement('div', 'character');
		let textNode = document.createTextNode(char.toUpperCase());

		characterContainer.appendChild(character);
		character.appendChild(textNode);
		letterContainer.appendChild(character);

		// add the event listener to the character
		character.addEventListener('click', function () {
			this.remove();
			handleGuess(character);
			renderWord(visibleWord);
		});

		gameViewSection.append(letterContainer);
	}
}

function renderWord(visibleWord) {

	// Every time this runs we need to clear the previous wordContainer so we don't render double words
	while (wordContainer.firstChild) {
		wordContainer.removeChild(wordContainer.firstChild);
	}

	// 
	for (let char of visibleWord) {
		let charElement = createNewElement('div', 'character-word');
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
	let newVisibleWord = '';
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
		console.log('incorrect guesses: ' + incorrectGuesses);
		// Make the SVG part visible
		svgPart.classList.remove('hidden');
		console.log('class removed: ' + svgPartId);

		// Increment the counter
		incorrectGuesses++;
		currentUser.incorrectGuesses = incorrectGuesses;
		updateGameState();
	}

	else {
		updateGameState();
	}

	visibleWord = newVisibleWord;
	renderWord(visibleWord);
}
export function updateGameState() {

	if (incorrectGuesses === 6) {
		scoreViewSection.style.display = 'block';
		gameViewSection.style.display = 'none';
		hangingMan.style.display = 'none';

		currentUser.lost = true;

		// Get userObjectsArray from localStorage
		let userObjectsArray = JSON.parse(localStorage.getItem('userObjectsArray'));

		if (!userObjectsArray) {
			userObjectsArray = [];
		}

		// Store the updated userObjectsArray back in localStorage

		userObjectsArray.push(JSON.parse(JSON.stringify(currentUser)));
		localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));

	}
}

// helper functions
function createNewElement(typeOfElement, className) {
	let newElement = document.createElement(typeOfElement);
	newElement.className = className;
	return newElement;
}

function pickNewWord(numberOfLetters) {

	// find the ten letter letters from the list by filtering
	const currentWordList = words.filter(word => word.length === numberOfLetters);

	/* generate random float based on length of currentWordList,
	then floor it to an integer.
	This is so we have a whole number to use for selecting from the array :)
	*/
	const newWord = Math.floor(Math.random() * currentWordList.length);

	// then return the word that we got from the array
	return currentWordList[newWord];
}

