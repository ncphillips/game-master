/**
 * This module publishes the Campaigns Mongo Collection
 * and places any relevant restrictions on the current
 * users view of said collection.
 */
Meteor.publish("campaigns", function() {
    if (this.userId) {
        var playerIn = _db.campaignMemberships.find({userId: this.userId}).fetch();

        var campaignIds = playerIn.map(function(membership){
            return membership.groupId;
        });

        return _db.campaigns.find({$or: [{_id: {$in: campaignIds}}, {creator: this.userId}, {dungeonMaster: this.userId}]})

    } else {
        this.ready();
    }
});

Meteor.publish("campaignMemberships", function() {
    return _db.campaignMemberships.find();
});