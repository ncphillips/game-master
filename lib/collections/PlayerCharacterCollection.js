// No `var` makes it global in Meteor
PlayerCharacterCollection = (function(){
    "use strict";

    function PlayerCharacterCollection(database) {
        this._db = database;
    }

    PlayerCharacterCollection.prototype.save = function (playerCharacter, callback) {
        if (!PlayerCharacter.prototype.isPrototypeOf(playerCharacter)) {
            throw new Error("This object is not a Campaign");
        }

        if (playerCharacter.__data__._id) {
            this._db.update(playerCharacter.__data__._id, playerCharacter.__data__, callback);
        } else {
            this._db.insert(playerCharacter.__data__, callback);
        }
    };

    PlayerCharacterCollection.prototype.findById = function (id) {
        var data = this._db.findById(id) || {};

        if (!data) {
            throw new Error("No such Player Character exists");
        }

        return new PlayerCharacter(data);
    };

    PlayerCharacterCollection.prototype.findByCampaign = function(){
        return this._db.findByCampaign().map(function(data){ return new PlayerCharacter(data)});
    };

    return PlayerCharacterCollection;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = PlayerCharacterCollection;
}