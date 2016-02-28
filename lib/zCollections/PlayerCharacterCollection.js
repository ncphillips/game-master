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
        if (typeof campaignId === 'object' && campaignId) {
            campaignId = campaignId.id();
        }
        return this._db.findByCampaign(campaignId).map(toPlayerCharacter);
    };

    PlayerCharacterCollection.prototype.findAllIn = function(ids){
      return this._db.findAllIn(ids).map(toPlayerCharacter);
    };

    PlayerCharacterCollection.prototype.findByCampaignExcept = function(campaignId, ids){
        if (typeof campaignId === 'object' && campaignId) {
            campaignId = campaignId.id();
        }
        return this._db.findByCampaignExcept(campaignId, ids).map(toPlayerCharacter);
    };

    function toPlayerCharacter(data){
        return new PlayerCharacter(data);
    }

    return new PlayerCharacterCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = PlayerCharacterCollection;
}