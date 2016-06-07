var app = angular.module('app', ['ui.bootstrap']);
app.controller('mainCtrl',['$scope',function($scope){
    
  $scope.greet = "Prueba WOT-C";
  
  $scope.today = function() {
    $scope.dt = new Date();
  };
    
  $scope.today();

  $scope.select = {
      options: ["pato","perro","elefante","gaviota"]
  };
    
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

    //Refreshes the isReadyToShow status of all questions.
    $scope.analizeQuestions = function() {
        $scope.questionList.forEach(analizeQuestion);
    };
    
    //Analizes a question dependencies and refreshes its isReadyToShow status.
    var analizeQuestion = function(question) {
         var isReadyToShow = question.dependencies.reduce(function(booleanValue, currentDependency) {
                var dependencyFullfilled = $scope.questionList.filter(function(question) {
                    return question.id === currentDependency.id && question.answer === currentDependency.requiredAnswer;
                }).length;
                return booleanValue && Boolean(dependencyFullfilled);
            }, true);
         question.isReadyToShow = isReadyToShow;
    };
    
    $scope.analizeQuestions();
    $scope.$watch('questionList', function() {
        $scope.analizeQuestions()
    },true);

    
    console.log($scope);
    
    
    
}])



//QUESTION DIRECTIVE
.directive('question', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
    templateUrl: 'app/template/question.html',
    link: function(scope,elem,attr) {
        //scope.canShow = true;
    }
  };
})



// QUESTION TYPE DIRECTIVES - NOT FOR DIRECT USE
.directive('questionBool', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
    templateUrl: 'app/template/questionBool.html'
  };
})

.directive('questionDate', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
    templateUrl: 'app/template/questionDate.html'
  };
})

.directive('questionText', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
    },
    templateUrl: 'app/template/questionText.html'
  };
})


.directive('questionSelect', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
    templateUrl: 'app/template/questionSelect.html'
  };
})