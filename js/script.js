import { mContainer, letterContainer } from "./game-view.js";

const startViewSection = document.querySelector('.start-view-section');
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const hangingMan = document.querySelector('.hanging-man');
const gameOverView = document.querySelector('.game-over-view');
const imageContent = document.querySelector('.image-content');
const hangmanInfo = document.querySelector('.hangman-info');

let btnState = 0;
startViewSection.classList.remove('hidden');

const menu = document.querySelector('#menu');
const openMenuBtn = document.querySelector('#openMenuBtn');
const closeMenuBtn = document.querySelector('#closeMenuBtn');

// Open the menu
openMenuBtn.addEventListener('click', function () {
	menu.style.display = 'block';
});

// "Escape" stäng och öpna meny
document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		if (menu.style.display === 'block') {
			menu.style.display = 'none';
		} else {
			menu.style.display = 'block';
		}
	}
});

// Close the menu
closeMenuBtn.addEventListener('click', function () {
	menu.style.display = 'none';
});

// Close the menu if the user clicks outside of it
window.addEventListener('click', function (event) {
	if (event.target == menu) {
		menu.style.display = 'none';
	}
});

const NewGameBtn = document.querySelector('#NewGameBtn');
NewGameBtn.addEventListener('click', function () {
	menu.style.display = 'none';
	startViewSection.style.display = 'block';//show start view
	gameViewSection.style.display = 'none';
	scoreViewSection.style.display = 'none';
	hangingMan.style.display = 'none';
	hangmanInfo.style.display = 'block';
	imageContent.style.opacity = '1';
	mContainer.remove();
	letterContainer.display = 'block';
	// letterContainer.classList.add('grow');
	letterContainer.classList.remove('destroyed');
});


const ScoreboardBtn = document.querySelector('#ScoreboardBtn');
ScoreboardBtn.addEventListener('click', function () {
	menu.style.display = 'none';
	startViewSection.style.display = 'none';
	hangingMan.style.display = 'none';
	gameViewSection.style.display = 'none';
	scoreViewSection.style.display = 'block'; // show score view
	hangmanInfo.style.display = 'none';
	imageContent.style.opacity = '0';
});
