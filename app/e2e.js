var appDev = angular.module('dynamic-questionnaire-e2e', ['dynamic-questionnaire', 'ngMockE2E']);

appDev.run(function($httpBackend) {
 
    var questionList =
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
    }];
    
    var section1 = {sectionId:1, title:"Personal information", questionList: questionList};
    
  // returns the current list of phones
  $httpBackend.whenGET('/api/section/1').respond(section1);
  $httpBackend.whenGET(new RegExp('app\/.*')).passThrough();
  $httpBackend.whenGET(new RegExp('assets\/.*')).passThrough();
  $httpBackend.whenGET(new RegExp('node_modules\/.*')).passThrough();
    
});