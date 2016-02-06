if (typeof _db === "undefined") {
    _db = {};
}

_db.characters = new Mongo.Collection("characters");
