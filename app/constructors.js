

function Questionnaire(questionList) {
    this.questionList = questionList;
}

function Question(id, text, type, dependencies, required) {
    this.id = id;
    this.text = text;
    this.type = type;
    this.dependencies = dependencies || null;
    this.required = required || false;
    
    this.isReadyToShow = false;
    this.answer = null;
    this. update = function(questionList) {
        //update code
    }
}