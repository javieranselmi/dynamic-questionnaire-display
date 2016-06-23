app.factory('question', [function() {
    var qn = function Question(id, text, type, dependencies, showIndex, validation, selectValues) {
    
    var self = this;
    
    //Properties from constructor
    this.id = id;
    this.text = text;
    this.type = type;
    this.dependencies = dependencies;
    this.showIndex = showIndex;
    this.selectValues = selectValues || null;
    this.validation = validation;
    
    //Properties with defaults
    this.isDependencyReady = this.dependencies.length === 0 ? true : false;
    this.isAnswerValid = false;
    this.visibility = showIndex === 0? true : false;
    
    this.getDependenciesOfQuestion = function(question){
        var dependenciesOfQuestion = [];
        angular.forEach(this.dependencies, function(dep) {
                if (dep.id === question.id) {
                    dependenciesOfQuestion.push(dep);
                }
        });
        return dependenciesOfQuestion;
    }
    this.updateIsDependencyReady = function(questionList, modifiedQuestion) {
        this.updateDependencyFulfillment(questionList,modifiedQuestion);
        //If all dependencies fulfilled change isDependencyReady
        if(this.hasAllDependenciesFulfilled()) { 
                        this.isDependencyReady = true; //Se cumplio la dependencia y todas las demás.
        } else {
                        this.isDependencyReady = false; //Se cumplio la dependencia pero aún no esta ready.
        }
    }
    this.updateDependencyFulfillment = function(questionList, modifiedQuestion) {

        //Retrieve dependency to the updated question
        var dependencyList = this.getDependenciesOfQuestion(modifiedQuestion);
        
        //If the updated question not within dependencies, returns false.
        if (dependencyList.length === 0) {
            return false;
        } else { //If the updated question within dependencies, update the dependency fulfilled propery.
            angular.forEach(dependencyList, function(dependency) {
                dependency.updateFulfilled(modifiedQuestion)
            });
        }

    };
    this.hasAllDependenciesFulfilled = function() {
        return this.dependencies.every(function(dep){
                        return dep.fulfilled === true;
        })
    };
    this.validateAnswer = function() {
        //
    };
    this.dependsOn = function(question) {
        return this.dependencies.some(function(dep) {
                return dep.id === question.id;
        });
    }
    this.updateVisibility = function(modifiedQuestion) {
        if (this.hasAllDependenciesFulfilled() && modifiedQuestion.hasBeenAnswered()) {
            this.visibility = true;
        }
    }
    this.hasBeenAnswered = function() {
        return !(angular.isUndefined(this.answer) || this.answer === "");
    }
    this.submitAnswer = function(answer) {
        this.answer = answer;
    }
}
    return qn;
}]);