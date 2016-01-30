// No `var` makes it global in Meteor
Campaign = (function() {
    "use strict";

    // Constructor
    function Campaign(name) {
        if (!name)
            throw new Error("A campaign must have a name");

        this.name = name;

        this.__data__ = {
            isRunning: true,
            playerCharacters: []
        };
    }

    Campaign.prototype.getId = function(){
        return this.__data__._id;
    };

    Campaign.prototype.isRunning = function () {
        return this.__data__.isRunning;
    };

    Campaign.prototype.endCampaign = function () {
        this.__data__.isRunning = false;
    };

    Campaign.prototype.getPlayerCharacters = function () {
        return this.__data__.playerCharacters;
    };

    Campaign.prototype.addPlayerCharacter = function (playerCharacter) {
        if (this.hasPlayerCharacter(playerCharacter)) {
            throw new Error("This Player Character is already in the campaign.");
        }

        this.__data__.playerCharacters.push(playerCharacter);
    };

    Campaign.prototype.hasPlayerCharacter = function (playerCharacter) {
        return this.__data__.playerCharacters.indexOf(playerCharacter) >= 0;
    };


    // Static Methods
    function createCampaign(name) {
        if (!name)
            throw new Error("A campaign must have a name");

        return new Campaign(name);
    }

    // Static API
    return Campaign;
})();

// For accessing with node
if (module) {
    module.exports = Campaign;
}
