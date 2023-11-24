// Deklarera userObject
const userObject = {
    userName: null,
    win: null,
    lost: null,
    date: null,
    time: null,
    wordLength: null,
    numberOfFailedGuesses: null,
    currentScore: null  // Lägg till currentScore här om du använder det
};


// Simulerad data för startView och gameView
let startView = {
    player: "Alice",
    date: "2023-11-24",
    time: "15:45",
};


let gameView = {
    correctLetters: 7,
    incorrectLetters: 2,
    wordToGuess: "EXAMPLE",
};

// Funktion för att generera testdata och uppdatera userObject
function genereraHangmanTestdata(startView, gameView) {
    // Skapa en unik id baserad på tidsstämpel
    const id = new Date().getTime().toString();

    // Uppdatera userObject med simulera användarens poäng för hänga gubbe-spelet
    userObject.userName = startView.player;
    userObject.date = startView.date;
    userObject.time = startView.time;
    userObject.win = gameView.correctLetters === gameView.wordToGuess.length;
    userObject.lost = !userObject.win;
    userObject.wordLength = gameView.wordToGuess.length;
    userObject.numberOfFailedGuesses = gameView.incorrectLetters;

    // Spara userObject i localStorage
    localStorage.setItem('userObject', JSON.stringify(userObject));

    console.log("Testdata för hänga gubbe har genererats och uppdaterat userObject.");
}

// Anropa funktionen för att generera testdata för hänga gubbe
genereraHangmanTestdata(startView, gameView);

// Hanterar datan 
function updateScore(score) {
    let updatedScore = score + 100;
    return updatedScore;
}

// Hanterar datan
function getScore(userObject) {
    let calculatedScore = userObject.win ? userObject.wordLength * 5 : userObject.numberOfFailedGuesses * 2;
    return calculatedScore;
}

function updateDisplay(data) {
    const resultDiv = document.getElementById('resultDiv');

    // Skapa en div för användarinformation
    const userInfoDiv = document.createElement('userInfoDiv');
    userInfoDiv.innerHTML = `
        <h2>Användare: ${userObject.userName}</h2>
        <tr>Datum: ${userObject.date}</tr>
        <tr>Tid: ${userObject.time}</tr>
        <tr>Antal korrekta bokstäver: ${gameView.correctLetters}</tr>
        <tr>Antal felaktiga gissningar: ${gameView.incorrectLetters}</tr>
        <tr>Ordet att gissa: ${gameView.wordToGuess}</tr>
        <tr>Antal poäng: ${data}</tr>
    `;

    // Rensa resultDiv och lägg till userInfoDiv
    resultDiv.innerHTML = '';
    resultDiv.appendChild(userInfoDiv);
}


// Hämta testdata från localStorage
const storedUserData = JSON.parse(localStorage.getItem('userObject'));

// Använd funktionerna med testdatan
const initialScore = storedUserData.currentScore; // Antag att currentScore är det du vill uppdatera
const updatedScore = updateScore(initialScore);
const calculatedScore = getScore(storedUserData);

// Uppdatera gränssnittet med de nya poängen
updateDisplay(updatedScore);
updateDisplay(calculatedScore);