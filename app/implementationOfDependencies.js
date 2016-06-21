//######################################## SECTION ####################################

//section.id //Id of the section
//section.questionList //Array of questions
//section.updateQuestions() //Updates questions isReadyToShow property

//######################################## SECTION ####################################

function Section(id, title, questionList) {
    var self = this;
    this.id = id;
    this.title = title;
    this.questionList = questionList;
    this.updateQuestions = function(){
        //Yet to implement
    }
}

//######################################## QUESTION ####################################

//question.id //Question id
//question.text //Question text
//question.type //Question type (boolRadio, boolCheckbox, text, number, date, select)
//question.dependencies //Array of dependencies
//question.answer //Answer to the question (true|false|"string"|number|date)
//question.isReadyToShow //Has the question met its dependencies and is ready to show to user?
//question.update(qList) //Analyze if dependencies have been met and update isReadyToShow value.
//question.visible //Must the question be showed now on the view?
//question.showIndex //Index to show  the question.
//question.selectValues //Value array for the select
//question.validation //Validation object that the question must fulfill.
//question.validate() //Analizes the question validation.

//######################################## QUESTION ####################################

function Question(id, text, type, dependencies, showIndex, validation, selectValues) {
    
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
    this.isDependencyReady = false;
    this.isShowIndexReady = false;
    this.isAnswerValid = false;
    
    //Methods
    this.update = function(questionList, updatedQuestion) {

        //Retrieve dependency to the updated question
        var dependencyList = this.dependencies.filter( function(dependency) {
            return dependency.id === updatedQuestion.id;
        });

        //If the updated question not within dependencies, returns false.
        if (dependencyList.length === 0) {
            return false;
        } else { //If the updated question within dependencies, update the dependency fulfilled propery.
            angular.forEach(dependencyList, function(dependency) {
                dependency.updateFulfilled(updatedQuestion)
            });
        }
        
        //If all dependencies fulfilled change isDependencyReady
        if(this.allDependenciesFulfilled()) { 
                        this.isDependencyReady = true; //Se cumplio la dependencia y todas las demás.
        } else {
                        this.isDependencyReady = false; //Se cumplio la dependencia pero aún no esta ready.
        }
    };
    
    this.allDependenciesFulfilled = function() {
        return this.dependencies.every(function(dep){
                        dep.fulfilled === true;
        })
    };
    
    this.validateAnswer = function () {
        //
    };
    
}
    
//######################################## DEPENDENCY ####################################

//dependency.questionId //Id of the question
//dependency.validation //Validation object that the question must fulfill.

//######################################## DEPENDENCY ####################################
    
function Dependency(id, validation) {
    
    var self = this;
    this.id = id;
    this.validation = validation;
    
    //Methods
    this.validate = function(question) {
        return this.validation.validate(question);
    };
    
    this.updateFulfilled = function(question) {
        if (this.validate(question)) {
            this.fulfilled = true;
        } else {
            this.fullfilled = false;
        };
    }
}
    
//######################################## VALIDATION ####################################
    
//######################################## VALIDATION ####################################

function Validation(obj) {
    this.regex = obj.regex;
    this.mustBeEqualTo = obj.mustBeEqualTo;
    this.mustBeGreaterThan = obj.mustBeGreaterThan;
    this.mustBeLessThan = obj.mustBeLessThan;
    this.mustBeLessOrEqualto = obj.mustBeLessOrEqualto;
    this.mustBeGreaterOrEqualTo = obj.mustBeGreaterOrEqualTo;
    this.maxLength = obj.maxLength;
    this.minLength = obj.minLength;
    this.required = obj.required;
    this.mustBeInSelectValues = obj.mustBeInSelectValues;
    this.mustBeInValues = obj.mustBeInValues;
    
    //Methods
    this.validate = function(question) {
        //One if for each validation.
        if (angular.isDefined(this.mustBeEqualTo)) {
                if (question.answer !== this.mustBeEqualTo) {
                    return false;
                }
            }
        //If no validation returned false, then this returns true.
        return true;
    };
}

//###############################INSTANCIATE#################################

console.log("Instantiating");

var v1 = new Validation({mustBeEqualTo: true });
var v2 = new Validation({mustBeEqualTo: false});

var d1 = new Dependency(1, v1);
var d2 = new Dependency(1, v2);

var q1 = new Question(1, "Have you ever done prison time for a federal fellony?", "bool", [], 1);
var q2 = new Question(2, "How long where you in prison? (answer in days)"       , "text", [d1], 2);
var q3 = new Question(3, "Were you ever ordered to do community work?"          , "bool", [d2], 2);
var q4 = new Question(4, "When did you join the company?"                       , "date", [], 3);
var q5 = new Question(5, "Do you live in an empowered zone?"                    , "bool", [], 4);

var questionList = [q1,q2,q3,q4,q5];
    
var section = new Section(1, "Personal Info", questionList);
console.log(section);
section.questionList[0].answer = true;
section.questionList[1].update(section.questionList, section.questionList[0]);
console.log(section);
