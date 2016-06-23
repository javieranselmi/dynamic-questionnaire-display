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

app.controller('homeCtrl',['$scope','section','question','dependency','validation',function($scope,section,question,dependency,validation){

    var gotoS1 = function() {    
        var q1 = new question(1, "Please select your language"               , "selectRadio", [], 0, null, ["Spanish", "English"]);
        var q2 = new question(2, "Please select the correct answer"          , "selectRadio", [], 0, null, ["I started employment with this company in 2015", "I am applying for or starting with this company in 2016"]);
        var q3 = new question(3, "Approximate start date"                    , "date", [], 0); 
        var questionList = [q1,q2,q3];
        var section1 = new section(1, "Personal Info", "Please respond these questions", questionList);
        $scope.section = section1;
    }
    var gotoS2 = function() {

        var q1 = new question(4, "Your current or potential employer has engaged Deloitte Tax LLP (“Deloitte Tax”) to provide tax assistance relating to the Work Opportunity Tax Credit (“WOTC”).The Work Opportunity Tax Credit is a Federal tax credit available to employers for hiring individuals from certain target groups who face barriers to employment. The WOTC reduces an employer’s cost of doing business and requires little paperwork.", "notification", [], 0);
        var q2 = new question(5, "In connection with these services, it is requested that you access this portal to provide your current or potential employer and Deloitte Tax certain Personally Identifiable Information, including your Social Security Number (“SSN”) and other nonpublic information that may identify you (“PII”). This PII is necessary for purposes of assessing whether your current or potential employer may qualify for the WOTC and will be disclosed by Deloitte Tax to the applicable State Employment Security Agency, State Workforce Agency, or other applicable agency (“State Agency”), responsible for certifying employees for the WOTC program. You should understand that it is possible that your PII may also be disclosed to subsidiaries and affiliates of Deloitte Tax located within or outside of the United States that may be providing assistance to Deloitte Tax in connection with our services. Deloitte Tax, its subsidiaries and affiliates will use your information only for the purposes of providing services in connection with your current or potential employer’s efforts to apply for and determine tax credits.", "notification", [], 0);
        var q3 = new question(6, "The Internal Revenue Code permits current or potential employer to request the completion of this form. The information will be used by the employer to complete the employer’s federal tax return. Completion of this form is voluntary and may assist members of targeted groups in securing employment. Routine uses of this form include giving it to the State Agency which may contact appropriate sources to confirm that the applicant is a member of a targeted group.", "notification", [], 0);
        var q4 = new question(7, "Deloitte Tax has implemented certain security controls designed to safeguard your PII that will be used in the performance of our services. These security controls include physical, administrative and technical measures designed to protect the security and confidentiality of your PII. ", "notification", [], 0);
        var q5 = new question(8, "Please click the “Agree” button below if you consent to the disclosure and use of your PII as noted above. If you do not wish to make this consent, please click the “Do Not Agree” button to exit this program.", "notification", [], 0);
        var q6 = new question(9, "Thank you for taking the time to complete the short WOTC questionnaire.", "notification", [], 0);
        
        var questionList = [q1,q2,q3,q4,q5,q6];
        var section2 = new section(1, "Welcome to Work Opportunity Tax Credit Program (\"WOTC\")","Acknowledgment", questionList);
        $scope.section = section2;
    }
    var gotoS3 = function() {

        var q1 = new question(10, "Dear Applicant – This WOTC Questionnaire will take approximately 3-5 minutes to complete. At the end of the WOTC Questionnaire, you will be issued a WOTC Control Number. Please write this number down in a safe place as you will need to provide this WOTC Control Number to your employer during the orientation process.", "notification", [], 0);
        var q2 = new question(11, "First Name", "text", [], 0);
        var q3 = new question(12, "Last Name", "text", [], 0);
        var q4 = new question(13, "Enter your SSN", "text", [], 0);
        var q5 = new question(14, "Re-enter your SSN", "text", [], 0);
       
        var questionList = [q1,q2,q3,q4,q5];
        var section3 = new section(1, "Login", null,questionList);
        $scope.section = section3;
    }
    
    

    gotoS1();
    //gotoS2();
    //gotoS3();
    //gotoS4();
    //gotoS1();
    //$scope.section = section;
    console.log($scope.section);
    console.log($scope.section);
    //$scope.section.submitAnswerAndUpdate(1,true);
    /*
    $scope.$apply(function(){
        $scope.section.submitAnswer(1,true);
    })*/
    
    /*        var v1 = new validation({mustBeEqualTo: true  });
        var v2 = new validation({mustBeEqualTo: false });

        var d1 = new dependency(1, v1);
        var d2 = new dependency(1, v2);*/
    

}])
