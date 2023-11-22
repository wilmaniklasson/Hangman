const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game');
const startViewSection = document.querySelector('.start-view-section');         
const gameViewSection = document.querySelector('.game-view-section');          
const scoreViewSection = document.querySelector('.score-view-section');   
const userInputObject = {};

btnStartGame.addEventListener('click', function(event) {
    event.preventDefault();
    saveInput();
    console.log(userInputObject);

    localStorage.setItem('userName', userInputObject.userName);

    startViewSection.classList.add('hidden');
    gameViewSection.classList.remove('hidden');         // show game view
    scoreViewSection.classList.add('hidden');
});

function saveInput() {
    const userName = userNameInput.value;
    userInputObject.userName = userName;
}

/* const storedUserName = localStorage.getItem('userName'); */
