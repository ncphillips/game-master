Template.campaignsView.helpers({
    numEncounters: function(){
        return 0;
        //return Encounters.find({campaign: this.campaign._id, status: {$not: "Complete"}}).count();
    },
    numPlayerCharacters: function(){
        return 0;
        //return Characters.find({campaign: this.campaign._id, playerCharacter: true}).count();
    },
    urlData: function(){
        return {
            id: this.campaign.getId()
        };
    },
    userIsDm: function(){
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.getDungeonMaster();
    },
    userIsCreatorOrDm: function(){
        return true;
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.getDungeonMaster() || Meteor.userId() === this.campaign.getCreator();
    },
    potentialPlayers: function(){
        if (!this.campaign) {
            return [];
        }

        return campaignMemberships.findPotentialPlayers(this.campaign);
    },
    dmEmail: function(){
        //if (this.campaign){
        //    var dm = Meteor.users.findOne({_id: this.campaign.dungeonMaster});
        //    if(dm){
        //        return dm.emails[0].address;
        //    }
        //}
    },
    players: function(){
        if (!this.campaign)
            return [];

        return campaignMemberships.findPlayersInCampaign(this.campaign);
    },
    crumbs: function(){
        var campaignId = this.campaign._id;
        var campaignName = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
        ]};
    }
});

Template.campaignsView.events({
    "click .add-player": function(){
        var userId = $("#new-player").find(":selected").val();
        campaignMemberships.registerUserAsPlayer(userId, this.campaign);
    },
    "click .remove-player": function(){
        //var campaignId = Router.current().params.campaignId;
        //Campaigns.update(campaignId, {$pull: {players: this._id}});
    }
});
