// Lista på testdata

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
  { name: "Isabel", result: "Win", date: "2023-11-14", time: "18:00", correct: 4, words: 4, incorrect: 1 },
  { name: "Jack", result: "Loss", date: "2023-11-13", time: "22:15", correct: 2, words: 3, incorrect: 9 },
  { name: "Kmaren", result: "Win", date: "2023-11-10", time: "09:38", correct: 2, words: 2, incorrect: 0 },
  { name: "Liam", result: "Loss", date: "2023-11-11", time: "15:45", correct: 3, words: 5, incorrect: 9 },
  { name: "Laren", result: "Win", date: "2023-11-12", time: "08:30", correct: 2, words: 2, incorrect: 0 },

  ];
// function renderScoreboard(data) {
// 	const scoreboardBody = document.getElementById('scoreboardBody')

// 	data.forEach(score => {
// 		addToScoreboard(score)
// 	});
// }
// document.addEventListener('DOMContentLoaded', () => {
// const sortTimeBtn = document.getElementById('sortTimeBtn');	

// sortTimeBtn.addEventListener('click', () => {
// const sortedData = toSorted(scoreboardData, 'time');		 
// 	  renderScoreboard(sortedData);
// });
// })
// 	function toSorted(data, sortBy = 'time') {
// 		return data.slice().sort((a, b) => {
// 		  if (sortBy === 'mistakes' || sortBy !== 'time') {
// 			const incorrectComparison = a.incorrect - b.incorrect;
// 			if (incorrectComparison !== 0) {
// 			  return incorrectComparison;
// 			}
// 		  } else if (sortBy === 'time') {
// 			const aDateTime = new Date(`${a.date} ${a.time}`);
// 			const bDateTime = new Date(`${b.date} ${b.time}`);
// 			return aDateTime - bDateTime;
// 		  }
// 		});
// 	  }	

  const scoreboardDataList = document.querySelector('scoreboardData')
//   Sorterar antalet minst fel
  scoreboardData.sort((a, b) => {
	const incorrectComparison = a.incorrect - b.incorrect;
	if (incorrectComparison !== 0) {
		return incorrectComparison
	}

	

// Här sorterar vi etfer tid och datum om antalet fel är samma.	
const aDateTime = new Date(`${a.date}  ${a.time}`);
const bDateTime = new Date(`${b.date}  ${b.time}`);
return aDateTime - bDateTime;
});
//   Här väljer vi hur många som ska vara med på topplistan
  const top10Scores = scoreboardData.slice(0, 10);

//   Denna funktion lägger till rader till columner i scoreboarden
  function addToScoreboard(user) {
    const row = document.createElement("tr");

// Här skapas celler med innehållet från userObject
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        const cell = document.createElement("td");
        cell.textContent = user[key];
        row.appendChild(cell);
      }
    }

    document.querySelector("#scoreboardBody").appendChild(row);
  }

//   Här loopar det igenom listan med resultat och lägger till dom bästa, om inte resultatet är bättre än någon på scoreboarden gör den inget synligt.
  top10Scores.forEach(score => {
    addToScoreboard(score);
  });


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
  