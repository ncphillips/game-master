Router.route("/campaigns/:campaignId/playerCharacters", {
    name: 'playerCharactersList',
    data: function(){
        return {
            campaign: campaigns.findById(this.params.campaignId),
            playerCharacters: playerCharacters.findByCampaign(this.params.campaignId)
        };
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/add", {
    name: 'playerCharactersAdd',
    data: function(){
        return {
            campaign: campaigns.findById(this.params.campaignId)
        }
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/:playerCharacterId", {
    name: 'playerCharactersView',
    data: function(){
        return {
            campaign: campaigns.findById(this.params.campaignId),
            playerCharacters: playerCharacters.findById(this.params.playerCharacterId)
        };
    }
});
