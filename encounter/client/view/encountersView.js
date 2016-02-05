Template.encountersView.helpers({
    dmEmail: function(){
        if (this.encounter) {
            return this.encounter.dungeonMaster().getEmail();
        }
    },
    playerCharacters: function(){
        if (this.encounter) {
            return _db.playerCharacters.find({_id: {$in: this.encounter.__data__.playerCharacters || []}}).fetch();
        }
        return [];
    },
    potentialPlayerCharacters: function(){
        if (this.encounter) {
            return _db.playerCharacters.find({_id: {$nin: this.encounter.__data__.playerCharacters || []}, campaign: this.campaign.getId()}).fetch();
        }
        return [];
    },
    notStarted: function() {
        return this.encounter && this.encounter.status === "Not Started";
    },
    inProgress: function() {
        return this.encounter && this.encounter.status === "In Progress";
    },
    isDone: function() { return this.status === "Done"; },
    userIsDm: function(){
        return true;
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.dungeonMaster;
    },
    userIsCreatorOrDm: function(){
        return true;
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.dungeonMaster || Meteor.userId() === this.encounter.creator;
    },
    monsterTemplates: function(){
        return MonsterTemplates.find({}, {sort: {name: 1}}).fetch();
    },
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

Template.encountersView.events({
    "click .remove-player-character": function(){
        var encounterId = Router.current().params.encounterId;
        _db.encounter.update(encounterId, {$pull: {playerCharacters: this._id}});
    },
    "click .add-player-character": function(){
        var newPC = $("#new-player-character").find(":selected").val();
        _db.encounters.update(this.encounter._id, {$push: {playerCharacters: newPC}});
    },
    "click .add-monster": function(){
        var count = $("#num-monsters").val();
        var monsterName = $("#monster-name").find(":selected").text();
        var monster = MonsterTemplates.findOne({name: monsterName});

        var monsterGenerator = {
            count: count || 0,
            monsterId: monster._id,
            monsterName: monster.name
        };

        _db.encounters.update(this.encounter._id, {$push: {monsterGenerators: monsterGenerator}});
    },
    "click #start-encounter": function(){
        // Generate Monsters
        var characters = [];
        this.encounters.monsterGenerators.forEach(function(generator){
            characters = $.merge(characters, generateMonsters(generator));
        });

        // Add Players
        characters = $.merge(characters, loadPlayerCharacters(this.encounter));

        // Update Status
        _db.encounters.update(this.encounter.__data__._id, {$set: {status: "In Progress", characters: characters}});

        Router.go('encountersRun', Router.current().params);
    },
    "click #view-running-encounter": function(){
        Router.go('encountersRun', Router.current().params);
    }
});

function rollD20(mod) {
    return Math.floor(Math.random() * 20) + 1 + mod;
}

function rollHitDie(hd) {
    return 1;
}

function loadPlayerCharacters(encounter) {
    var characters = Characters.find({_id: {$in: encounter.__data__.playerCharacters || []}}).fetch();
    return characters.map(function(pc){
        return pc._id;
    });
}