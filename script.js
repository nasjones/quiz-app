let questNum;
let grade;
let progress;
let myArray;
let currentQuestion;
let hasItRun = false;


function initialState() {
    myArray = questionsArray.slice(0);
    grade = 0;
    progress = 1;
    questNum = questionsArray.length;
}

function getQuestion() {
    let randomNum = Math.floor(Math.random() * questNum);
    currentQuestion = myArray.splice(randomNum, 1);
    questNum--;
    quizBoxHtml(currentQuestion[0]);
    progressUpdate();
}

function quizBoxHtml(pass) {
    $('#quiz-box').empty();
    $('#quiz-box').append(`<h4 id="quiz-question">${pass.quest}</h4><div id="question-container">`);
    let tempChoices = pass.choices.slice(0);
    for (var i = pass.choices.length - 1; i >= 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        currentChoice = tempChoices.splice(r, 1);
        $('#question-container').append(`<label><input id="choice" type="radio" name="choice" value="${currentChoice}">${currentChoice}</label>`);
    }
    $('#quiz-box').append(`</div><button type="button" id="submit">Submit</button>`);
}

function questionCheck() {
    $('#quiz-box').on('click', '#submit', e => {
        e.preventDefault();
        let chosen = $(e.currentTarget).parent().find('input[name=choice]:checked');
        if (chosen.val()) {
            if (chosen.val() === currentQuestion[0].correctAnswer) {
                $('#quiz-box').html('<p>That is correct</p> <button type="button" id="next">Next>></button>');
                reactionAdd("positive");
                grade++;
            } else {
                $('#quiz-box').html(`<p>Sorry that is incorrect. The correct answer was '${currentQuestion[0].correctAnswer}'</p> <button type="button" id="next">Next>></button>`);
                reactionAdd("negative");
            }
        } else {
            alert("Please make a choice.");
        }
        progressUpdate();
        nextQuestion();
    });
}

function progressUpdate() {
    $('.progress').html(`<h2>Question ${progress} of ${length}</h2><h3>Your current score is ${grade}</h3>`);
}

function nextQuestion() {
    if (questNum != 0) {
        $('#next').on('click', e => {
            e.preventDefault();
            progress++;
            $('#quiz-box').empty();
            getQuestion();
        });
    } else {
        $('#next').on('click', e => {
            e.preventDefault();
            $('#quiz-box').empty();
            finalScore();
        });
    }
}

function reactionAdd(reactType) {
    if (reactType === "positive") {
        $('#quiz-box').append('<img src="https://data.whicdn.com/images/33408514/original.gif">');
    }
    else {
        $('#quiz-box').append('<img src="https://media2.giphy.com/media/1hPYD3gsL8wZa/source.gif">');
    }

}

function finalScore() {
    $('.progress').empty();
    $('#quiz-box').append(
        `<p class = "results">You've finished the quiz your final results are ${grade}/${length}<br>Click the button below if you'd like to take it again!</p>  
    <button type="button" id="reset">Reset</button>
    <img src="https://media3.giphy.com/media/KfyoEBbzEKc3C/source.gif">`);
    $('#reset').on('click', e => {
        $('#intro-pic').show();
        $('#prompt').show();
        $('#quiz-box').hide();
    });
}

function begin() {
    $('#begin').on('click', e => {
        if (!hasItRun) {
            e.preventDefault();
            initialState();
            $('#intro-pic').hide();
            $('#prompt').hide();
            $('#quiz-box').show();
            getQuestion();
            questionCheck();
            hasItRun = true;
        }
        else {
            e.preventDefault();
            initialState();
            getQuestion();
            $('#intro-pic').hide();
            $('#prompt').hide();
            $('#quiz-box').show();
        }

    });
}
$(begin);