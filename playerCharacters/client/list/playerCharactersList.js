Template.playerCharactersList.helpers({
    addPcUrl: function(){
        return Router.current().params;
    },
    crumbs: function(){
        var campaignId = this.campaign._id;
        var text = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: text,  name: "campaignsView", data: {campaignId: campaignId}}
        ]};
    }
});

Template.playerCharactersList.events({
    "click tr": function(){
        var params = Router.current().params;
        console.log(this);
        params.playerCharacterId = this.getId();
        console.log(params);
        Router.go("playerCharactersView", params);
    }
});
