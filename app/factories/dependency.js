app.factory('dependency', [function() {
    var d = function Dependency(id, validation) {

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
    };
    return d;
}]);