Template.encountersAdd.helpers({
    crumbs: function(){
        var campaignId = this.campaign.id();
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
        var encounter = new Encounter({
            campaign: this.campaign.id(),
            name: $("#name").val(),
            dungeonMaster: Meteor.userId(),
            description: $("#description").val()
        });

        var cid = this.campaign.id();

        EncounterCollection.save(encounter, function(id){
            Router.go("encountersView", {campaignId: cid, encounterId: id});
        });
    }
});


