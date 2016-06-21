question.update(questionList, updatedQuestion) = function() {

    //Retrieve dependency to the updated question
    var dependencyList = this.dependencies.filter( function(dependency) {
        return dependency.id === updatedQuestion.id;
    });
    
    //If the updated question not within dependencies, returns false.
    if (dependencyList.length === 0) {
        return false
    } else { //If the updated question within dependencies, returns false.
        angular.forEach(dependencyList, function(dependency) {
            var isFulfilled = dependency.checkFulfilled(updatedQuestion, dependency)
            if (isFulfilled) {
                if(this.allDependenciesFulfilled()) {
                    return true; //Se cumplio la dependencia y todas las demás
                } else {
                    return false; //Se cumplio la dependencia y pero aún no esta ready.
                }
            } else {
                return false; //No se cumplió la dependencia.
            }
        })
    }
    
};

dependency.checkFulfilled(question, dependency) {
    
    //Evaluar dependencias
    if (angular.isDefined(dependency.validation.mustBeEqualTo)) {
        if (question.answer !== dependency.validation.mustBeEqualTo) {
            return false;
        }
    }
    this.fulfilled = true;
    return true;
}

question.allDependenciesFulfilled = function() {
    return this.dependencies.every( function(dep){
                    dep.fulfilled === true;
    }))
}
