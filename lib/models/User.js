User = (function(){
    function User(data) {
        this.__data__ = validateData(data);
    }

    User.prototype.getId = function(){
        return this.__data__._id;
    };

    function validateData(data) {
        var validData = {};

        if (data._id) {
            validData._id = data._id;
        }
        validData.email = data.email;

        return validData;
    }

    return User;
})();

if (typeof module !== "undefined") {
    module.exports = User;
}
