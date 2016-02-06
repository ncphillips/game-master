Template.encountersRun.helpers({
    time: function(){
        if (this.encounter)
            return (this.encounter.round() * 6) + " seconds";
    },
    isCurrentCharacter: function(index){
        var encounter = EncounterCollection.findOne(Router.current().params.encounterId);
        return encounter.currentCharacterIndex() === index;
    },
    isUnconscious: function(hp){
        return hp <= 0;
    },
    currentCharacter: function(){
        if (this.encounter){
            var index = this.encounter.currentCharacterIndex();
            var io = this.encounter.initiativeOrder();
            return io[index];
        } else {
            return {};
        }
    },
    characters: function(){
        if (this.encounter)
            return this.encounter.initiativeOrder();
    },
    crumbs: function(){
        if (!this.campaign || !this.encounter) return;
        var campaignId = this.campaign.id();
        var campaignName = this.campaign.name;
        var encounterId = this.encounter.id();
        var encounterName = this.encounter.name();
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}},
            {text: "Encounters", name: "encountersList", data: {campaignId: campaignId}},
            {text: encounterName,  name: "encountersView", data: {campaignId: campaignId, encounterId: encounterId}}
        ]};
    }
});

Template.encountersRun.events({
    "click #next-turn": function(){
        var index = this.encounter.currentCharacterIndex() + 1;
        var round = this.encounter.round();
        var io = this.encounter.initiativeOrder();

        // End of list, go to next round.
        if (index >= io.length) {
            index = 0;
            round++;
        }

        // If next character is dead, go to next next...
        var listLoopCount = 0;
        var nextCharacter = io[index];
        try{
            while(nextCharacter.hp <= 0){
                index++;
                nextCharacter = io[index];
                // Try to not get stuck in the look.
                if(index >= io.length){
                    listLoopCount++;
                    if(listLoopCount > 1){
                        console.log("Fucking infinite loops man");
                        break;
                    }
                }

                nextCharacter = io[index]
            }
        } catch (e) {
            $("#everyone-is-dead").modal("show");
        }

        //Encounters.update(this.encounter.id(), {$set: {currentPlayerIndex: index, round: round}})

        // Loop through statuses and decrement rounds. Delete if rounds === 0
        if (nextCharacter){
            var updatedStatusEffects = [];
            var statusEffects = nextCharacter.statusEffects || [];

            statusEffects.forEach(function(status){
                status.rounds--;
                if(status.rounds > 0){
                    updatedStatusEffects.push(status);
                }
            });

            //Characters.update(nextCharacter.id(), {$set: {statusEffects: updatedStatusEffects}});
        }
    },
    "keypress .deal-damage": function(e){
        var ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE) {
            e.preventDefault();

            var damage = e.target.value;
            console.log("Dealt " + damage + " damage to " + this.name);
            var newHealth = this.hp - damage;
            if (newHealth >= this.max_hp) {
                newHealth = this.max_hp;
            } else if (newHealth < 0) {
                newHealth = 0;
            }
            //Characters.update(this.id(), {$set: {hp: newHealth}});
            e.target.value = null;
        }
    },
    "keypress .pc-initiative": function(e){
        var ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE) {
            e.preventDefault();

            var initiative = e.target.value;
            //Characters.update(this.id(), {$set: {initiative: initiative-0}});
        }
    },
    "click .add-status": function(){
        $("#add-status-effect-modal").modal("show");
        Session.set("setStatusOnCharacter", this.id());
    },
    "click .save-status": function(){
        var status = {
            name: $("#new-status-name").val(),
            rounds: $("#new-status-rounds").val(),
            description: $("#new-status-description").val()
        };

        var cid = Session.get("setStatusOnCharacter");
        //Characters.update(cid, {$push: {statusEffects: status}});

        $("#add-status-effect-modal").modal("hide");
    },
    "click #end-encounter": function(e){
        console.log("End combat");
        //Encounters.update(this.encounter.id(), {$set: {status: "Complete"}});
    }
});

Template.encountersRun.onRendered(function(){
    $('body').tooltip({
        selector: '[data-toggle=tooltip]'
    });
});

function getInitativeOrder(encounter) {
    //return Characters.find({_id: {$in: encounter.characters}}, {sort: {initiative: -1}}).fetch();
}