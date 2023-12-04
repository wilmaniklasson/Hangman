let userObjectsArray = [];

document.addEventListener('DOMContentLoaded', () => {
	// hämta från localStorage, assigna to vår varibel.
	// behöver inte uppdatera härifrån längre, då vi får update från game-view ;)

	userObjectsArray = JSON.parse(localStorage.getItem('userObjectsArray')) || [];
	console.log('User Objects Array:', userObjectsArray);

	// din sorterings algoritm här
	userObjectsArray.sort((a, b) => {
		const incorrectComparison = a.incorrect - b.incorrect;
		if (incorrectComparison !== 0) {
			return incorrectComparison;
		}

		const aDateTime = new Date(`${a.date}  ${a.time}`);
		const bDateTime = new Date(`${b.date}  ${b.time}`);
		return aDateTime - bDateTime;
	});

	const top10Scores = userObjectsArray.slice(0, 10);

	top10Scores.forEach(score => {
		addToScoreboard(score);
	});
});


function addToScoreboard(userObject) {
  const scoreboardBody = document.querySelector('#scoreboardBody');
  // bygg ut elementen för listan
  const row = document.createElement("tr");

  const nameCell = document.createElement('td');
  let name = document.createTextNode(userObject.userName);

  const resultCell = document.createElement('td');
  let result = document.createTextNode(userObject.win ? 'Won' : 'Lost');

  const dateCell = document.createElement('td');
  const dateTime = new Date(userObject.date + " " + userObject.time);
  let date = document.createTextNode(dateTime.toLocaleString()); 
  date.addclassName = 'date-time';

  const wordsCell = document.createElement('td');
  let words = document.createTextNode(userObject.words);

  const incorrectCell = document.createElement('td');
  let incorrectGuesses = document.createTextNode(userObject.incorrectGuesses);


  nameCell.appendChild(name);
  row.appendChild(nameCell);

  resultCell.appendChild(result);
  row.appendChild(resultCell);
  scoreboardBody.appendChild(row);

  dateCell.appendChild(date);
  row.appendChild(dateCell);

  wordsCell.appendChild(words);
  row.appendChild(wordsCell);
  
  incorrectCell.appendChild(incorrectGuesses);
  row.appendChild(incorrectCell);
}



