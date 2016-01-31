if (typeof _db === "undefined") {
    _db = {};
}

_db.playerCharacters = new Mongo.Collection("playerCharacters");
