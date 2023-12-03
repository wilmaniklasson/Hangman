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

const scoreboardBody = document.querySelector('#scoreboardBody');

function addToScoreboard(userObject) {
	// bygg ut elementen för listan
	const row = document.createElement("tr");

	for (const key in userObject) {
		if (userObject.hasOwnProperty(key)) {
			const cell = document.createElement("td");
			cell.innerText = userObject[key];
			row.appendChild(cell);
		}
	}

	scoreboardBody.appendChild(row);
}