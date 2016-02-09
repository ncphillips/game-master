// No `var` makes it global in Meteor
ENCOUNTER_STATUSES = function() {
    return {
        IN_PROGRESS: "In Progress",
        NOT_STARTED: "Not Started",
        DONE: "Done"
    };
};

Encounter = (function(){

    function Encounter(data) {
        this.__data__ = validateDate(data) || {};
    }

    // Accessors
    Encounter.prototype.id = function(){
        return this.__data__._id;
    };

    Encounter.prototype.name = function(name){
        if (typeof name !== "undefined") {
            this.__data__.name = name;
        }
        return this.__data__.name;
    };

    Encounter.prototype.description = function(description){
        if (typeof description !== "undefined") {
            this.__data__.description = description;
        }
        return this.__data__.description;
    };

    Encounter.prototype.status = function(status){
        if (typeof status !== "undefined") {
            this.__data__.status = status;
        }
        return this.__data__.status;
    };

    Encounter.prototype.round = function(round){
        if (typeof round !== "undefined" && round > 0) {
            this.__data__.round = round - 0;
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
        if (typeof pcid === "object"){
            pcid = pcid.id();
        }

        var pcs = this.__data__.playerCharacters || [];
        var pcIndex = pcs.indexOf(pcid);

        if (!(pcIndex >= 0)) {
            pcs.push(pcid);
        }

        this.__data__.playerCharacters = pcs;
    };
    Encounter.prototype.removePlayerCharacter = function(pcid){
        if (typeof pcid === "object"){
            pcid = pcid.id();
        }

        var pcs = this.__data__.playerCharacters || [];
        var pcIndex = pcs.indexOf(pcid);

        if (pcIndex >= 0) {
            pcs.splice(pcIndex, 1);
        }

        this.__data__.playerCharacters = pcs;
    };

    // Monster Generators
    Encounter.prototype.monsterGenerators = function(){
        var id = this.id();
        var gens = this.__data__.monsterGenerators|| [];
        gens.map(function(g){
            g.encounterId = id;
            return g;
        });
        return gens;
    };

    Encounter.prototype.addMonsterGenerator = function(monsterGenerator){
        var monsterGenerators = this.__data__.monsterGenerators || [];

        monsterGenerators.push(monsterGenerator);

        this.__data__.monsterGenerators = monsterGenerators;
    };

    Encounter.prototype.removeMonsterGenerator = function(monsterGenerator){
        var gens = this.monsterGenerators().filter(function(gen){
            return gen.count !== monsterGenerator.count || gen.monsterName !== monsterGenerator.monsterName;
        });

        this.__data__.monsterGenerators = gens;
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

    Encounter.prototype.addNonPlayerCharacterFromGenerator = function(generator){
        createNonPlayerCharacters(this, [generator]);
    };

    // Initiative Order
    Encounter.prototype.initiativeOrder = function(){
        var characters = [].concat(this.playerCharacters()).concat(this.nonPlayerCharacters());
        characters.sort(function(a, b){
            return b.initiative() - a.initiative();
        });
        return characters;
    };

    Encounter.prototype.currentCharacterIndex = function(index){
        if (typeof index !== "undefined") {
            this.__data__.currentCharacterIndex = index;
        }
        return this.__data__.currentCharacterIndex || 0;
    };

    Encounter.prototype.currentCharacter = function(){
        return this.initiativeOrder()[this.currentCharacterIndex()];
    };

    // Lifecycle Methods
    Encounter.prototype.start = function(){
        if (this.status() === ENCOUNTER_STATUSES().NOT_STARTED){
            createNonPlayerCharacters(this, this.monsterGenerators());
            this.status(ENCOUNTER_STATUSES().IN_PROGRESS);
        }
    };

    Encounter.prototype.nextTurn = function(){
        // TODO: Skip dead characters.
        // TODO: Decrement Status Effect Timers
        var order = this.initiativeOrder();
        var nextIndex = this.currentCharacterIndex() + 1;
        if (nextIndex >= order.length) {
            nextIndex = nextIndex % order.length;
            this.round(this.round() + 1);
        }
        var character = this.currentCharacter();

        var se = character.__data__.statusEffects;
        se = se.map(function(d){
            d.roundsLeft = d.roundsLeft - 1;
            if(d.roundsLeft > 0) {
                return d;
            }
            return null;
        });

        se = se.filter(function(d) {
            if (d !== null) {
                return true;
            } else {
                false;
            }
        });

        character.__data__.statusEffects = se;
        CharacterCollection.save(character);

        this.currentCharacterIndex(nextIndex);
    };

    // Private Methods
    function createNonPlayerCharacters(encounter, generators) {
        generators.forEach(function (generator) {
            for (var i=1; i <= generator.count; i++) {
                // Todo MonsterTemplate collection.
                // Todo MonsterTemplate model that has a "createInstance(name)"
                var monsterTemplate = MonsterTemplates.findOne({name: generator.monsterName});
                var npcData = monsterTemplate;
                delete npcData._id;
                npcData.max_hp = npcData.hp;
                npcData.name = monsterTemplate.name + " " + i;

                var npc = new NonPlayerCharacter(npcData);
                npc.rollInitiative();
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
        data.status = data.status || ENCOUNTER_STATUSES().NOT_STARTED;
        data.round = data.round || 0;
        return data;
    }

    return Encounter;

})();


// For accessing with Node
if(typeof module !== 'undefined') {
    module.exports = Encounter
}