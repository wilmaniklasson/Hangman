import { newGame, gameOver } from './game-view.js';

export let  newUserObject = {};

//hämtar element
const startViewSection = document.querySelector('.start-view-section');
const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game');
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const modal = document.querySelector('#Modal');
const difficultyRadios = document.getElementsByName('difficulty');

// Skapa en array för att hålla reda på användarobjekten
let userObjectsArray = [];

// När användaren klickar på Start Game-knappen
btnStartGame.addEventListener('click', function (event) {
	event.preventDefault();

	newUserObject = {
		userName: null,
		win: null,
		lost: null,
		date: null,
		time: null,
		correct: null,
		wordLength: null,
		numberOfFailedGuesses: null,
		difficulty: null,
	};

	newUserObject.userName = userNameInput.value;
	newUserObject.difficulty = document.querySelector('input[name="difficulty"]:checked').value;

	if (newUserObject.userName && newUserObject.difficulty) {
		// Lägg till det nya användarobjektet i arrayen
		userObjectsArray.push(newUserObject);

		// Sparar användarobjektarrayen i localStorage
		localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));

		startViewSection.classList.add('hidden');
		gameViewSection.classList.remove('hidden');
		scoreViewSection.classList.add('hidden');
		gameViewSection.style.display = 'flex';

		// newGame(newUserObject);
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