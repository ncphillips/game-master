Template.playerCharactersList.helpers({
    addPcUrl: function(){
        return Router.current().params;
    },
    crumbs: function(){
        if (this.campaign){
            var campaignId = this.campaign.id();
            var text = this.campaign.name();
            return {
                breadcrumbs: [{
                    text: "Campaigns",
                    name: "campaignsList",
                    data: {}
                }, {
                    text: text,
                    name: "campaignsView",
                    data: {campaignId: campaignId}
                }]
            };
        }
    }
});

Template.playerCharactersList.events({
    "click .player-character-delete": function(e){
        PlayerCharacterCollection.remove(this);
        e.stopPropagation();
    },
    "click tr": function(){
        var params = Router.current().params;
        params.playerCharacterId = this.id();
        Router.go("playerCharactersView", params);
    }
});
