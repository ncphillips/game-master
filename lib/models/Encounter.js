// No `var` makes it global in Meteor
ENCOUNTER_STATUSES = {
    IN_PROGRESS: "In Progress",
    NOT_STARTED: "Not Started",
    DONE: "Done"
};

Encounter = (function(){

    function Encounter(data) {
        this.__data__ = validateDate(data) || {};
    }

    // Accessors
    Encounter.prototype.id = function(){ return this.__data__._id; };
    Encounter.prototype.name = function(){ return this.__data__.name; };
    Encounter.prototype.description = function(){ return this.__data__.name; };
    Encounter.prototype.status = function(newStatus){
        if (newStatus) {
            this.__data__.status = newStatus;
        }
        return this.__data__.status;
    };
    Encounter.prototype.round = function(round){
        if (typeof round === 'number') {
            this.__data__.round = round;
        }
        return this.__data__.round;
    };
    Encounter.prototype.campaign = function(){
        return CampaignCollection.findById(this.__data__.campaign);
    };
    Encounter.prototype.dungeonMaster = function(){
        return UserCollection.findById(this.__data__.dungeonMaster);
    };

    // Player Characters
    Encounter.prototype.playerCharacters = function(){
        return PlayerCharacterCollection.findAllIn(this.__data__.playerCharacters || []);
    };

    Encounter.prototype.potentialPlayerCharacters = function(){
        return PlayerCharacterCollection.findByCampaignExcept(this.__data__.campaign, this.__data__.playerCharacters || []);
    };

    Encounter.prototype.addPlayerCharacter = function(pcid){
        var pcs = this.__data__.playerCharacters || [];
        var pcIndex = pcs.indexOf(pcid);
        if (!(pcIndex >= 0)) {
            pcs.push(pcid);
        }
        this.__data__.playerCharacters = pcs;
    };
    Encounter.prototype.removePlayerCharacter = function(pcid){
        var pcs = this.__data__.playerCharacters || [];
        var pcIndex = pcs.indexOf(pcid);
        if (pcIndex >= 0) {
            pcs.splice(pcIndex, 1);
            this.__data__.playerCharacters = pcs;
        }
    };

    // Monster Generators
    Encounter.prototype.monsterGenerators = function(){
        return this.__data__.monsterGenerators|| [];
    };

    Encounter.prototype.addMonsterGenerator = function(monsterGenerator){
        var monsterGenerators = this.__data__.monsterGenerators || [];

        monsterGenerators.push(monsterGenerator);

        this.__data__.monsterGenerators = monsterGenerators;
    };

    // Non Player Characters
    Encounter.prototype.addNonPlayerCharacter = function(id){
        if (typeof id === "object") {
            id = id.id();
        }
        var npcs = this.__data__.nonPlayerCharacters || [];
        npcs.push(id);
        this.__data__.nonPlayerCharacters = npcs;
    };

    Encounter.prototype.nonPlayerCharacters = function(){
        return NonPlayerCharacterCollection.findAllIn(this.__data__.nonPlayerCharacters || []);
    };

    // Initiative Order
    Encounter.prototype.initiativeOrder = function(){
        var characters = $.extend([], this.playerCharacters(), this.nonPlayerCharacters());
        characters.sort(function(a, b){
            return b.initiative() - a.initiative();
        });
        return characters;
    };

    Encounter.prototype.currentCharacterIndex = function(){
        return 0;
    };

    // Lifecycle Methods
    Encounter.prototype.start = function(){
        createNonPlayerCharacters(this);
        this.status(ENCOUNTER_STATUSES.IN_PROGRESS);
    };

    function createNonPlayerCharacters(encounter) {
        encounter.monsterGenerators().forEach(function (generator) {
            for (var i=1; i <= generator.count; i++) {
                // Todo MonsterTemplate collection.
                // Todo MonsterTemplate model that has a "createInstance(name)"
                var monsterTemplate = MonsterTemplates.findOne({name: generator.monsterName});
                var npcData = monsterTemplate;
                delete npcData._id;
                npcData.name = monsterTemplate.name + " " + i;

                var npc = new NonPlayerCharacter(npcData);
                NonPlayerCharacterCollection.save(npc, function(id){
                    encounter.addNonPlayerCharacter(id);
                });
            }
        });
    }

    function isValidCampaign(campaign) {
        return campaign && Campaign.prototype.isPrototypeOf(campaign);
    }

    function validateDate(data){
        var validData = data || {};
        data.status = data.status || ENCOUNTER_STATUSES.NOT_STARTED;
        data.round = data.round || 0;
        return data;
    }

    return Encounter;

})();


// For accessing with Node
if(typeof module !== 'undefined') {
    module.exports = Encounter
}