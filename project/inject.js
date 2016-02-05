/**
 * This module creates an instance of the CamapignCollection, and
 * passes in the database interface.
 */
UserCollection.setDatabaseConnection({
    insert: function(data, callback){
    },
    update: function(id, data, callback){
    },
    findById: function(id){
        console.log(id);
        return Meteor.users.findOne({_id: id});
    }
});
