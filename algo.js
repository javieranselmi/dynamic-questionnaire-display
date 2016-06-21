  $scope.questionList =
    [{ id: 1,
      text: "Have you ever done prison time for a federal fellony?",
      dependencies: [],
      type: "bool" //Domain: "date","bool","select","text"
    },
    { id: 2,
      text: "How long where you in prison? (answer in days)",
      dependencies: [{id:1, requiredAnswer: true}],
      type: "text" //Domain: "date","check","select","text"
    },
    { id: 3,
      text: "Were you ever ordered to do community work?",
      dependencies: [{id:1, requiredAnswer: false}],
      type: "bool" //Domain: "date","check","select","text"
    },
    { id: 4,
      text: "When did you join the company?",
      dependencies: [],
      type: "date" //Domain: "date","check","select","text"
    },
    { id: 5,
      text: "Do you live in an empowered zone?",
      dependencies: [],
      type: "bool" //Domain: "date","check","select","text"
    }]
    
/*    Funcion updateQuestionDependencies(question) -->
    
    Para cada pregunta que tiene una dependencia a mi question:
        Hacer OldValue = propiedad isReadyToShow
        Si (OldValue != isReadyToShow) entonces
            updateQuestionDependencies(a esa pregunta)
        Fin Si.
    Fin para cada.*/
    
function updateDependencies(currentQuestion) {
    var dependantQuestionList = getDependantQuestionsOf(currentQuestion);
    angular.forEach(dependantQuestionList, function(dependantQuestion) {
      dependantQuestion.isReadyToShow = true;
    });
};

function getDependantQuestionsOf(question) {
    
}

question.update = function() {
    stateChange = exit;
    angular.forEach(question.dependencies, function(dependency) {
        
    });
}
var isReadyToShow = question.dependencies.reduce(function(booleanValue, currentDependency) {
            var dependencyFullfilled = $scope.questionList.filter(function(question) {
                return question.id === currentDependency.id && question.answer === currentDependency.requiredAnswer;
            }).length;
            return booleanValue && Boolean(dependencyFullfilled);
        }, true);
     question.isReadyToShow = isReadyToShow;
    