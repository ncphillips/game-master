Router.route("/campaigns/:campaignId/playerCharacters", {
    name: 'playerCharactersList',
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId),
            playerCharacters: PlayerCharacterCollection.findByCampaign(this.params.campaignId)
        };
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/add", {
    name: 'playerCharactersAdd',
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId)
        }
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/:playerCharacterId", {
    name: 'playerCharactersView',
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId),
            playerCharacter: PlayerCharacterCollection.findById(this.params.playerCharacterId)
        };
    }
});
