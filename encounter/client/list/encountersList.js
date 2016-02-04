Template.encountersList.helpers({
    crumbs: function(){
        var campaignId = this.campaign._id;
        var campaignName = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}}
        ]};
    },
    addUrlData: function(){
        console.log(this.data);
        return {
            campaignId: this.campaign._id
        }
    }
});

Template.encountersList.events({
    "click .encounter-row": function(){
        Router.go("encountersView", {campaignId: this.campaign, encounterId: this._id});
    }
});