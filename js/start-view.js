const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game')
const startViewSection = document.querySelector('.start-view-section');         
const gameViewSection = document.querySelector('.game-view-section');          
const scoreViewSection = document.querySelector('.score-view-section');   
const userObject = {};


btnStartGame.addEventListener('click', function(event) {
    event.preventDefault();
    saveInput();
    


    if (userObject.userName) {
        startViewSection.classList.add('hidden');
        gameViewSection.classList.remove('hidden'); // Visa spelvyn
        scoreViewSection.classList.add('hidden');
        console.log(userObject);
    } else {
        ("Vänligen fyll i ditt användarnamn innan du startar spelet.");
        // Gör en Modal Box här 
    }
    
});

function saveInput() {
    const userName = userNameInput.value;
    userObject.userName = userName;

    if (userObject.userName) {
        localStorage.setItem('userName', userObject.userName);
    }
}

userObject.wordLength = 0;
userObject.date = 0; //Date().toLocaleDateString();
userObject.time = 0; //Date().toLocaleTimeString();
userObject.win = false;
userObject.win = false;
userObject.nrWin = 0;
userObject.nrLost = 0;
userObject.numberOfFailedGuesses = 0;


/*localStorage.setItem('userObject', JSON.stringify(userObject))*/

