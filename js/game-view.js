import { alfabetet } from './svenska-ord.js';
import { words } from './svenska-ord.js';

// display containers
const gameViewSection = document.querySelector('.game-view-section');
const guessContainer = document.querySelector('.guess-content');
const letterContainer = document.createElement('div');
letterContainer.className = 'letter-container';


// gameplay variables
let visibleWord = '';
let input = 'A';

const uData = JSON.parse(localStorage.getItem('userObject'));
const numberOfLetters = 10;
const currentWord = pickNewWord(numberOfLetters);


// ------------------------------------------------------------------------ //

// game loop
renderAlphabet(alfabetet);
renderWord(currentWord);

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

	let wordContainer = createNewElement('div', 'word-container');
	// loop through each char in currentWord, append the text node to our newly created element
	for (let char of visibleWord) {

		let word = createNewElement('div', 'word');
		let textNode = document.createTextNode(char.toUpperCase());
		word.appendChild(textNode);
		wordContainer.appendChild(word);
	}

	gameViewSection.append(wordContainer);

}


function handleGuess(character) {

	// this is the char we click on, since this is being triggered by the event listener
	let guessedChar = character.innerText;

	for (let char of currentWord) {

		if (char.toUpperCase() === guessedChar.toUpperCase()) {
			visibleWord += char;
		}
	}
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

























// function displayWord(currentWord) {

// 	let wordContainer = createNewElement('div', 'word-container');
// 	// loop through each char in currentWord, append the text node to our newly created element
// 	for (let char of currentWord) {

// 		let word = createNewElement('div', 'word');
// 		// let word = document.createElement('div');
// 		// word.className = 'word';
// 		let textNode = document.createTextNode(char.toUpperCase());
// 		word.appendChild(textNode);
// 		// wordContainer.appendChild(word);
// 	}

// 	// gameViewSection.append(wordContainer);
// 	console.log(currentWord);
// }


// console.log('Input: ' + input);

/* first we append the char to their own divs,
and then when exiting the loop we append those to the word container
*/
// function displayRandomWord(currentWord, element, className) {

// 	createNewElement(element, className);

// }




// gameViewSection.append(letterContainer);
// console.log(currentWord);

// function createEdddlement(element, className) {
// 	guessContent.classNAme = className;

// 	for (let char of currentWord) {
// 		let textNode;

// 		if (char.toUpperCase() === input.toUpperCase()) {
// 			visibleWord += char;
// 			textNode = document.createTextNode(char.toUpperCase());
// 		}

// 		else {
// 			visibleWord += '_';
// 			textNode = document.createTextNode('_');
// 		}

// 		let guessed = document.createElement('div');
// 		guessed.className = 'word';
// 		guessed.appendChild(textNode);
// 		guessContent.appendChild(guessed);

// 	}
// 	guessContainer.append(guessContent);

// }





