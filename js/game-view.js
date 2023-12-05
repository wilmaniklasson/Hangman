import { alfabetet } from './svenska-ord.js';
import { words } from './svenska-ord.js';
import { updateScoreboard } from './score-view.js';
import { modal } from './start-view.js';

// display containers
export const imageContent = document.querySelector('.image-content');
export let mContainer = createNewElement('div', 'message-container');
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const hangmanBody = ['#ground', '#scaffold', '#head', '#body', '#arms', '#legs'];

// create the letter container, and append it to the gameview
export const letterContainer = document.createElement('div');
letterContainer.className = 'letter-container';
gameViewSection.append(letterContainer);

const numberOfLetters = 10;
let currentWord = '';
let incorrectGuesses = 0;
let currentUser;
let match = false;
let userObjectsArray;
let visibleWord = Array(currentWord.length).fill('_'); // initialize with underscores
export let characterElements = new Map();

let svgElement = document.querySelector('.hanging-man');

let wordContainer = createNewElement('div', 'word-container');

// game logic functions
export function newGame(userObject, numberOfLetters) {

	// we can use these to animate
	// gameViewSection.classList.add('grow');
	// gameViewSection.classList.remove('shrink');

	incorrectGuesses = 0;
	userObjectsArray = JSON.parse(localStorage.getItem('userObjectsArray')) || [];
	const difficulty = userObject.difficulty;
	userObject.guesses = 0;

	// numberOfLetters = (difficulty === 'easy') ? 6 : 10;
	currentWord = pickNewWord(numberOfLetters);
	visibleWord = Array(currentWord.length).fill('_');

	resetHangingMan();

	// we need to clear the game board before we start a new game
	clearGameBoard();
	imageContent.style.opacity = '1';

	updateScoreboard();

	// try to find the user in the userObjectsArray
	let existingUser = userObjectsArray.find(user => user.userName === userObject.userName);
	if (existingUser) {
		currentUser = existingUser;
		currentUser.incorrectGuesses = 0;
	}
	// Create a new user object if it doesn't exist already
	else {
		currentUser = {
			userName: userObject.userName,
			win: 0,
			lost: 0,
			date: null,
			time: null,
			wordLength: null,
			numberOfFailedGuesses: null,
			difficulty: null,
			secretWord: null,
			guesses: 0,
		};
		userObjectsArray.push(currentUser);
	}


	currentUser.secretWord = currentWord;
	currentUser.wordLength = currentWord.length;

	renderAlphabet(alfabetet);
	renderWord(visibleWord);
	console.log("user secrect word: " + currentUser.secretWord);

	handleKeyDownEvent();
}

// keydown event listener
function handleKeyDownEvent() {
	document.addEventListener('keydown', function (event) {
		let key = event.key.toLowerCase();

		// TODO: check if username is auto-input, then we have no key so we we need to handle that somehow
		// Check if the key is a letter and if in map
		if ((key.length === 1 && key >= 'a' && key <= 'ö') && characterElements.has(key)) {

			if (characterElements.has(key)) {
				// Get the character element
				let character = characterElements.get(key);
				character.classList.add('destroyed');
				destroyWithRandomTransform(character);
				characterElements.delete(key);

				// Handle the guess
				handleGuess(character);
				renderWord(visibleWord);
			}
		}
	});
}

function renderAlphabet(alfabetet) {


	// let letterContainer = createNewElement('div', 'letter-container');
	characterElements.clear();
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
		characterElements.set(char, character);
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

	if (modal.style.display === 'block') {
		return;
	}
	let match = false;
	let guessedChar = character.innerText;
	let newVisibleWord = '';

	({ newVisibleWord, match } = upDateGuessedWord(guessedChar, newVisibleWord, match));

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
		handleSvgRender(svgPart, svgPartId);

		// Increment the counter
		incorrectGuesses++;
		currentUser.incorrectGuesses = incorrectGuesses;
		match = false;
		updateUserData();
	}

	currentUser.guesses++;
	updateGameState();
	renderWord(visibleWord);

}

function upDateGuessedWord(guessedChar, newVisibleWord, match) {
	for (let i = 0; i < currentWord.length; i++) {

		if (currentWord[i].toUpperCase() === guessedChar.toUpperCase()) {
			newVisibleWord += currentWord[i].toUpperCase();
			match = true;
		} else {
			newVisibleWord += visibleWord[i];
		}

	}
	return { newVisibleWord, match };
}

function handleSvgRender(svgPart, svgPartId) {
	if (svgPart.tagName.toLowerCase() === 'ellipse') {
		svgPart.classList.add('paint', 'ellipse-painted');
	}

	// is it a path with a stroke property?
	else if (svgPart.tagName.toLowerCase() === 'path' && svgPart.getAttribute('stroke')) {
		svgPart.classList.add('paint');
		console.log('class added to path: ' + svgPartId + 'paint');
	}

	// is it the scaffold (the only path without a stroke then)?
	if (svgPart.id === 'scaffold') {
		svgPart.classList.add('paint', 'scaffold-painted');
		console.log('class added to scaffold: ' + svgPartId + 'paint, ellipse-painted');
	}
}

export function updateGameState() {

	if (incorrectGuesses === 6) {
		let result = 'lost';
		gameViewSection.style.display = 'none';

		currentUser.date = new Date().toLocaleDateString();
		currentUser.time = new Date().toLocaleTimeString();

		currentUser.lost++;
		updateUserData();
		updateScoreboard();
		scoreViewSection.style.display = 'block';

		triggerResult(result);
	}

	if (visibleWord.join('').toUpperCase() === currentWord.toUpperCase()) {
		let result = 'won';

		scoreViewSection.style.display = 'block';
		if (gameViewSection.contains(letterContainer)) {
			letterContainer.classList.add('destroyed');

			letterContainer.addEventListener('transitionend', function () {

				//
			});
			// gameViewSection.appendChild(wordContainer);
			// gameViewSection.classList.add('shrink');
			// gameViewSection.classList.remove('grow');
		}
		gameViewSection.style.display = 'none';

		currentUser.win++;

		currentUser.date = new Date().toLocaleDateString();
		currentUser.time = new Date().toLocaleTimeString();

		// Get userObjectsArray from localStorage
		updateUserData();
		updateScoreboard();
		// imageContent.innerHTML = '';
		triggerResult(result);

	}
}



function triggerResult(result) {

	// TODO: Make these into an array of objects, then loop through them and create the elementsß
	mContainer.innerHTML = '';	// imageContent.innerHTML = '';

	// create container for message
	mContainer.style.display = 'flex';
	mContainer.style.flexDirection = 'column';
	mContainer.style.alignItems = 'left';
	mContainer.style.gap = '1rem';
	imageContent.appendChild(mContainer);

	if (result === 'lost') {

		// we need to put these inside a div so we can style them, so textnode doesn't work here.
		let lostNode = createNewElement('div', 'lostNode');
		lostNode.textContent = 'You lost!';
		mContainer.appendChild(lostNode);

		let wordNode = createNewElement('div');
		wordNode.textContent = 'The word was: ' + currentWord.toUpperCase();
		mContainer.appendChild(wordNode);

		let guessNode = createNewElement('div');
		guessNode.textContent = 'You guessed ' + currentUser.guesses + ' times.';
		mContainer.appendChild(guessNode);

		let progressionsNode = createNewElement('div');
		progressionsNode.textContent = 'You have won ' + currentUser.win + ' times.';
		mContainer.appendChild(progressionsNode);
	}

	else {

		// we need to put these inside a div so we can style them, so textnode doesn't work here.
		let wonNode = createNewElement('div', 'wonNode');
		wonNode.textContent = 'You won!';
		mContainer.appendChild(wonNode);

		let wordNode = createNewElement('div');
		wordNode.textContent = 'The word was: ' + currentWord.toUpperCase();
		mContainer.appendChild(wordNode);

		let guessNode = createNewElement('div');
		guessNode.textContent = 'You guessed ' + currentUser.guesses + ' times.';
		mContainer.appendChild(guessNode);

		let progressionsNode = createNewElement('div');
		progressionsNode.textContent = 'You have won ' + currentUser.win + ' times.';
		mContainer.appendChild(progressionsNode);

		svgElement.style.display = 'none';
	}
}

// helper functions
function destroyWithRandomTransform(element) {
	// Generate random rotation and scale values
	let rotation = (Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1); // Random rotation from -30 to 30 degrees
	let scaleX = 1 + Math.random() * 0.25; // Random scale for X 
	let scaleY = 1 + Math.random() * 0.25; // Random scale for Y 


	// Apply the random transform to the element
	element.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
	element.style.opacity = 0;
	element.style.pointerEvents = 'none';
}

function updateUserData() {
	let userIndex = userObjectsArray.findIndex(user => user.userName === currentUser.userName);

	// update user object in array
	userObjectsArray[userIndex] = currentUser;
	// Store the updated userObjectsArray back in localStorage
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

		if (svgPart.classList.contains('paint')) {
			svgPart.classList.remove('paint');
		}
		if (svgPart.classList.contains('ellipse-painted')) {
			svgPart.classList.remove('ellipse-painted');
		}
	}
}