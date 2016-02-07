Template.encountersView.helpers({
    dmEmail: function(){
        if (this.encounter) {
            return this.encounter.dungeonMaster().primaryEmail();
        }
    },
    playerCharacters: function(){
        if (this.encounter) {
            return this.encounter.playerCharacters();
        }
        return [];
    },
    potentialPlayerCharacters: function(){
        if (this.encounter) {
            return this.encounter.potentialPlayerCharacters();
        }
        return [];
    },
    notStarted: function() {
        return this.encounter && this.encounter.status() === ENCOUNTER_STATUSES().NOT_STARTED;
    },
    inProgress: function() {
        return this.encounter && this.encounter.status() === ENCOUNTER_STATUSES().IN_PROGRESS;
    },
    isDone: function() {
        return this.status === ENCOUNTER_STATUSES().DONE;
    },
    userIsDm: function(){
        if (!(this.encounter && this.encounter.dungeonMaster())) {
            return false;
        }
        return Meteor.userId() === this.encounter.dungeonMaster().id();
    },
    monsterTemplates: function(){
        return MonsterTemplates.find({}, {sort: {name: 1}}).fetch();
    },
    crumbs: function(){
        if (!this.campaign) return;
        var campaignId = this.campaign.id();
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

        var encounter = EncounterCollection.findById(encounterId);
        console.log(encounter, this);
        encounter.removePlayerCharacter(this.id());
        EncounterCollection.save(encounter);
    },
    "click .add-player-character": function(){
        var newPC = $("#new-player-character").find(":selected").val();
        this.encounter.addPlayerCharacter(newPC);
        EncounterCollection.save(this.encounter);
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

        // Todo make constructor for MonsterGenerator
        this.encounter.addMonsterGenerator(monsterGenerator);
        EncounterCollection.save(this.encounter);
    },
    "click #start-encounter": function(){
        this.encounter.start();
        EncounterCollection.save(this.encounter, function(){
            Router.go('encountersRun', Router.current().params);
        });
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