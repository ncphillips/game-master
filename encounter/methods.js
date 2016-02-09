/**
 * This module defines the Meteor methods for Campaigns.
 */
ENCOUNTER_METHOD_NAMES = { };
ENCOUNTER_METHOD_NAMES.CREATE = "encounters/create";
ENCOUNTER_METHOD_NAMES.UPDATE = "encounters/update";
ENCOUNTER_METHOD_NAMES.REMOVE = "encounters/remove";

ENCOUNTER_METHODS = { };

ENCOUNTER_METHODS[ENCOUNTER_METHOD_NAMES.CREATE] = function(data, callback){
    delete data._id;
    var _id = _db.encounters.insert(data);
    if (callback) callback(_id);
};

ENCOUNTER_METHODS[ENCOUNTER_METHOD_NAMES.UPDATE] = function(id, data, callback){
    var _id = _db.encounters.update(id, data);

    if (callback) callback(_id);
};

ENCOUNTER_METHODS[ENCOUNTER_METHOD_NAMES.REMOVE] = function(id, callback){
    var _id = _db.encounters.remove({_id: id});

    if (callback) callback(_id);
};

Meteor.methods(ENCOUNTER_METHODS);

