if (typeof module !== 'undefined') {
    BaseCharacter = require('./BaseCharacter');
    $ = require("lodash");
}
// No `var` makes it global in Meteor
PlayerCharacter = (function() {
    "use strict";
    var CHARACTER_SIZES = {
        TINY: "T",
        SMALL: "S",
        MEDIUM: "M",
        LARGE: "L",
        GARGANTUAN: "G"
    };

    var CHARACTER_ALIGNMENTS = {
        NN: "NN", NG: "NG", NE: "NE",
        CN: "CN", CG: "CG", CE: "CE",
        LN: "LN", LG: "LG", LE: "LE"
    };

    var CHARACTER_LANGUAGES = {
        COMMON: "Common"
    };

    var CHARACTER_TYPE = {
        HUMANOID: "Humanoid"
    };

    function PlayerCharacter(data) {
        BaseCharacter.call(this, data);
        this.__data__ = $.extend(this.__data__, validatePlayerCharacterData(data || {}));
    }
    PlayerCharacter.prototype = Object.create(BaseCharacter.prototype);
    PlayerCharacter.prototype.constructor = PlayerCharacter;

    // Private Functions
    function validatePlayerCharacterData(data) {
        var validData = {};

        // Players
        validData.playerCharacter = data.playerCharacter;
        validData.type = data.type;
        validData.classLevel = data.classLevel;
        validData.race = data.race;

        // NPC or Monster Only
        validData.source = data.source;
        validData.page = data.page;
        validData.hd = data.hd;
        validData.cr = data.cr;
        validData.destroyAfterEncounter = data.destroyAfterEncounter;

        return validData;
    }

    return PlayerCharacter;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = PlayerCharacter;
}
