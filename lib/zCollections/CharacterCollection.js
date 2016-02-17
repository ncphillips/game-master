if(typeof module !== 'undefined') {
    PlayerCharacterCollection = require("./PlayerCharacterCollection");
    NonPlayerCharacterCollection = require("./NonPlayerCharacterCollection");
}

// No `var` makes it global in Meteor
CharacterCollection = (function(){
    "use strict";

    function CharacterCollection() { }

    CharacterCollection.prototype.save = function(character, callback){
        if (character.isPlayerCharacter()) {
            PlayerCharacterCollection.save(character, callback);
        } else {
            NonPlayerCharacterCollection.save(character, callback);
        }
    };

    CharacterCollection.prototype.findById = function(id){
        var data = _db.characters.findOne(id);

        if (!data)
            return;

        if (data.playerCharacter || data.isPlayerCharacter)
            return new PlayerCharacter(data);

        else
            return new NonPlayerCharacter(data);
    };

    return new CharacterCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = CharacterCollection;
}