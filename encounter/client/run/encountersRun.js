ENTER_CODE = 13;

Template.encountersRun.helpers({
    time: function(){
        if (this.encounter){
            return (this.encounter.round() * 6) + " seconds";
        }
    },
    isCurrentCharacter: function(index){
        var encounter = EncounterCollection.findById(Router.current().params.encounterId);
        return encounter.currentCharacterIndex() === index;
    },
    isUnconscious: function(hp){
        return hp <= 0;
    },
    currentCharacter: function(){
        if (this.encounter)
            return this.encounter.currentCharacter();
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
    },
    characterToView: function(){
        return CharacterCollection.findById(Session.get("characterToView"));
    }
});

Template.encountersRun.events({
    "click .character-name": function(){
        Session.set("characterToView", this.id());
        $("#character-sheet-modal").modal("show");
    },
    "click #next-turn": function(){
        this.encounter.nextTurn();
        console.log(this.encounter);

        this.encounter.initiativeOrder().forEach(function(character){
            var damage_selector = "#character-" + character.id() + " .deal-damage";

            var damage = $(damage_selector).val();

            if (damage) {
                character.dealDamage(damage);
                CharacterCollection.save(character);
                $(damage_selector).val('');
            }
        });

        EncounterCollection.save(this.encounter);
    },
    "keypress .deal-damage": function(e){
        if (e.keyCode === ENTER_CODE) {
            e.preventDefault();

            this.dealDamage(e.target.value);

            CharacterCollection.save(this);

            e.target.value = null;
        }
    },
    "keypress .pc-initiative": function(e){
        if (e.keyCode === ENTER_CODE) {
            e.preventDefault();

            this.initiative(e.target.value);

            CharacterCollection.save(this);
        }
    },
    "click #add-status": function(){
        $("#add-status-effect-modal").modal("show");
    },
    "click .save-status": function(){
        var status = new StatusEffect({
            name: $("#new-status-name").val(),
            rounds: $("#new-status-rounds").val(),
            description: $("#new-status-description").val()
        });

        var id = $("#status-character-id").val();
        var character = CharacterCollection.findById(id);
        character.addStatusEffect(status);
        CharacterCollection.save(character);
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