
const toggle = document.querySelector('#toggle');

const startViewSection = document.querySelector('.start-view-section');         // state 0
const gameViewSection = document.querySelector('.game-view-section');           // state 1
const scoreViewSection = document.querySelector('.score-view-section');         // state 2
const hangingMan = document.querySelector('.hanging-man');
const gameOver = document.querySelector('.game-over');


let btnState = 0;
startViewSection.classList.remove('hidden');
// hangingMan.classList.remove('hidden')

toggle.addEventListener('click', () => {

	if (btnState === 0) {

		startViewSection.classList.remove('hidden');        //show start view
		// hangingMan.classList.remove('hidden')
		gameViewSection.classList.add('hidden');
		scoreViewSection.classList.add('hidden');
		gameOver.classList.add('hidden');
		btnState++;
	}

	else if (btnState === 1) {

		startViewSection.classList.add('hidden');
		gameViewSection.classList.remove('hidden');         // show game view
		// hangingMan.classList.remove('hidden')
		scoreViewSection.classList.add('hidden');
		gameOver.classList.add('hidden');
		btnState++;
	}

	else {
		startViewSection.classList.add('hidden');
		// hangingMan.classList.add('hidden')
		gameViewSection.classList.add('hidden');
		scoreViewSection.classList.remove('hidden');        // show score view
		gameOver.classList.remove('hidden');

		btnState = 0;
	}

});





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
	startViewSection.classList.remove('hidden');        //show start view
	hangingMan.classList.remove('hidden');
	gameViewSection.classList.add('hidden');
	scoreViewSection.classList.add('hidden');
	gameOver.classList.add('hidden');
	// gameViewSection.style.display = 'flex';
});


const ScoreboardBtn = document.querySelector('#ScoreboardBtn');
ScoreboardBtn.addEventListener('click', function () {
	menu.style.display = 'none';
	startViewSection.classList.add('hidden');
	hangingMan.classList.add('hidden');
	gameViewSection.classList.add('hidden');
	scoreViewSection.classList.remove('hidden');        // show score view
	gameOver.classList.add('hidden');
});



