PLAYER_CHARACTER_METHOD_NAMES = {};
PLAYER_CHARACTER_METHOD_NAMES.CREATE = "playerCharacters/create";

PLAYER_CHARACTER_METHODS= {};
PLAYER_CHARACTER_METHODS[PLAYER_CHARACTER_METHOD_NAMES.CREATE] = function(data, callback){
    data.isPlayerCharacter = true;
    var _id = _db.characters.insert(data);
    if (callback) callback(_id);
};

Meteor.methods(PLAYER_CHARACTER_METHODS);