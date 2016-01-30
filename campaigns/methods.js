/**
 * This module defines the Meteor methods for Campaigns.
 */
CAMPAIGN_METHOD_NAMES = { };
CAMPAIGN_METHOD_NAMES.CREATE = "campaigns/create";
CAMPAIGN_METHOD_NAMES.UPDATE = "campaigns/update";

CAMPAIGN_METHODS = { };

CAMPAIGN_METHODS[CAMPAIGN_METHOD_NAMES.CREATE] = function(data, callback){
    delete data._id;
    data.owner = Meteor.userId;

    var _id = _db.campaigns.insert(data);
    if (callback) callback(_id);
};

CAMPAIGN_METHODS[CAMPAIGN_METHOD_NAMES.UPDATE] = function(id, data, callback){
    var _id = _db.campaigns.update(id, data);
    console.log("Updated", _id);

    if (callback) callback(_id);
};

Meteor.methods(CAMPAIGN_METHODS);




