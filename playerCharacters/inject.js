playerCharacters = PlayerCharacterCollection.setDatabaseConnection({
    findByCampaign: function(campaignId){
        return _db.characters.find({campaign: campaignId, isPlayerCharacter: true}).fetch();
    },
    findById: function(playerId){
        return _db.characters.findOne(playerId, {isPlayerCharacter: true});
    },
    insert: function(data, callback){
        Meteor.apply(PLAYER_CHARACTER_METHOD_NAMES.CREATE, [data, callback]);
    }
});
