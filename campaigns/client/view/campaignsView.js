Template.campaignsView.helpers({
    numEncounters: function(){
        return 0;
    },
    numPlayerCharacters: function(){
        return 0;
    },
    userIsCreatorOrDm: function(){
        return true;
        //if (!this.campaign) return false;
        //return Meteor.userId() === this.campaign.getDungeonMaster() || Meteor.userId() === this.campaign.getCreator();
    },
    potentialPlayers: function(){
        return campaignMemberships.findPotentialPlayers(this.campaign);
    },
    players: function(){
        return campaignMemberships.findPlayersInCampaign(this.campaign);
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
            campaignMemberships.registerUserAsPlayer(userId, this.campaign);
        }
    },
    "click .remove-player": function(){
        var campaignId = Router.current().params.campaignId;
        campaignMemberships.removePlayerFromCampaign(this, campaignId);
    }
});
