Template.campaignsAdd.helpers({
    crumbs: function(){
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}}
        ]};
    }
});

Template.campaignsAdd.events({
    "submit .new-campaign": function (event) {
        event.preventDefault();

        var campaign = new Campaign({
            name: $("#name").val(),
            description: $("#description").val(),
            creator: Meteor.userId(),
            dungeonMaster: Meteor.userId()
        });

        CampaignCollection.save(campaign, function(_id){
            Router.go("campaignsView", {campaignId: _id});
        });
    }
});
