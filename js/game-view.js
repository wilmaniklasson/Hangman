import { alfabetet } from './svenska-ord.js';
import { words } from './svenska-ord.js';
import { newUserObject } from './start-view.js';

// display containers
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const hangingMan = document.querySelector('.image-content');
const hangmanBody = ['#ground', '#scaffold', '#head', '#body', '#arms', '#legs'];

// create the letter container, and append it to the gameview
const letterContainer = document.createElement('div');
letterContainer.className = 'letter-container';
gameViewSection.append(letterContainer);

const numberOfLetters = 10;
let currentWord = '';
let incorrectGuesses = 0;
let currentUser;
let match = false;
let userObjectsArray;
let visibleWord = Array(currentWord.length).fill('_'); // initialize with underscores

let svgElement = document.querySelector('.hanging-man');

let wordContainer = createNewElement('div', 'word-container');

// game logic functions
export function newGame(userObject) {

	const difficulty = userObject.difficulty;

	const numberOfLetters = (difficulty === 'easy') ? 6 : 5;
	currentWord = pickNewWord(numberOfLetters);
	visibleWord = Array(currentWord.length).fill('_');

	resetHangingMan();

	// we need to clear the game board before we start a new game
	clearGameBoard();

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

	currentUser = userObject;
	incorrectGuesses = 0;

	currentUser.secretWord = currentWord;
	currentUser.incorrectGuesses = 0;
	currentUser.wordLength = currentWord.length;

	renderAlphabet(alfabetet);
	renderWord(visibleWord);
	console.log("user secrect word: " + currentUser.secretWord);
}

function renderAlphabet(alfabetet) {

	// let letterContainer = createNewElement('div', 'letter-container');

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
			character.classList.add('destroyed');
			// here we "destroy" the character by applying a random transform
			destroyWithRandomTransform(character);
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
	// we split this because visibleWord is an array, 
	// so we get an array of characters
	visibleWord = newVisibleWord.split('');

	if (!match && incorrectGuesses < 6) {
		// Get the SVG part to show
		let svgPartId = hangmanBody[incorrectGuesses];
		let svgPart = document.querySelector(svgPartId);
		console.log('incorrect guesses: ' + incorrectGuesses);
		// Make the SVG part visible
		svgPart.classList.remove('hidden');

		// is it an ellipse?
		if (svgPart.tagName.toLowerCase() === 'ellipse') {

			svgPart.classList.add('paint', 'ellipse-painted');
		}
		// is it a path with a stroke property?
		if (svgPart.tagName.toLowerCase() === 'path' && svgPart.getAttribute('stroke')) {
			svgPart.classList.add('paint');
		}

		// if not, it's a path without strokes so we animate fill instead
		else svgPart.classList.add('paint', 'ellipse-painted');

		console.log('class removed: ' + svgPartId);

		// Increment the counter
		incorrectGuesses++;
		currentUser.incorrectGuesses = incorrectGuesses;
		updateGameState();
		match = false;
	}

	else {
		updateGameState();
	}
	renderWord(visibleWord);
}
export function updateGameState() {

	if (incorrectGuesses === 6) {
		scoreViewSection.style.display = 'block';
		gameViewSection.style.display = 'none';
		hangingMan.style.display = 'block';

		currentUser.lost = true;
		currentUser.win = false;
		currentUser.date = new Date().toLocaleDateString();
		currentUser.time = new Date().toLocaleTimeString();

		// Get userObjectsArray from localStorage
		updateUserData();
	}

	if (visibleWord.join('').toUpperCase() === currentWord.toUpperCase()) {
		scoreViewSection.style.display = 'block';
		gameViewSection.style.display = 'none';
		hangingMan.style.display = 'none';

		currentUser.win = true;
		currentUser.lost = false;
		currentUser.date = new Date().toLocaleDateString();
		currentUser.time = new Date().toLocaleTimeString();

		// Get userObjectsArray from localStorage
		updateUserData();

	}
}

// helper functions
function destroyWithRandomTransform(element) {
	// Generate random rotation and scale values
	let rotation = (Math.random() * 30) * (Math.random() < 0.5 ? -1 : 1); // Random rotation from -30 to 30 degrees
	let scaleX = 1 + Math.random() * 0.5; // Random scale for X 
	let scaleY = 1 + Math.random() * 0.5; // Random scale for Y 

	// Apply the random transform to the element
	element.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
	element.style.opacity = 0;
	element.style.pointerEvents = 'none';
}

function updateUserData() {
	let userObjectsArray = JSON.parse(localStorage.getItem('userObjectsArray'));

	if (!userObjectsArray) {
		userObjectsArray = [];
	}

	// Store the updated userObjectsArray back in localStorage
	userObjectsArray.push(JSON.parse(JSON.stringify(currentUser)));
	localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));
}

function createNewElement(typeOfElement, className) {
	let newElement = document.createElement(typeOfElement);
	newElement.className = className;
	return newElement;
}

function pickNewWord(numberOfLetters) {

	// find the ten letter words from the list by filtering
	const currentWordList = words.filter(word => word.length === numberOfLetters);

	/* generate random float based on length of currentWordList,
	then floor it to an integer.
	This is so we have a whole number to use for selecting from the array :)
	*/
	const newWord = Math.floor(Math.random() * currentWordList.length);

	// then return the word that we got from the array
	return currentWordList[newWord];
}

function clearGameBoard() {
	while (letterContainer.firstChild) {
		letterContainer.removeChild(letterContainer.firstChild);
	}

	while (wordContainer.firstChild) {
		wordContainer.removeChild(wordContainer.firstChild);
	}
}

function resetHangingMan() {
	for (let partId of hangmanBody) {
		let svgPart = document.querySelector(partId);
		svgPart.classList.add('hidden');
		svgPart.classList.remove('paint');
	}
}