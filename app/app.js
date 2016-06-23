var app = angular.module('dynamic-questionnaire', ['ui.bootstrap','ui.router','ngResource']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './app/template/home.html',
            controller: 'homeCtrl'
        })
});

app.factory('Section', ['$resource', function($resource) {
    return $resource('/api/section/:id');
}]);

app.controller('homeCtrl',['$scope','$http','section','question','dependency','validation',function($scope,$http,section,question,dependency,validation){

    var v1 = new validation({mustBeEqualTo: true });
    var v2 = new validation({mustBeEqualTo: false});

    var d1 = new dependency(1, v1);
    var d2 = new dependency(1, v2);

    var q1 = new question(1, "Have you ever done prison time for a federal fellony?", "bool", [], 0);
    var q2 = new question(2, "How long where you in prison? (answer in days)"       , "text", [d1], 1);
    var q3 = new question(3, "Were you ever ordered to do community work?"          , "bool", [d2], 1);
    var q4 = new question(4, "When did you join the company?"                       , "date", [], 2);
    var q5 = new question(5, "Do you live in an empowered zone?"                    , "bool", [], 3);

    var questionList = [q1,q2,q3,q4,q5];
    var section = new section(1, "Personal Info", questionList);
    
    $scope.section = section;
    console.log($scope.section);
    

}])
