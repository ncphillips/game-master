playerCharacters = PlayerCharacterCollection.setDatabaseConnection({
    findByCampaign: function(campaignId){
        return _db.playerCharacters.find({campaign: campaignId}).fetch();
    },
    findById: function(playerId){
        return _db.playerCharacters.findOne(playerId);
    },
    insert: function(data, callback){
        Meteor.apply(PLAYER_CHARACTER_METHOD_NAMES.CREATE, [data, callback]);
    }
});
