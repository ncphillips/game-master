if (typeof _db === 'undefined'){
    _db = {};
}
_db.encounters = new Mongo.Collection("encounters");
