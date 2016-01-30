Template.campaignsList.events({
    "click .campaign-row": function(){
        Router.go("campaignsView", {campaignId: this._id});
    }
});
