if(module) {
    Campaign = require("../models/Campaign");
}
// No `var` makes it global in Meteor
CampaignCollection = (function(){
    "use strict";
    var fake_database = {

    };

    var next_id = 0;

    function save(campaign) {
        if (!Campaign.prototype.isPrototypeOf(campaign)) {
            throw new Error("This object is not a Campaign");
        }

        campaign.__data__._id = next_id++;

        fake_database[campaign.getId()] = campaign.__data__;

        return campaign;
    }

    function findById(id) {
        var data = fake_database[id];

        if (!data) {
            throw new Error("No such Campaign exists");
        }

        return new Campaign(data);
    }

    return {
        save: save,
        findById: findById
    }
})();

// For accessing with node
if(module) {
    module.exports = CampaignCollection;
}