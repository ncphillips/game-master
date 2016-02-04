Template.encountersAdd.helpers({
    crumbs: function(){
        var campaignId = this.campaign._id;
        var campaignName = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}},
            {text: "Encounters", name: "encountersList", data: {campaignId: campaignId}}
        ]};
    }
});
Template.encountersAdd.events({
    "submit .new-encounter": function (event) {
        event.preventDefault();
        var encounter = {
            campaign: this.campaign._id,
            name: $("#name").val(),
            description: $("#description").val()
        };

        var id = Encounters.insert(encounter);

        Router.go("encountersView", {campaignId: this.campaign._id, encounterId: id});
    }
});


