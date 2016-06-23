app
//QUESTION DIRECTIVE
.directive('question', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      section: '='
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
      question: '=',
      section: '='
    },
    templateUrl: 'app/template/questionBool.html'
  };
})

.directive('questionDate', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      section: '='
    },
    templateUrl: 'app/template/questionDate.html'
  };
})

.directive('questionText', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      section: '='
    },
    templateUrl: 'app/template/questionText.html'
  };
})


.directive('questionSelect', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      section: '='
    },
    templateUrl: 'app/template/questionSelect.html'
  };
})
.directive('questionNotification', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      section: '='
    },
    templateUrl: 'app/template/questionNotification.html'
  };
})
.directive('questionSelectRadio', function() {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      section: '='
    },
    templateUrl: 'app/template/questionSelectRadio.html'
  };
})