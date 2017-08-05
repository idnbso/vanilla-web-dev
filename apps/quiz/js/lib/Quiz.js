function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[ this.currentQuestionIndex ];
};

Quiz.prototype.isQuizOver = function() {
    return this.questions.length === this.currentQuestionIndex;
};

Quiz.prototype.isCorrectAnswer = function(answer) {
    var isCorrectAnswer = this.getCurrentQuestion()
                              .isCorrectAnswer(answer);

    this.currentQuestionIndex++;
    this.score += isCorrectAnswer ? 1 : 0;

    return isCorrectAnswer;
};