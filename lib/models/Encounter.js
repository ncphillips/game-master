// No `var` makes it global in Meteor
ENCOUNTER_STATUSES = {
    IN_PROGRESS: "In Progress",
    NOT_STARTED: "Not Started",
    DONE: "Done"
};

Encounter = (function(){

    function Encounter(data) {
        this.__data__ = validateDate(data);
    }

    Encounter.prototype.name = function(){ return this.__data__.name; };
    Encounter.prototype.description = function(){ return this.__data__.name; };
    Encounter.prototype.status = function(){ return this.__data__.status; };
    Encounter.prototype.id = function(){ return this.__data__._id; };

    Encounter.prototype.campaign = function(){
        return CampaignCollection.findById(this.__data__.campaign);
    };

    Encounter.prototype.dungeonMaster = function(){
        return UserCollection.findById(this.__data__.dungeonMaster);
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

    Encounter.prototype.monsterGenerators = function(){
        return this.__data__.monsterGenerators|| [];
    };

    Encounter.prototype.addMonsterGenerator = function(monsterGenerator){
        var monsterGenerators = this.__data__.monsterGenerators || [];

        monsterGenerators.push(monsterGenerator);

        this.__data__.monsterGenerators = monsterGenerators;
    };


    function isValidCampaign(campaign) {
        return campaign && Campaign.prototype.isPrototypeOf(campaign);
    }

    function validateDate(data){
        data.status = data.status || ENCOUNTER_STATUSES.NOT_STARTED;
        return data;
    }

    return Encounter;

})();


// For accessing with Node
if(typeof module !== 'undefined') {
    module.exports = Encounter
}