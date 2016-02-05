Template.encountersList.helpers({
    crumbs: function(){
        var campaignId = this.campaign.getId();
        var campaignName = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}}
        ]};
    },
    addUrlData: function(){
        console.log(this);
        return {
            campaignId: this.campaign.getId()
        }
    }
});

Template.encountersList.events({
    "click .encounter-row": function(){
        Router.go("encountersView", {campaignId: this.campaign().getId(), encounterId: this.id()});
    }
});