if (typeof module !== 'undefined') {
    BaseCharacter = require('./BaseCharacter');
    $ = require("lodash");
}
// No `var` makes it global in Meteor
NonPlayerCharacter = (function() {
    "use strict";

    function NonPlayerCharacter(data) {
        BaseCharacter.call(this, data);
        this.__data__ = $.extend(this.__data__, validateNonPlayerCharacterData(data || {}));
    }

    NonPlayerCharacter.prototype = Object.create(BaseCharacter.prototype);
    NonPlayerCharacter.prototype.constructor = NonPlayerCharacter;

    // Private Functions
    function validateNonPlayerCharacterData(data){
        var validData = {};
        validData.playerCharacter = false;
        validData.type = data.type;
        validData.classLevel = data.classLevel;
        validData.race = data.race;
        validData.destroyAfterEncounter = data.destroyAfterEncounter;
        if(typeof validData.destroyAfterEncounter !== "boolean"){
            validData.destroyAfterEncounter = true;
        }

        return validData;
    }

    return NonPlayerCharacter;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = NonPlayerCharacter;
}
