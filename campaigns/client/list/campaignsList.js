Template.campaignsList.helpers({
   userIsOwner: function(){
       if (this.creator())
           return this.creator().id() === Meteor.userId();
   }
});
Template.campaignsList.events({
    "click .campaign-delete": function(e){
        CampaignCollection.remove(this);
        e.stopPropagation();
    },
    "click .campaign-row": function(){
        Router.go("campaignsView", {campaignId: this.id()});
    }
});
