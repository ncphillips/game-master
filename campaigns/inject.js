/**
 * This module creates an instance of the CamapignCollection, and
 * passes in the database interface.
 */
campaigns = new CampaignCollection({
    insert: function(data, callback){
        Meteor.apply(CAMPAIGN_METHOD_NAMES.CREATE, [data, callback]);
    },
    update: function(id, data, callback){
        Meteor.call(CAMPAIGN_METHOD_NAMES.UPDATE, id, data, callback);
    },
    findById: function(id){
        return _db.campaigns.findOne(id);
    },
    findAll: function(){
        return _db.campaigns.find({}).fetch();
    }

});

campaignMemberships = new CampaignMembershipCollection({
    insert: function(data, callback){
        Meteor.apply(CAMPAIGN_MEMBERSHIP_METHOD_NAMES.CREATE, [data, callback]);
    },
    findPotentialPlayers: function(campaignId){
        var players = this.findPlayersInCampaign(campaignId);

        var playerIds = players.map(function(player){
            return player._id;
        });

        return Meteor.users.find({_id: {$nin: playerIds}}).fetch();
    },
    findPlayersInCampaign: function(campaignId){
        return _db.campaignMemberships.find().fetch().map(function(membership){
            return Meteor.users.findOne(membership.userId);
        });
    }
});