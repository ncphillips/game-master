Template.campaignsView.helpers({
    numEncounters: function(){
        return EncounterCollection.findByCampaign(this.campaign).length;
    },
    numPlayerCharacters: function(){
        return PlayerCharacterCollection.findByCampaign(this.campaign).length;
    },
    userIsCreatorOrDm: function(){
        return true;
        //if (!this.campaign) return false;
        //return Meteor.userId() === this.campaign.getDungeonMaster() || Meteor.userId() === this.campaign.getCreator();
    },
    potentialPlayers: function(){
        return CampaignMembershipCollection.findPotentialPlayers(this.campaign);
    },
    players: function(){
        return CampaignMembershipCollection.findPlayersInCampaign(this.campaign);
    },
    crumbs: function(){
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}}
        ]};
    }
});

Template.campaignsView.events({
    "click .add-player": function(){
        var userId = $("#new-player").find(":selected").val();
        if (userId) {
            CampaignMembershipCollection.registerUserAsPlayer(userId, this.campaign);
        }
    },
    "click .remove-player": function(){
        var campaignId = Router.current().params.campaignId;
        CampaignMembershipCollection.removePlayerFromCampaign(this, campaignId);
    }
});
