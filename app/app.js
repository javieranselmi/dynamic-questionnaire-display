var app = angular.module('dynamic-questionnaire', ['ui.bootstrap','ngResource']);

app.factory('Section', ['$resource', function($resource) {
    return $resource('/api/section/:id');
}]);

app.controller('mainCtrl',['$scope','$http','$resource','Section',function($scope,$http,$resource,Section){
    

    
    $scope.section = Section.get( {id:1}, function(){
        $scope.questionList = $scope.section.questionList
    });


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
    
    //$scope.analizeQuestions();
    $scope.$watch('questionList', function() {
        if ($scope.questionList) {
             //console.log(questionList);
             $scope.analizeQuestions();
            }
    },true); 
    
    
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