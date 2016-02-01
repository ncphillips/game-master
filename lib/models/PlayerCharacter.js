if (typeof module !== 'undefined') {
    BaseCharacter = require('./BaseCharacter');
    $ = require("lodash");
}
// No `var` makes it global in Meteor
PlayerCharacter = (function() {
    "use strict";

    function PlayerCharacter(data) {
        BaseCharacter.call(this, data);
        this.__data__ = $.extend(this.__data__, validatePlayerCharacterData(data || {}));
    }

    PlayerCharacter.prototype = Object.create(BaseCharacter.prototype);
    PlayerCharacter.prototype.constructor = PlayerCharacter;

    // Private Functions
    function validatePlayerCharacterData(data) {
        var validData = {};

        validData.playerCharacter = data.playerCharacter;
        validData.type = data.type;
        validData.classLevel = data.classLevel;
        validData.race = data.race;

        return validData;
    }

    return PlayerCharacter;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = PlayerCharacter;
}
