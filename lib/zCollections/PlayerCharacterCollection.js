// No `var` makes it global in Meteor
PlayerCharacterCollection = (function(){
    "use strict";

    function PlayerCharacterCollection() {
        BaseCollection.call(this);
        this.entityConstructor = PlayerCharacter;
        this.entityPrototype = PlayerCharacter.prototype;
    }

    PlayerCharacterCollection.prototype = Object.create(BaseCollection.prototype);
    PlayerCharacterCollection.prototype.constructor = PlayerCharacterCollection;

    PlayerCharacterCollection.prototype.findByCampaign = function(campaignId){
        if (typeof campaignId === 'object') {
            campaignId = campaignId.getId();
        }
        return this._db.findByCampaign(campaignId).map(function(data){ return new PlayerCharacter(data)});
    };

    return new PlayerCharacterCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = PlayerCharacterCollection;
}