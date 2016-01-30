if(typeof module !== 'undefined') {
    Campaign = require("../models/Campaign");
}
// No `var` makes it global in Meteor
CampaignCollection = (function(){
    "use strict";


    function CampaignCollection(database) {
        database = database || fake_database;
        this._db = database;
    }

    CampaignCollection.prototype.save = function (campaign, callback) {
        if (!Campaign.prototype.isPrototypeOf(campaign)) {
            throw new Error("This object is not a Campaign");
        }

        if (campaign.__data__._id) {
            this._db.update(campaign.__data__._id, campaign.__data__, callback);
        } else {
            this._db.insert(campaign.__data__, callback);
        }
    };

    CampaignCollection.prototype.findById = function (id) {
        var data = this._db.findOne(id);

        if (!data) {
            throw new Error("No such Campaign exists");
        }

        return new Campaign(data);
    };

    CampaignCollection.prototype.findAll = function(){
        return this._db.findAll();
    };

    return CampaignCollection;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = CampaignCollection;
}