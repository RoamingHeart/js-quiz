//setting up the questions
var questions = [
    {
        question: "What is the full name of JS?",
        answer: "JavaScript",
        choices: [
            "Java Scriptures",
            "Jacked Sands",
            "JavaScript",
            "Johann Schimitt"
        ]
    },
    {
        question: "What data type does NOT use quotation marks?",
        answer: "Boolean",
        choices: [
            'String',
            'Boolean',
            'Bigint',
            'Symbol'
        ]
    },
    {
        question: "What values does Booleans have?",
        answer: "True/False",
        choices: [
            "Numbers",
            "True/False",
            "String",
            "Good/Evil"
        ]
    },
    {
        question: "What is Not a JavaScript Data Type?",
        answer: "Binary",
        choices: [
            "Boolean",
            "Symbol",
            "String",
            "Binary"
        ]
    },
]
//pulls from the html
var quizBody = document.querySelector(".quiz-body");
var timeLeft = document.getElementById('timeLeft');
var startQuiz = document.querySelector('#start-quiz');
var questBody = document.querySelector("#questions-body");
var choiceList = document.querySelector('#choice-list')

//creating varibles for quiz
var score = 0;
var questIndex = 0;

//timer varibles
var timeSeconds = 30;
var timeInt = 0;
var deduction = 5;

//making a function to be able to set multiple attributes in to element
function multiAttribute(ele1, ele2) {
    for(var ele3 in ele2) {
        ele1.setAttribute(goodbye, ele2[ele3])
    }
}

//ending the quiz
function finished() {
    questBody = '';
    timeLeft = '';

    //create a title for the end of the quiz
    var closeState = document.createElement('h1');
    closeState.setAttribute("id", 'closing-statement');
    closeState.textContent = 'You have finished the quiz.';
    //add the closing statement to the question body
    questBody.appendChild(closeState);

    //setting the time as the score
    if(timeSeconds >= 0) {
        //set the remaining time into a variable
        let endTime = timeSeconds;
        //create a p element for the text to be displayed
        let scoreText = document.createElement('p');
        //appends the p element into the question body
        questBody.appendChild(scoreText);
        clearInterval(timeInt)
        scoreText.textContent = 'Your ending points of ' + endTime;
    }

    //creating elements for players to input initials and submitting it to the highscores
    let input = document.createElement('label');
    let initials = document.createElement('input');
    let submit = document.createElement('button');

    //text that asks the user to input their initials
    initials.setAttribute('class', 'initials');
    initials.textContent = 'Please enter in your initials for documenting';

    //input field where user enters in their initials
    multiAttribute(input, {'class': 'input', 'type': 'text'});
    input.textContent = '';

    //submit button
    multiAttribute(submit, {'class': 'submit', 'type': 'submit'});
    submit.textContent = "Submit";

    //adds the created elements into the main body of the quiz
    questBody.appendChild(input);
    questBody.appendChild(initials);
    questBody.appendChild(submit);


    //function to store the user initals
    submit.addEventListener("click", function () {
        let storage = input.value;

        if(storage === null) {
            console.log('nothing was entered')
        } else {
            //sets the user initials and finale score into one variable
            let ending = {
                storage: storage,
                score: endTime
            }
            //stores the final score and user initials into the browser
            let finale = localStorage.getItem('finale');
            if(finale === null) {
                finale = [];
            } else {
                finale.JSON.parse(finale);
            }
            finale.push(ending);
            let scores = JSON.stringify(finale);
            localStorage.setItem('finale', scores);

            //moves user to a new page for the scores
            window.location.replace('./highscores.html')
        }
    })
}

//creates a list element where the question choices will go
var newList = document.createElement("ul");
//pushes questions onto the screen and creates list items for the choices
function display(questIndex) {
    
    //turns the questions and answers section blank first
    questBody.innerHTML = '';
    choiceList.innerHTML ='';
    

    for(var i = 0; i < questions.length; i++) {
        //pulls the questions from the questions array
        var quizQuest = questions[questIndex].question;
        //pulls the choices from the questions array
        var quizChoice = questions[questIndex].choices;
        //displays the question onto the screen in the form of text
        questBody.textContent = quizQuest;
    }  

    quizChoice.forEach((listItem) => {
        //creates a list item
        let itemList = document.createElement('li');
        //sets the content of the list to the listItem
            itemList.textContent = listItem;
        //sets the created list into the question body
            questBody.appendChild(newList);
        //sets the list items into the list inside the question body
            newList.appendChild(itemList);
        //calls the function to the list item, clicking it as a button to change to next question
            itemList.addEventListener('click', (rightLeft));
    });
    
}

function rightLeft(event) {
    var lefty = event.target;
    
    
    if(lefty.matches('li')) {
        var righty = document.createElement("div");
        righty.setAttribute("id", "righty");
        questBody.appendChild(righty);
        if(lefty.textContent === questions[questIndex].answer){
            score++;
            righty.textContent = 'correct'
        }  else {
            timeSeconds = timeSeconds - deduction;
            righty.textContent = 'incorrect'
        }
    }

    questIndex++;

    if(questIndex >= questions.length) {
        finished();
    } else {
        display(questIndex);
    }
    
}


//triggering the timer when clicking the button
startQuiz.addEventListener('click', function() {
    if(timeInt === 0) {
        timeInt = setInterval(function () {
            timeSeconds--;
            timeLeft.textContent = timeSeconds + "second(s)";

            if(timeLeft = 0) {
                clearInterval(timeInt);
                finished();
                timeLeft.textContent("There is no time left...");
            }
        }, 1000)
    }
    display(questIndex);
})