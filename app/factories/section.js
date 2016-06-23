app.factory('section', [function() {
    var s = function Section(id, title, subtitle, questionList) {
        var self = this;
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.questionList = questionList;

        this.updateQuestionsDependencies = function(modifiedQuestion){
            angular.forEach(this.getDependantQuestions(modifiedQuestion), function(question) {
                    question.updateIsDependencyReady(questionList, modifiedQuestion);
            });
        }
        this.updateQuestionsVisibility   = function(modifiedQuestion){
            var nextQuestions = this.getNextQuestions(modifiedQuestion);
            angular.forEach(nextQuestions, function(qn) {
                qn.updateVisibility(modifiedQuestion);
            })
        }
        this.update = function(modifiedQuestion){
            this.updateQuestionsDependencies(modifiedQuestion);
            this.updateQuestionsVisibility(modifiedQuestion);
        }
        this.getNextQuestions = function(question) {
            var nextQuestions = [];
            angular.forEach(this.questionList, function(qn) {
                    if (qn.showIndex - 1 === question.showIndex) {
                        nextQuestions.push(qn);
                    }
            });
            return nextQuestions;
        }
        this.getDependantQuestions = function(question) {
            var dependantQuestions = [];
            angular.forEach(this.questionList, function(qn) {
                    if (qn.dependsOn(question)) {
                        dependantQuestions.push(qn);
                    }
            });
            return dependantQuestions;
        } 
        this.submitAnswerAndUpdate = function(questionId, answer) {
            var qn = this.getQuestionById(questionId);
            if (angular.isDefined(qn)) {
                qn.submitAnswer(answer);
                this.update(qn);
                return true;
            } else {
                return false;
            }

        }
        this.getQuestionById = function(questionId) {
            return this.questionList.filter(function(qn) {
                return qn.id === questionId;
            })[0];
        }
    };
    return s;
}]);