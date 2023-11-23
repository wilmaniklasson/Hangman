const userNameInput = document.querySelector('#user-name-input');
const btnStartGame = document.querySelector('#start-game')
const startViewSection = document.querySelector('.start-view-section');         
const gameViewSection = document.querySelector('.game-view-section');          
const scoreViewSection = document.querySelector('.score-view-section');   
const userInputObject = {};


btnStartGame.addEventListener('click', function(event) {
    event.preventDefault();
    saveInput();
    console.log(userInputObject);


    if (userInputObject.userName) {
        startViewSection.classList.add('hidden');
        gameViewSection.classList.remove('hidden'); // Visa spelvyn
        scoreViewSection.classList.add('hidden');
        console.log(userInputObject);
    } else {
        alert("Vänligen fyll i ditt användarnamn innan du startar spelet.");
    }
    
});

function saveInput() {
    const userName = userNameInput.value;
    userInputObject.userName = userName;

    if (userInputObject.userName) {
        localStorage.setItem('userName', userInputObject.userName);
    }
}





/* const storedUserName = localStorage.getItem('userName'); */
