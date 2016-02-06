playerCharacters = PlayerCharacterCollection.setDatabaseConnection({
    findByCampaign: function(campaignId){
        return _db.characters.find({campaign: campaignId, isPlayerCharacter: true}).fetch();
    },
    findById: function(playerId){
        return _db.characters.findOne(playerId, {isPlayerCharacter: true});
    },
    insert: function(data, callback){
        Meteor.apply(PLAYER_CHARACTER_METHOD_NAMES.CREATE, [data, callback]);
    },
    findAllIn: function(ids){
        return _db.characters.find({_id: {$in: ids}}).fetch();
    },
    findByCampaignExcept: function(campaignId, ids){
        return _db.characters.find({_id: {$nin: ids}, campaign: campaignId}).fetch();
    }
});

nonPlayerCharacters = PlayerCharacterCollection.setDatabaseConnection({
    findByCampaign: function(campaignId){
        return _db.characters.find({campaign: campaignId, isPlayerCharacter: false}).fetch();
    },
    findById: function(nonPlayerId){
        return _db.characters.findOne(nonPlayerId, {isPlayerCharacter: false});
    },
    insert: function(data, callback){
        Meteor.apply(NON_PLAYER_CHARACTER_METHOD_NAMES.CREATE, [data, callback]);
    },
    findAllIn: function(ids){
        return _db.characters.find({_id: {$in: ids}}).fetch();
    },
    findByCampaignExcept: function(campaignId, ids){
        return _db.characters.find({_id: {$nin: ids}, campaign: campaignId}).fetch();
    }
});
