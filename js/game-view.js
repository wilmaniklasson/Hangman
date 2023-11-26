import { alfabetet } from './svenska-ord.js';
import { words } from './svenska-ord.js';

// display containers
const gameViewSection = document.querySelector('.game-view-section');
const guessContainer = document.querySelector('.guess-content');
const letterContainer = document.createElement('div');
const uData = JSON.parse(localStorage.getItem('userObject'));
const numberOfLetters = 10;
const currentWord = pickNewWord(numberOfLetters);

letterContainer.className = 'letter-container';

let visibleWord = Array(currentWord.length).fill('_'); // initialize with underscores

// gameplay variables
let wordContainer = createNewElement('div', 'word-container');
let word = createNewElement('div', 'word');


// ------------------------------------------------------------------------ //

// game loop
renderAlphabet(alfabetet);
renderWord(visibleWord);
console.log(currentWord);
// game logic functions
function renderAlphabet(alfabetet) {

	let letterContainer = createNewElement('div', 'letter-container');

	// loop through each char in currentWord, append the text node to our newly created element
	for (let char of alfabetet) {

		let character = createNewElement('div', 'character');
		let textNode = document.createTextNode(char.toUpperCase());
		character.appendChild(textNode);
		letterContainer.appendChild(character);

		// add the event listener to the character
		character.addEventListener('click', function () {
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
		let charElement = createNewElement('div', 'character');
		let textNode = document.createTextNode(char.toUpperCase());
		charElement.appendChild(textNode);
		wordContainer.appendChild(charElement);
	}

	// Append the wordContainer to gameViewSection
	gameViewSection.append(wordContainer);
}

function handleGuess(character) {
	let guessedChar = character.innerText;
	let newVisibleWord = '';

	for (let i = 0; i < currentWord.length; i++) {

		if (currentWord[i].toUpperCase() === guessedChar.toUpperCase()) {
			newVisibleWord += currentWord[i].toUpperCase();
		}

		else {
			newVisibleWord += visibleWord[i]; // update temporary word
		}
	}

	visibleWord = newVisibleWord; // update visible word with temporary word
	renderWord(visibleWord);
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
	// const userObject = localStorage.getItem('userObject');

	/* generate random float based on length of currentWordList,
	then floor it to an integer.
	This is so we have a whole number to use for selecting from the array :)
	*/
	const newWord = Math.floor(Math.random() * currentWordList.length);

	// then return the word that we got from the array
	return currentWordList[newWord];
}

// TODO: handle SVG?