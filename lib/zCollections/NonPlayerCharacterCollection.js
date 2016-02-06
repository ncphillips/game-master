// No `var` makes it global in Meteor
NonPlayerCharacterCollection = (function(){
    "use strict";

    function NonPlayerCharacterCollection() {
        BaseCollection.call(this);
        this.entityConstructor = NonPlayerCharacter;
        this.entityPrototype = NonPlayerCharacter.prototype;
    }

    NonPlayerCharacterCollection.prototype = Object.create(BaseCollection.prototype);
    NonPlayerCharacterCollection.prototype.constructor = NonPlayerCharacterCollection;

    NonPlayerCharacterCollection.prototype.findByCampaign = function(campaignId){
        if (typeof campaignId === 'object') {
            campaignId = campaignId.id();
        }
        return this._db.findByCampaign(campaignId).map(function(data){ return new NonPlayerCharacter(data)});
    };

    NonPlayerCharacterCollection.prototype.findAllIn = function(ids){
      return this._db.findAllIn(ids);
    };

    NonPlayerCharacterCollection.prototype.findByCampaignExcept = function(campaignId, ids){
        if (typeof campaignId === 'object') {
            campaignId = campaignId.id();
        }
        return this._db.findByCampaignExcept(campaignId, ids);
    };

    return new NonPlayerCharacterCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = NonPlayerCharacterCollection;
}