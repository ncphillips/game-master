playerCharacters = new PlayerCharacterCollection({
    findByCampaign: function(campaignId){
        return _db.playerCharacters.find({campaign: campaignId, playerCharacter: true}).fetch();
    },
    findById: function(playerId){
        return _db.playerCharacters.findOne(playerId);
    }
});
