if(typeof module !== 'undefined') {
    Encounter = require("../models/Encounter");
    BaseCollection = require("./BaseCollection");
}
// No `var` makes it global in Meteor
EncounterCollection = (function(){
    "use strict";


    function EncounterCollection() {
        BaseCollection.call(this);
        this.entityConstructor = Encounter;
        this.entityPrototype = Encounter.prototype;
    }

    EncounterCollection.prototype = Object.create(BaseCollection.prototype);
    EncounterCollection.prototype.constructor = EncounterCollection;

    EncounterCollection.prototype.findByCampaign = function(campaignId){
        if (typeof campaignId === "object")
            campaignId = campaignId.getId();

        return this._db.findByCampaign(campaignId).map(function(data){
            return new Encounter(data);
        });

    };

    return new EncounterCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = EncounterCollection;
}