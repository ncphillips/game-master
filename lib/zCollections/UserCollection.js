if(typeof module !== 'undefined') {
    User = require("../models/User");
    BaseCollection = require("./BaseCollection");
}
// No `var` makes it global in Meteor
UserCollection = (function(){
    "use strict";


    function UserCollection() {
        BaseCollection.call(this);
        this.entityConstructor = User;
        this.entityPrototype = User.prototype;
    }

    UserCollection.prototype = Object.create(BaseCollection.prototype);
    UserCollection.prototype.constructor = UserCollection;

    return new UserCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = UserCollection;
}