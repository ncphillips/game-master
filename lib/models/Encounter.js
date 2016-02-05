// No `var` makes it global in Meteor
ENCOUNTER_STATUSES = {
    IN_PROGRESS: "In Progress",
    NOT_STARTED: "Not Started"
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