// No `var` makes it global in Meteor
CampaignCollection = (function(){
    "use strict";

    var CampaignCollection = {

    };

    return CampaignCollection
})();

// For accessing with node
if(module) {
    module.exports = CampaignCollection;
}