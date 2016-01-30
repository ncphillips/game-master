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

        var campaign = {
            name: $("#name").val(),
            status: "Running", // Hiatus, Done
            description: $("#description").val(),
            creator: Meteor.userId(),
            dungeonMaster: Meteor.userId(),
            players: []
        };

        var id = Campaigns.insert(campaign);
        Router.go("campaignsList");
    }
});
