/*const btnStartView = document.getElementById("btn-start-view");

btnStartView.addEventListener("click", doStuff);

console.log('HI');
console.log(btnStartView);

function doStuff() {
	console.log('WE DID STUFF!');
}*/

// script.js

const sections = document.querySelectorAll('.game-content div');

function showSection(sectionId) {
    // Göm alla sektioner
    const sections = document.querySelectorAll('.game-content div');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Visa den valda sektionen
    document.getElementById(sectionId).classList.remove('hidden');
}




