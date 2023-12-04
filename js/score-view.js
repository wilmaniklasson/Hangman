let userObjectsArray = [];
document.addEventListener('DOMContentLoaded', () => {
  // hämta från localStorage, assigna to vår varibel.
  // behöver inte uppdatera härifrån längre, då vi får update från game-view ;)

  userObjectsArray = JSON.parse(localStorage.getItem('userObjectsArray')) || [];
  console.log('User Objects Array:', userObjectsArray);
});

userObjectsArray.sort(sortByIncorrectGuesses);

const top10Scores = userObjectsArray.slice(0, 10);
	
top10Scores.forEach(score => {
		addToScoreboard(score);
	});
	
	const sortBtn = document.querySelector('#sortBtn');
	sortBtn.addEventListener('click', () => {
		userObjectsArray.sort(sortByDateTime);
		localStorage.setItem('userObjectsArray',JSON.stringify(userObjectsArray));
		console.log(userObjectsArray);
		
		// Clear the current scoreboard
		const scoreboardBody = document.querySelector('#scoreboardBody');
		scoreboardBody.innerHTML = '';
		
	 // Re-render the scoreboard
   const top10Scores = userObjectsArray.slice(0, 10);
   top10Scores.forEach(score => {
     addToScoreboard(score);
   });
 });
	
function sortByIncorrectGuesses(a, b) {
	return a.incorrect - b.incorrect;
  }

function sortByDateTime(a, b) {
	const aDateTime = new Date(`${a.date}  ${a.time}`);
	const bDateTime = new Date(`${b.date}  ${b.time}`);
	return aDateTime - bDateTime;
  }

function addToScoreboard(userObject) {
	const scoreboardBody = document.querySelector('#scoreboardBody');
	// build elements for the list
	const row = document.createElement("tr");

	const nameCell = document.createElement('td');
	let name = document.createTextNode(userObject.userName);

	const resultCell = document.createElement('td');
	let result = document.createTextNode(`Wins: ${userOBject.win}, Losses: ${userObject.lost}`);

	const dateCell = document.createElement('td');
	const dateTime = new Date(userObject.date + " " + userObject.time);
	let date = document.createTextNode(dateTime.toLocaleString());
	dateCell.className = 'date-time';

	const wordsCell = document.createElement('td');
	let words = document.createTextNode(userObject.words);

	const incorrectCell = document.createElement('td');
	let incorrectGuesses = document.createTextNode(userObject.incorrectGuesses);

	nameCell.appendChild(name);
	row.appendChild(nameCell);

	resultCell.appendChild(result);
	row.appendChild(resultCell);

	dateCell.appendChild(date);
	row.appendChild(dateCell);

	wordsCell.appendChild(words);
	row.appendChild(wordsCell);

	incorrectCell.appendChild(incorrectGuesses);
	row.appendChild(incorrectCell);

	scoreboardBody.appendChild(row);
}









/*
// Funktion för att ändra sortUserObjectsArrayeringsordningen baserat på antal gissningar
function changesortUserObjectsArraying(sortUserObjectsArrayAscending) {
  fillTableFromLocalStorage(sortUserObjectsArrayAscending);
}

// Funktion för att ändra sortUserObjectsArrayeringsordningen baserat på datum och tid
function changesortUserObjectsArrayingByDate(sortUserObjectsArrayAscending) {
  const tableBody = document.getElementById("scoreboardBody");
  tableBody.innerHTML = ""; // Rensa tabellen innan sortUserObjectsArrayering

  // Hämta data från localStorage
  let userObjectsArray = getDataFromLocalStorage();

  // sortUserObjectsArrayera omgångarna baserat på datum/tid
  userObjectsArray = userObjectsArray.sortUserObjectsArray((a, b) => {
    const dateA = new Date(a.date + " " + a.time);
    const dateB = new Date(b.date + " " + b.time);
    return sortUserObjectsArrayAscending ? dateA - dateB : dateB - dateA;
  });
  */