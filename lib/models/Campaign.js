// No `var` makes it global in Meteor
Campaign = (function() {
    "use strict";

    // Constructor
    function Campaign(data) {
        this.name = data.name;

        this.__data__ = validateData(data);
    }

    // Accessors
    Campaign.prototype.id = function(){
        return this.__data__._id;
    };

    Campaign.prototype.creator = function(){
        return UserCollection.findById(this.__data__.creator);
    };

    Campaign.prototype.description = function(description){
        if (typeof description !== "undefined") {
            this.__data__.description = description;
        }
        return this.__data__.description;
    };
    Campaign.prototype.dungeonMaster = function(){ return this.__data__.dungeonMaster; };

    // Status Effecting Methods
    Campaign.prototype.isRunning = function () {
        return this.__data__.status === "running";
    };

    Campaign.prototype.endCampaign = function () {
        this.__data__.status = "stopped";
    };

    // Player Characters
    Campaign.prototype.playerCharacters = function () {
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

    // Private Methods
    function validateData(data) {
        data = data || {};
        var validData = {};

        validData.name = data.name;
        validData._id = data._id;
        validData.status = data.status || "running";
        validData.creator = data.creator;
        validData.dungeonMaster = data.dungeonMaster;
        validData.description = data.description;
        validData.playerCharacters = data.players || [];

        return validData;
    }

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
if(typeof module !== 'undefined') {
    module.exports = Campaign;
}
