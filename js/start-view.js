//hämtar element
const startViewSection = document.querySelector('.start-view-section');
const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game')
const gameViewSection = document.querySelector('.game-view-section');
const scoreViewSection = document.querySelector('.score-view-section');
const modal = document.querySelector('#Modal'); 
 
//Skapar ett objet för användar info
const userObject = {
wordLength: null, 
date: null,
time: null,
userName: null,
win: null,
nrWin: null,
nrLost: null,
numberOfFailedGuesses: null
};     


btnStartGame.addEventListener('click', function(event) {
    event.preventDefault();
    userObject.userName = userNameInput.value;
    
    if (userObject.userName) {
        startViewSection.classList.add('hidden');
        gameViewSection.classList.remove('hidden'); // Visa spelvyn
        scoreViewSection.classList.add('hidden');
        console.log(userObject);
    } else {
        modal.style.display = 'block';
    }
    
});


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

localStorage.setItem('userObject', JSON.stringify(userObject)); 






/* Så här hämtar vi och skickar upp värden till localStorage */
//hämta localStorage   
/* userObject = JSON.parse(localStorage.getItem('userObject')) || {}; /*

//ändra värderna
/* userObject.wordLength = 10; */

// Spara uppdaterad användardata till localStorage
/* localStorage.setItem('userObject', JSON.stringify(userObject)); */



/* To do:
fixa en module box som kommer upp när man klickar esc och den ska även va en meny i header. Man ska kunna gå till start-view-section game-view-section och score-view-section*/


