// Funktion för att hämta data från localStorage
function getDataFromLocalStorage() {
  const storedData = localStorage.getItem('userObjectsArray');
  return storedData ? JSON.parse(storedData) : [];
}

// Funktion för att fylla i tabellen med data från localStorage
function fillTableFromLocalStorage(sortAscending) {
  const tableBody = document.getElementById("scoreboardBody");

  // Hämta data från localStorage
  let userObjectsArray = getDataFromLocalStorage();

  // Sortera omgångarna baserat på antal gissningar
  userObjectsArray = userObjectsArray.sort((a, b) => {
    return sortAscending ? a.IncorrectGuesses - b.IncorrectGuesses : b.IncorrectGuesses - a.IncorrectGuesses;
  });

  // Rensa tabellen innan du fyller i den på nytt
  tableBody.innerHTML = "";

  // Loopa igenom varje användares data och skapa en rad i tabellen för varje användare
  userObjectsArray.forEach(function (user) {
    const row = document.createElement("tr");

    // Skapa celler och lägg till text
    const nameCell = document.createElement("td");
    nameCell.textContent = user.userName;

    const resultCell = document.createElement("td");
    resultCell.textContent = user.win ? "Win" : "Lost";

    const dateTimeCell = document.createElement("td");
    const dateTime = new Date(user.date + " " + user.time);
    dateTimeCell.textContent = dateTime.toLocaleString(); // Slå ihop datum och tid

    const wordLengthCell = document.createElement("td");
    wordLengthCell.textContent = user.wordLength;

    const incorrectGuessesCell = document.createElement("td");
    incorrectGuessesCell.textContent = user.IncorrectGuesses;

    // Lägg till cellerna till raden
    row.appendChild(nameCell);
    row.appendChild(resultCell);
    row.appendChild(dateTimeCell); // Använd dateTimeCell istället för dateCell och timeCell
    row.appendChild(wordLengthCell);
    row.appendChild(incorrectGuessesCell);

    // Lägg till raden till tabellen
    tableBody.appendChild(row);
  });
}

// Funktion för att ändra sorteringsordningen baserat på antal gissningar
function changeSorting(sortAscending) {
  fillTableFromLocalStorage(sortAscending);
}

// Funktion för att ändra sorteringsordningen baserat på datum och tid
function changeSortingByDate(sortAscending) {
  const tableBody = document.getElementById("scoreboardBody");
  tableBody.innerHTML = ""; // Rensa tabellen innan sortering

  // Hämta data från localStorage
  let userObjectsArray = getDataFromLocalStorage();

  // Sortera omgångarna baserat på datum/tid
  userObjectsArray = userObjectsArray.sort((a, b) => {
    const dateA = new Date(a.date + " " + a.time);
    const dateB = new Date(b.date + " " + b.time);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });

  // Loopa igenom varje användares data och skapa en rad i tabellen för varje användare
  userObjectsArray.forEach(function (user) {
    const row = document.createElement("tr");

    // Skapa celler och lägg till text
    const nameCell = document.createElement("td");
    nameCell.textContent = user.userName;

    const resultCell = document.createElement("td");
    resultCell.textContent = user.win ? "Win" : "Lost";

    const dateTimeCell = document.createElement("td");
    const dateTime = new Date(user.date + " " + user.time);
    dateTimeCell.textContent = dateTime.toLocaleString(); // Slå ihop datum och tid

    const wordLengthCell = document.createElement("td");
    wordLengthCell.textContent = user.wordLength;

    const incorrectGuessesCell = document.createElement("td");
    incorrectGuessesCell.textContent = user.IncorrectGuesses;

    // Lägg till cellerna till raden
    row.appendChild(nameCell);
    row.appendChild(resultCell);
    row.appendChild(dateTimeCell); // Använd dateTimeCell istället för dateCell och timeCell
    row.appendChild(wordLengthCell);
    row.appendChild(incorrectGuessesCell);

    // Lägg till raden till tabellen
    tableBody.appendChild(row);
  });
}

// Add event listener for the sort button
document.getElementById("sortBtn").addEventListener("click", function() {
  // Get the selected sorting option from the dropdown
  const selectedOption = document.getElementById("sortOptions").value;

  // Perform sorting based on the selected option
  switch (selectedOption) {
    case "ascGuesses":
      changeSorting(true);
      break;
    case "descGuesses":
      changeSorting(false);
      break;
    case "ascDate":
      changeSortingByDate(true);
      break;
    case "descDate":
      changeSortingByDate(false);
      break;
    default:
      console.error("Invalid sorting option.");
  }
});

// Skapa några testanvändare manuellt
const testUser1 = {
  userName: "Player1",
  win: true,
  lost: false,
  date: "2023-12-01",
  time: "15:30",
  wordLength: 7,
  IncorrectGuesses: 3,
  difficulty: "easy",
  secretWord: "example",
};

const testUser2 = {
  userName: "Player2",
  win: false,
  lost: true,
  date: "2023-12-02",
  time: "10:45",
  wordLength: 5,
  IncorrectGuesses: 6,
  difficulty: "medium",
  secretWord: "testing",
};

const testUser3 = {
  userName: "Player3",
  win: true,
  lost: false,
  date: "2023-12-03",
  time: "18:15",
  wordLength: 8,
  IncorrectGuesses: 2,
  difficulty: "hard",
  secretWord: "challenge",
};

const testUser4 = {
  userName: "Player4",
  win: false,
  lost: true,
  date: "2023-12-04",
  time: "14:20",
  wordLength: 6,
  IncorrectGuesses: 4,
  difficulty: "medium",
  secretWord: "puzzle",
};

const testUser5 = {
  userName: "Player5",
  win: true,
  lost: false,
  date: "2023-12-05",
  time: "20:00",
  wordLength: 9,
  IncorrectGuesses: 1,
  difficulty: "easy",
  secretWord: "solution",
};

const testUser6 = {
  userName: "Player6",
  win: false,
  lost: true,
  date: "2023-12-06",
  time: "12:30",
  wordLength: 7,
  IncorrectGuesses: 5,
  difficulty: "hard",
  secretWord: "mystery",
};

const testUser7 = {
  userName: "Player7",
  win: true,
  lost: false,
  date: "2023-12-07",
  time: "16:45",
  wordLength: 6,
  IncorrectGuesses: 2,
  difficulty: "medium",
  secretWord: "journey",
};

const testUser8 = {
  userName: "Player8",
  win: false,
  lost: true,
  date: "2023-12-08",
  time: "22:10",
  wordLength: 8,
  IncorrectGuesses: 3,
  difficulty: "easy",
  secretWord: "adventure",
};

const testUser9 = {
  userName: "Player9",
  win: true,
  lost: false,
  date: "2023-12-09",
  time: "19:30",
  wordLength: 7,
  IncorrectGuesses: 1,
  difficulty: "medium",
  secretWord: "strategy",
};

const testUser10 = {
  userName: "Player10",
  win: false,
  lost: true,
  date: "2023-12-10",
  time: "11:55",
  wordLength: 9,
  IncorrectGuesses: 4,
  difficulty: "hard",
  secretWord: "conundrum",
};

const testUser11 = {
  userName: "Player11",
  win: true,
  lost: false,
  date: "2023-12-11",
  time: "14:45",
  wordLength: 8,
  IncorrectGuesses: 2,
  difficulty: "easy",
  secretWord: "solution",
};




// Lägg till testanvändarna i userObjectsArray
let userObjectsArray = [testUser1, testUser2 ,testUser3, testUser4, testUser5, testUser6, testUser7, testUser8, testUser9, testUser10, testUser11];

// Spara userObjectsArray i localStorage
localStorage.setItem('userObjectsArray', JSON.stringify(userObjectsArray));

// Anropa funktionen för att fylla i tabellen vid behov (sortDescending är true för att visa bästa omgångar överst)
fillTableFromLocalStorage(true);




// Funktion för att visa "game over"-vyn med data från det senaste objektet
function displayGameOverView() {
  const gameOverView = document.querySelector(".game-over-view");
  const resultMessage = document.getElementById("resultMessage");
  const result = document.getElementById("result");
  const secretWord = document.getElementById("secretWord");
  const incorrectGuesses = document.getElementById("incorrectGuesses");

  // Hämta data från localStorage
  const userObjectsArray = getDataFromLocalStorage();

  // Hämta det senaste objektet i arrayen
  const latestUserObject = userObjectsArray[userObjectsArray.length - 1];

  if (latestUserObject) {
    // Visa rätt meddelande baserat på resultatet
    resultMessage.textContent = latestUserObject.win ? "Congratulations! You've successfully conquered the game." : "You lost. Better luck next time!";

    // Fyll i detaljerna från det senaste objektet
    result.textContent = latestUserObject.win ? "Win" : "Lost";
    secretWord.textContent = "Secret Word: " + latestUserObject.secretWord;
    incorrectGuesses.textContent = "Incorrect Guesses: " + latestUserObject.IncorrectGuesses;

    // Visa "game over"-vyn
    gameOverView.style.display = "block";
  } else {
    console.error("No data available for game over view.");
  }
}

// Anropa funktionen för att visa "game over"-vyn
displayGameOverView();
