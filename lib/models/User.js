User = (function(){
    function User(data) {
        this.__data__ = validateData(data);
    }

    User.prototype.id = function(){
        return this.__data__._id;
    };

    User.prototype.primaryEmail = function(){
        return this.__data__.emails[0].address;
    };

    function validateData(data) {
        var validData = {};

        if (data._id) {
            validData._id = data._id;
        }
        validData.emails = data.emails;

        return validData;
    }

    return User;
})();

if (typeof module !== "undefined") {
    module.exports = User;
}
