const userScore = document.getElementById('highscore');
//not able to declare 'return' as a variable
const back = document.getElementById('return');
const reset = document.getElementById('reset');

//pulls from the data stored in the browser
let finale = localStorage.getItem("finale");
finale = JSON.parse(finale);

//if the data stored is not empty
if (finale !== null) {
    for(let i = 0; i < finale.length; i++) {
        //create a list item to input the user data
        var scoreList = document.createElement("li");
        //add the list item in the highscores list
        userScore.appendChild(scoreList);
        scoreList.textContent = finale[i].storage + ' ' + finale.score;
    }
}

back.on('click', function () {
    window.location.replace('./index.html');
})

//resetting the highscores
reset.on('click', function () {
    localStorage.clear(reset);
    location.reload
})
