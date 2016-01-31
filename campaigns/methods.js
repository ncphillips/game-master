/**
 * This module defines the Meteor methods for Campaigns.
 */
CAMPAIGN_METHOD_NAMES = { };
CAMPAIGN_METHOD_NAMES.CREATE = "campaigns/create";
CAMPAIGN_METHOD_NAMES.UPDATE = "campaigns/update";

CAMPAIGN_METHODS = { };

CAMPAIGN_METHODS[CAMPAIGN_METHOD_NAMES.CREATE] = function(data, callback){
    delete data._id;
    data.creator = Meteor.userId;
    data.dungeonMaster = Meteor.userId;

    var _id = _db.campaigns.insert(data);
    if (callback) callback(_id);
};

CAMPAIGN_METHODS[CAMPAIGN_METHOD_NAMES.UPDATE] = function(id, data, callback){
    var _id = _db.campaigns.update(id, data);

    if (callback) callback(_id);
};

Meteor.methods(CAMPAIGN_METHODS);

CAMPAIGN_MEMBERSHIP_METHOD_NAMES = { };
CAMPAIGN_MEMBERSHIP_METHOD_NAMES.CREATE = "campaignMemberships/create";
CAMPAIGN_MEMBERSHIP_METHOD_NAMES.REMOVE_PLAYER_FROM_CAMPAIGN = "campaignMemberships/removePlayerfromCampaign";

CAMPAIGN_MEMBERSHIP_METHODS = { };

CAMPAIGN_MEMBERSHIP_METHODS[CAMPAIGN_MEMBERSHIP_METHOD_NAMES.CREATE] = function(data, callback){
    callback = callback || function(message) {console.log(message)};
    data.creator = Meteor.userId();
    data.dungeonMaster = Meteor.userId();

    var existingMembership = _db.campaignMemberships.find({
        groupType: "campaign",
        groupId: data.groupId,
        userId: data.userId
    }).count();

    if (existingMembership > 0) {
        return callback(new Error("The User is already a Player in this Campaign."));
    }

    callback(_db.campaignMemberships.insert(data, callback));
};

CAMPAIGN_MEMBERSHIP_METHODS[CAMPAIGN_MEMBERSHIP_METHOD_NAMES.REMOVE_PLAYER_FROM_CAMPAIGN] = function(userId, campaignId, callback){
    _db.campaignMemberships.remove({userId: userId, groupId: campaignId, groupType: 'campaign', role: 'player'});
    if (callback) callback();
};


Meteor.methods(CAMPAIGN_MEMBERSHIP_METHODS);

