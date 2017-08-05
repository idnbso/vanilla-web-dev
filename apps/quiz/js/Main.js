(function(QuizApp){
    var questionElement = document.getElementById('question');
    var answersButtonsElements = document.getElementsByClassName('answer-button');
    var currentQuestionElement = document.getElementById('current-question');
    var totalQuestionsElement = document.getElementById('total-questions');
    var resultElement = document.getElementById('quiz');

    new QuizApp(questionElement, answersButtonsElements, currentQuestionElement,
        totalQuestionsElement, resultElement);
})(App);