import { updateGameState } from './game-view.js';
import { newUserObject } from './start-view.js';

// // Lista på testdata
let storedData = []

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded event fired')
	storedData = JSON.parse(localStorage.getItem('key')) || [];
	console.log('stored data:', storedData);
});


  const scoreboardBody = document.querySelector('#scoreboardBody')
  console.log('Scoreboard Body: ', scoreboardBody);
//   Sorterar antalet minst fel
  storedData.sort((userObjectsArrayA, userObjectsArrayB) => {
	const incorrectComparison = userObjectsArrayA.incorrect - userObjectsArrayB.incorrect;
	if (incorrectComparison !== 0) {
		return incorrectComparison
	}


// Här sorterar vi etfer tid och datum om antalet fel är samma.	
const aDateTime = new Date(`${userObjectsArrayA.date}  ${userObjectsArrayA.time}`);
const bDateTime = new Date(`${userObjectsArrayB.date}  ${userObjectsArrayB.time}`);
return aDateTime - bDateTime;
});
//   Här väljer vi hur många som ska vara med på topplistan
  const top10Scores = storedData.slice(0, 10);

//   Denna funktion lägger till rader till columner i scoreboarden
  function addToScoreboard(userObjectsArray) {
    const row = document.createElement("tr");
	

// Här skapas celler med innehållet från userObjectsArray
    for (const key in userObjectsArray) {
      if (userObjectsArray.hasOwnProperty(key)) {
        const cell = document.createElement("td");
        cell.innerText = userObjectsArray[key];
        row.appendChild(cell);
      }
    }

    scoreboardBody.appendChild(row);
  }

//   Här loopar det igenom listan med resultat och lägger till dom bästa, om inte resultatet är bättre än någon på scoreboarden gör den inget synligt.
  top10Scores.forEach(score => {
    addToScoreboard(score);
  });

  console.log(localStorage);
  console.log('storedData:', storedData);
console.log('top10Scores:', top10Scores);

//Skapar ett objet för användar info
// const userObject = {
//   userName: null,
//   win: null,
//   Lost: null,
//   date: null,
//   time: null,
//   correct: null,
//   wordLength: null, 
//   numberOfFailedGuesses: null
//   };     