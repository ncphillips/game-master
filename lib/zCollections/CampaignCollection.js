if(typeof module !== 'undefined') {
    Campaign = require("../models/Campaign");
    BaseCollection = require("./BaseCollection");
}
// No `var` makes it global in Meteor
CampaignCollection = (function(){
    "use strict";


    function CampaignCollection() {
        BaseCollection.call(this);
        this.entityConstructor = Campaign;
        this.entityPrototype = Campaign.prototype;
    }

    CampaignCollection.prototype = Object.create(BaseCollection.prototype);
    CampaignCollection.prototype.constructor = CampaignCollection;

    return new CampaignCollection();
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = CampaignCollection;
}