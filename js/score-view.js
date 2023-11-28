const scoreboardData = [
    { name: "Alice", result: "Win", date: "2023-11-23", time: "14:30", correct: 3, words: 3, incorrect: 2 },
    { name: "Bob", result: "Loss", date: "2023-11-22", time: "19:45", correct: 1, words: 2, incorrect: 9 },
    { name: "Charlie", result: "Win", date: "2023-11-20", time: "10:15", correct: 4, words: 4, incorrect: 1 },
  { name: "David", result: "Loss", date: "2023-11-19", time: "16:30", correct: 2, words: 3, incorrect: 9 },
  { name: "Eva", result: "Win", date: "2023-11-18", time: "21:45", correct: 2, words: 2, incorrect: 0 },
  { name: "Frank", result: "Loss", date: "2023-11-17", time: "12:00", correct: 4, words: 5, incorrect: 9 },
  { name: "Grace", result: "Win", date: "2023-11-16", time: "08:30", correct: 3, words: 3, incorrect: 2 },
  { name: "Harry", result: "Loss", date: "2023-11-15", time: "14:45", correct: 1, words: 2, incorrect: 9 },
  { name: "Isabel", result: "Win", date: "2023-11-14", time: "18:00", correct: 4, words: 4, incorrect: 1 },
  { name: "Jack", result: "Loss", date: "2023-11-13", time: "22:15", correct: 2, words: 3, incorrect: 9 },
  { name: "Karen", result: "Win", date: "2023-11-12", time: "09:30", correct: 2, words: 2, incorrect: 0 },
  { name: "Liam", result: "Loss", date: "2023-11-11", time: "15:45", correct: 3, words: 5, incorrect: 9 },

  ];

  // Sort the scoreboard data by the number of correct words in descending order
  scoreboardData.sort((a, b) => a.incorrect - b.incorrect);

  // Display only the top 10 scores
  const top10Scores = scoreboardData.slice(0, 5);

  // Function to add a row to the scoreboard
  function addToScoreboard(user) {
    const row = document.createElement("tr");

    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        const cell = document.createElement("td");
        cell.textContent = user[key];
        row.appendChild(cell);
      }
    }

    document.querySelector("#scoreboardBody").appendChild(row);
  }

  // Add the top 10 scores to the scoreboard
  top10Scores.forEach(score => {
    addToScoreboard(score);
  });


//   /i första hand stigande på antal gissningar

 
//   , i andra hand fallande på datum och tid för omgången. Man ska kunna växla till att visa omgångarna sorterade i fallande ordning på datum och tid./



//Skapar ett objet för användar info
const userObject = {
  userName: null,
  win: null,
  Lost: null,
  date: null,
  time: null,
  correct: null,
  wordLength: null, 
  numberOfFailedGuesses: null
  };     
  
  export { scoreboardData}