/**
 * This module publishes the Campaigns Mongo Collection
 * and places any relevant restrictions on the current
 * users view of said collection.
 */
Meteor.publish("campaigns", function() {
    return _db.campaigns.find();
});

Meteor.publish("campaignMemberships", function() {
    return _db.campaignMemberships.find();
});