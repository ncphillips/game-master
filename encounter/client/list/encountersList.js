Template.encountersList.helpers({
    crumbs: function(){
        if (!this.campaign) return;

        var campaignId = this.campaign.id();
        var campaignName = this.campaign.name();
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}}
        ]};
    },
    addUrlData: function(){
        return {
            campaignId: this.campaign.id()
        }
    }
});

Template.encountersList.events({
    "click .encounter-delete": function(e){
        EncounterCollection.remove(this);
        e.stopPropagation();
    },
    "click .encounter-row": function(){
        Router.go("encountersView", {campaignId: this.campaign().id(), encounterId: this.id()});
    }
});