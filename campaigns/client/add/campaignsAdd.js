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
            description: $("#description").val()
        });

        campaigns.save(campaign, function(_id){
            Router.go("campaignsView", {campaignId: _id});
        });
    }
});
