import { newGame } from './game-view.js';
//hämtar element
const startViewSection = document.querySelector('.start-view-section');
const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game');
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const modal = document.querySelector('#Modal');
const difficultyRadios = document.getElementsByName('difficulty');
const logo = document.querySelector('#logo');
const gameOverView = document.querySelector('.game-over-view');
const hangingMan = document.querySelector('.hanging-man');
const hangmanInfo = document.querySelector('.hangman-info');


// Skapa en array för att hålla reda på användarobjekten
let userObjectsArray = [];


export const newUserObject = {
	userName: null,
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
// När användaren klickar på Start Game-knappen
btnStartGame.addEventListener('click', function (event) {
	event.preventDefault();

	newUserObject.userName = userNameInput.value;
	newUserObject.difficulty = document.querySelector('input[name="difficulty"]:checked').value;

	if (newUserObject.userName && newUserObject.difficulty) {
		// Lägg till det nya användarobjektet i arrayen
		userObjectsArray.push(newUserObject);

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
		logo.style.display = 'none';
		hangingMan.classList.remove('hidden');
		hangingMan.style.display = 'block';
        hangmanInfo.style.display = 'none';
		newGame(newUserObject);
	} else {
		modal.style.display = 'block';
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





/*

// Hämta användarobjektet från localStorage!

let userObject = JSON.parse(localStorage.getItem('userObject'));



// Kontrollera om userObject finns och innehåller svårighetsgraden!

let difficultyLevel = (userObject && userObject.difficulty) ? userObject.difficulty : 'easy';
let currentWordLength = (difficultyLevel === 'easy') ? 5 : 6;

*/