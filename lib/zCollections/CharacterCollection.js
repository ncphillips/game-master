// No `var` makes it global in Meteor
CharacterCollection = (function(){
    "use strict";

    function CharacterCollection() { }

    CharacterCollection.prototype.save = function(character, callback){
        console.log(character);
        if (character.isPlayerCharacter()) {
            PlayerCharacterCollection.save(character, callback);
        } else {
            NonPlayerCharacterCollection.save(character, callback);
        }
    };


    return new CharacterCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = CharacterCollection;
}