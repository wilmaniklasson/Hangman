//hämtar element
const startViewSection = document.querySelector('.start-view-section');
const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game')
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const modal = document.querySelector('#Modal');  
//Skapar ett objet för användar info
const userObject = {};     
       
/* Start game btn: sparar användar namn och skapar ett objekt. Om vi fått ett värde från input blir start view section dåld och game view section visas om inte vissar vi en modal ruta så att user name input blir required. */
btnStartGame.addEventListener('click', function(event) {
    event.preventDefault();
    saveInput();
    
    if (userObject.userName) {
        startViewSection.classList.add('hidden');
        gameViewSection.classList.remove('hidden'); // Visa spelvyn
        scoreViewSection.classList.add('hidden');
        console.log(userObject);
    } else {
        modal.style.display = 'block';
    }
    
});

function saveInput() {
    const userName = userNameInput.value;
    userObject.userName = userName;

    if (userObject.userName) {
        localStorage.setItem('userName', userObject.userName);
    }
}


//Skapar fler objekt för användar info 
userObject.wordLength = 0;
userObject.date = 0; //Date().toLocaleDateString();
userObject.time = 0; //Date().toLocaleTimeString();
userObject.win = false;
userObject.win = false;
userObject.nrWin = 0;
userObject.nrLost = 0;
userObject.numberOfFailedGuesses = 0;


//Låter användaren klicka utaför modal rutan för att stänga rutan.
const openModalBtn = document.getElementById('openModalBtn');
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

//funktion för att stänga modal med "X"
const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

localStorage.setItem('userObject', JSON.stringify(userObject))





/* Så här hämtar vi och skickar upp värden till localStorage */
//hämta localStorage   
/* userObject = JSON.parse(localStorage.getItem('userObject')) || {}; /*

//ändra värderna
/* userObject.wordLength = 10; */

// Spara uppdaterad användardata till localStorage
/* localStorage.setItem('userObject', JSON.stringify(userObject)); */