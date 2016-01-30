// No `var` makes it global in Meteor
CampaignCollection = (function(){
    "use strict";

    var CampaignCollection = {
        save: function (campaign) {
            if (!Campaign.prototype.isPrototypeOf(campaign)) {
                throw new Error("This object is not a Campaign");
            }
        }
    };

    return CampaignCollection
})();

// For accessing with node
if(module) {
    module.exports = CampaignCollection;
}