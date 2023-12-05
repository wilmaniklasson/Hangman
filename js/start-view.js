let numberOfLetters;
import { characterElements, imageContent, mContainer, newGame } from './game-view.js';
//hämtar element
const startViewSection = document.querySelector('.start-view-section');
const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game');
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
export const modal = document.querySelector('#Modal');
const gameOverView = document.querySelector('.game-over-view');
const hangingMan = document.querySelector('.hanging-man');
const hangmanInfo = document.querySelector('.hangman-info');


// Skapa en array för att hålla reda på användarobjekten
let userObjectsArray = [];

// Funktion för att ladda användarobjekten från localStorage
function loadUserObjects() {
	const storedUserObjects = localStorage.getItem('userObjectsArray');
	if (storedUserObjects) {
	  userObjectsArray = JSON.parse(storedUserObjects);
	}
  }



export const newUserObject = {
	userName: null,
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

userNameInput.addEventListener('focus', function () {
	characterElements.clear();
	console.log('characterElements cleared');
});
// När användaren klickar på Start Game-knappen
btnStartGame.addEventListener('click', function (event) {
	event.preventDefault();

	newUserObject.userName = userNameInput.value;
	newUserObject.difficulty = document.querySelector('input[name="difficulty"]:checked').value;

	if (newUserObject.userName && newUserObject.difficulty) {
		// Lägg till det nya användarobjektet i arrayen
		userObjectsArray.push(newUserObject);
		if (document.getElementById('easy').checked) {
			numberOfLetters = 10;
		} else if (document.getElementById('hard').checked) {
			numberOfLetters = 6;
		}

		// if objectsarray is null or undefined, create an empty array
		if (!userObjectsArray) {
			userObjectsArray = [];
		}
		// Check if newUserObject already exists in userObjectsArray
		let exists = userObjectsArray.some(userObject => userObject.userName === newUserObject.userName);

		// if it doesn't we push it to the array to create a new entry (YAY GREAT SUCCESS)
		if (!exists) {
			userObjectsArray.push(newUserObject);
			localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));
		}
		// // Sparar användarobjektarrayen i localStorage
		// localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));

		startViewSection.style.display = 'none';
		gameViewSection.style.display = 'flex';
		hangingMan.classList.remove('hidden');
		hangingMan.style.display = 'block';
		hangmanInfo.style.display = 'none';
		newGame(newUserObject, numberOfLetters);
	} else {
		modal.style.display = 'block';
	}
	console.log('TRYING REALLY HARD TO REMOVE THIS GODDAMNED MCONTAINER');
	if (mContainer) {
		console.log('mContainer exists, attempting to remove...');
		console.log('mContainer is a child of imageContent:', imageContent.contains(mContainer));
		mContainer.remove();
		console.log('mContainer is in the DOM after attempting to remove:', mContainer.isConnected);
	} else {
		console.log('mContainer does not exist.');
	}
});



//Låter användaren klicka utaför modal rutan för att stänga rutan.
const openModalBtn = document.getElementById('openModalBtn');
window.addEventListener('click', function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
});

//funktion för att stänga modal med "X"
const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', function () {
	modal.style.display = 'none';
});

