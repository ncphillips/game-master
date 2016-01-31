Template.playerCharactersView.helpers({
    crumbs: function(){
        if (!this.campaign) {
            return {breadcrumbs: []};
        }

        var campaignId = this.campaign._id;
        var text = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: text,  name: "campaignsView", data: {campaignId: campaignId}},
            {text: "Players", name: "playerCharactersList", data: {campaignId: campaignId}}
        ]};
    }
});
