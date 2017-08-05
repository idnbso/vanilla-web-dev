function App(questionElement, answersButtonsElements, currentQuestionElement,
             totalQuestionsElement, resultElement) {
    this.questions = [
        new Question('Which one is not an OOP language?', [ 'Java', 'C#', 'C++', 'C' ], 'C'),

        new Question('Which language is used for styling web pages?',
            [ 'HTML', 'jQuery', 'CSS', 'XML' ], 'CSS'),

        new Question('There are ____ major principles of OOP.', [ '1', '6', '2', '4' ], '4'),

        new Question('Which language is used for web apps?',
            [ 'PHP', 'Python', 'JavaScript', 'All' ], 'All'),

        new Question('MVC is a ____', [ 'Language', 'Library', 'Design Pattern', 'All' ],
            'Design Pattern')
    ];

    this.questionElement = questionElement;
    this.answersButtonsElements = answersButtonsElements;
    this.currentQuestionElement = currentQuestionElement;
    this.resultElement = resultElement;

    this.quiz = new Quiz(this.questions);
    currentQuestionElement.innerText = this.quiz.currentQuestionIndex + 1;
    totalQuestionsElement.innerText = this.questions.length;
    this.totalChoicesPerQuestion = this.questions[ 0 ].choices.length;

    for (var i = 0; i < this.totalChoicesPerQuestion; i++) {
        var button = answersButtonsElements[ i ];
        button.addEventListener('click', this.onClickAnswerButton.bind(this, button));
    }

    this.showCurrentQuestion.call(this);
}

App.prototype.onClickAnswerButton = function(button) {
    var answer = button.querySelector('.choice').innerText;

    this.quiz.isCorrectAnswer(answer);

    this.showCurrentQuestion();
};

App.prototype.showCurrentQuestion = function() {
    if (this.quiz.isQuizOver()) {
        this.showScore();
        return;
    }

    var currentQuestion = this.quiz.getCurrentQuestion();

    // Show the current question
    this.questionElement.innerText = currentQuestion.text;
    this.currentQuestionElement.innerText = this.quiz.currentQuestionIndex + 1;

    var choices = currentQuestion.choices;
    var currentChoiceIndex = 0;

    // Show all possible answers
    for (var i = 0; i < this.totalChoicesPerQuestion; i++) {
        var button = this.answersButtonsElements[ i ];
        var targetSpan = button.querySelector('.choice');

        targetSpan.innerText = choices[ currentChoiceIndex++ ];
    }
};

App.prototype.showScore = function() {
    var gameOverDiv = document.createElement('div');
    var resultHeader = document.createElement('h1');
    resultHeader.innerText = 'Result';

    var scoreHeader = document.createElement('h2');
    scoreHeader.id = 'score';
    scoreHeader.innerText = 'Your score is ' + this.quiz.score;

    gameOverDiv.appendChild(resultHeader);
    gameOverDiv.appendChild(scoreHeader);

    this.resultElement.innerText = '';
    this.resultElement.appendChild(gameOverDiv);
};