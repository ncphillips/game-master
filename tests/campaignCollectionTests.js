var should = require("should");
var CampaignCollection = require("../collections/CampaignCollection");
var Campaign = require("../models/Campaign");

describe("CampaignCollection", function() {
    describe("saving campaigns", function(){
        it("should not accept non-Campaign objects", function(){
            var badInputs = [null, undefined, "", {}, 1, 1.2, -1, [], function() {}];

            badInputs.forEach(function(input){
                CampaignCollection.save.bind(null, input).should.throw();
            });
        });

        it("should be okay with Campaign objects", function(){
            var campaign = new Campaign("Test Campaign");

            CampaignCollection.save.bind(null, campaign).should.not.throw();
        });

        it("should give the campaign an id", function(){
            var campaign = new Campaign("Test Campaign");

            campaign = CampaignCollection.save(campaign);

            should.exist(campaign.getId());
        });
    });

    describe("retrieving campaigns by id", function(){
    });

});
