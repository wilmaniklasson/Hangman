
const toggle = document.querySelector('#toggle');

const startViewSection = document.querySelector('.start-view-section');         // state 0
const gameViewSection = document.querySelector('.game-view-section');           // state 1
const scoreViewSection = document.querySelector('.score-view-section');         // state 2

let btnState = 0;
toggle.addEventListener('click', () => {

    if(btnState === 0){

        startViewSection.classList.remove('hidden');        //show start view
        gameViewSection.classList.add('hidden'); 
        scoreViewSection.classList.add('hidden'); 
		btnState ++;
    }

    else if(btnState === 1){

        startViewSection.classList.add('hidden');
        gameViewSection.classList.remove('hidden');         // show game view
        scoreViewSection.classList.add('hidden');
        btnState ++;
    }

    else {
		startViewSection.classList.add('hidden');
        gameViewSection.classList.add('hidden');
        scoreViewSection.classList.remove('hidden');        // show score view
        
		btnState = 0;
	}

});