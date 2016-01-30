var should = require("should");
var CampaignCollection = require("../../collections/MockCampaignCollection");
var Campaign = require("../../models/Campaign");

describe("CampaignCollection", function() {
    var campaignData = {"name": "Test Campaign"};
    describe("saving campaigns", function(){
        it("should not accept non-Campaign objects", function(){
            var badInputs = [null, undefined, "", {}, 1, 1.2, -1, [], function() {}];

            badInputs.forEach(function(input){
                CampaignCollection.save.bind(null, input).should.throw();
            });
        });

        it("should be okay with Campaign objects", function(){
            var campaign = new Campaign(campaignData);

            CampaignCollection.save.bind(null, campaign).should.not.throw();
        });

        it("should give the campaign an id", function(){
            var campaign = new Campaign(campaignData);

            campaign = CampaignCollection.save(campaign);

            should.exist(campaign.getId());
        });
    });

    describe("retrieving campaigns by id", function(){
        it("should return campaign with the given id", function(){
            var campaign = new Campaign(campaignData);
            campaign = CampaignCollection.save(campaign);

            var retrievedCampaign = CampaignCollection.findById(campaign.getId());

            retrievedCampaign.getId().should.equal(campaign.getId());
        });

        it("should throw an error if there is no campaign with that id", function(){
            (function() { CampaignCollection.findById(null);}).should.throw("No such Campaign exists");
        });
    });

});
