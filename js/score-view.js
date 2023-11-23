//  gå igenom med anders om vilka variablar jag ska använda

// VARIABLER = userObject (.wordLenght, .date, .time, .win, .nrWin), userOBject.currentScore, userScore som tillfällig

// hämta resultat ( antal fel/rätt, namn och kanske tid ) från start-view och game-view (lokalStorage)

// skapa en funktion för att lägga till resultat till localStorage (det kommer göras i game-view)

// skapa funktion som sparar i localStorage

// uppdatera scoreboarden efter varje spel


// hanterar datan 
function updateScore (score) {
	let updatedScore = score + 10
	return updatedScore
	}
	
	// hanterar datan
	function getScore (userObject) {
		let calculatedScore = userObject.win ? userObject.wordLength * 5
		return score
	}
	
	// uppdaterar dom
	function updateDisplay (data) {
		
	}

	const userObject = {
		userName: null,
		win: null,
		lost: null,
		date: null,
		time: null,
		wordLength: null,
		numberOfFailedGuesses: null
	};
	
	// Simulerad data för startView och gameView
	let startView = {
		player: "Alice",
		date: "2023-11-24",
		time: "15:45",
	};
	
	let gameView = {
		correctLetters: 5,
		incorrectLetters: 3,
		wordToGuess: "EXAMPLE",
	};
	
	// Skapa en funktion för att generera testdata och uppdatera userObject
	function genereraHangmanTestdata() {
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
	
		// Du kan också spara userObject i localStorage om det behövs
		localStorage.setItem('userObject', JSON.stringify(userObject));
	
		console.log("Testdata för hänga gubbe har genererats och uppdaterat userObject.");
	}
	
	// Anropa funktionen för att generera testdata för hänga gubbe
	genereraHangmanTestdata();

	
	  


		// resultatet från tidigare omgångar:
		// spelarens namn,
		// antalet felaktiga gissningar,
		// ordets längd,
	    // datum+tid för omgången,
		// och om man vann eller förlorade.