app.factory('validation', [function() {
    var v = function Validation(obj) {
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
    
    this.validateMustBeEqualTo = function(question) {
        if (angular.isDefined(this.mustBeEqualTo)) {
                if (question.answer === this.mustBeEqualTo) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMustBeGreaterThan = function(question) {
        if (angular.isDefined(this.mustBeGreaterThan)) {
                if (question.answer > this.mustBeGreaterThan) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMustBeLessThan = function(question) {
        if (angular.isDefined(this.mustBeLessThan)) {
                if (question.answer < this.MustBeLessThan) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMustBeLessOrEqualTo = function(question) {
        if (angular.isDefined(this.mustBeLessOrEqualTo)) {
                if (question.answer <= this.mustBeLessOrEqualTo) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMustBeGreaterOrEqualTo = function(question) {
        if (angular.isDefined(this.mustBeGreaterOrEqualTo)) {
                if (question.answer >= this.mustBeGreaterOrEqualTo) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMaxLength = function(question) {
        if (angular.isDefined(this.maxLength)) {
                if (question.answer.length <= this.maxLength) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMinLength = function(question) {
        if (angular.isDefined(this.minLength)) {
                if (question.answer.length >= this.minLength) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateRequired = function(question) {
        if (angular.isDefined(this.required) || this.required === false) {
                if (angular.isDefined(question.answer) && question.answer !== "") {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validateMustBeInSelectValues = function(question) {
        if (angular.isDefined(this.mustBeInSelectValues) || this.mustBeInSelectValues === false) {
                if (angular.isDefined(question.selectValues)) {
                    if ($.inArray(question.answer, question.selectValues) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
        } else {
            return true; //Retorna true si no está definido la propiedad
        }
    };
    this.validateMustBeInValues = function(question) {
        if (angular.isDefined(this.mustBeInValues)) {
                if ($.inArray(question.answer, question.mustBeInValues) > -1) {
                    return true;
                } else {
                    return false;
                }
        } else {
            return true;
        }
    };
    this.validate = function(question) {
        return (
            this.validateMustBeEqualTo(question) &&
            this.validateMustBeGreaterThan(question) &&
            this.validateMustBeLessThan(question) &&
            this.validateMustBeLessOrEqualTo(question) &&
            this.validateMustBeGreaterOrEqualTo(question) &&
            this.validateMaxLength(question) &&
            this.validateMinLength(question) &&
            this.validateRequired(question) &&
            this.validateMustBeInSelectValues(question) &&
            this.validateMustBeInValues(question)
            )
    };
};
    return v;
}]);