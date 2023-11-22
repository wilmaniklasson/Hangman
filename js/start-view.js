const userNameInput = document.querySelector('#user-name-input');
const startGame = document.querySelector('#start-game');
const userInputObject = {};

startGame.addEventListener('click', function(event) {
    event.preventDefault();
    saveInput();
    console.log(userInputObject);

    localStorage.setItem('userName', userInputObject.userName);
});

function saveInput() {
    const userName = userNameInput.value;
    userInputObject.userName = userName;
}

/* const storedUserName = localStorage.getItem('userName'); */

