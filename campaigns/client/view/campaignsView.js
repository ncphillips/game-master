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
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.getDungeonMaster() || Meteor.userId() === this.campaign.getCreator();
    },
    potentialPlayers: function(){
        //if (!this.campaign) {
        //    return [];
        //}
        //
        //var players = $.merge([], this.campaign.players, [this.campaign.dungeonMaster], [this.campaign.creator]);
        //var users = Meteor.users.find({_id: {$nin: players}}).fetch();
        //return users.map(function(user){
        //    if (user){
        //        return {email: user.emails[0].address, _id: user._id};
        //    } else {
        //        return {email: '', _id: ''};
        //    }
        //})
    },
    dmEmail: function(){
        //if (this.campaign){
        //    var dm = Meteor.users.findOne({_id: this.campaign.dungeonMaster});
        //    if(dm){
        //        return dm.emails[0].address;
        //    }
        //}
    },
    playerEmails: function(){
        //if (!this.campaign)
        //    return [];
        //
        //var players = Meteor.users.find({_id: {$in: this.campaign.players}});
        //return players.map(function(player){
        //    if (player){
        //        return {email: player.emails[0].address, _id: player._id};
        //    } else{
        //        return {};
        //    }
        //});
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
        //var newPlayer = $("#new-player").find(":selected").val();
        //Campaigns.update(this.campaign._id, {$push: {players: newPlayer}});
    },
    "click .remove-player": function(){
        //var campaignId = Router.current().params.campaignId;
        //Campaigns.update(campaignId, {$pull: {players: this._id}});
    }
});
