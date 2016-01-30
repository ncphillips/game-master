// No `var` makes it global in Meteor
CampaignCollection = (function(){
    "use strict";

    var CampaignCollection = {
        save: function (campaign) {
            if (!Campaign.prototype.isPrototypeOf(campaign)) {
                throw new Error("This object is not a Campaign");
            }

            campaign.__data__._id = 12;

            return campaign;
        }
    };

    return CampaignCollection
})();

// For accessing with node
if(module) {
    module.exports = CampaignCollection;
}