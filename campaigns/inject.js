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
    }

});
