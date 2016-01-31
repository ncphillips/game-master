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
        params.pcId = this._id;
        Router.go("playerCharactersView", params);
    }
});
