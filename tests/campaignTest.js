"use strict";

var should = require("should");

describe("Campaign", function() {
    var campaignName = "Hoard of the Dragon Queen";

    describe("new campaigns", function() {
        it("should not be null", function() {
            var campaign = Campaign.create(campaignName);

            should.exist(campaign);
        });

        it("should throw an Error without a name ", function() {
            Campaign.create.should.throw();
        });

        it("should set the name from the input value", function() {
            var campaign = Campaign.create(campaignName);

            campaign.name.should.equal(campaignName);
        });

        it("should be running", function() {
            var campaign = Campaign.create(campaignName);

            campaign.isRunning().should.be.true();
        });
    });

    describe("ending campaigns", function() {
        it("should no longer be running", function() {
            var campaign = Campaign.create(campaignName);

            campaign.endCampaign();

            campaign.isRunning().should.be.false();
        });
    });
});

var Campaign = (function() {
    // Constructor
    function Campaign(name) {
        this.name = name;


        var privateVars = { isRunning: true };
        this.isRunning = function() { return privateVars.isRunning; };
        this.endCampaign = function() { privateVars.isRunning = false; };

    }

    // Static Methods
    function createCampaign(name) {
        if (!name)
            throw new Error("A campaign must have a name");

        return new Campaign(name);
    }

    // API
    return {
        create: createCampaign
    };
})();


