app
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