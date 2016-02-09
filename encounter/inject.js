/**
 * This module creates an instance of the CamapignCollection, and
 * passes in the database interface.
 */
EncounterCollection.setDatabaseConnection({
    insert: function(data, callback){
        Meteor.apply(ENCOUNTER_METHOD_NAMES.CREATE, [data, callback]);
    },
    update: function(id, data, callback){
        Meteor.call(ENCOUNTER_METHOD_NAMES.UPDATE, id, data, callback);
    },
    findById: function(id){
        return _db.encounters.findOne(id);
    },
    findByCampaign: function(campaignId){
        return _db.encounters.find({campaign: campaignId}).fetch();
    },
    remove: function(id, callback){
        Meteor.apply(ENCOUNTER_METHOD_NAMES.REMOVE, [id, callback]);
    }

});
