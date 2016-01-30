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

        it("should have no player characters", function() {
            var campaign = Campaign.create(campaignName);

            campaign.getPlayerCharacters().length.should.equal(0);
        });
    });

    describe("ending campaigns", function() {
        it("should no longer be running", function() {
            var campaign = Campaign.create(campaignName);

            campaign.endCampaign();

            campaign.isRunning().should.be.false();
        });

        it("should be idempotent", function() {
            var campaign = Campaign.create(campaignName);

            campaign.endCampaign();
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
        this.isRunning = isRunning.bind(this, privateVars);
        this.endCampaign = endCampaign.bind(this, privateVars);
        this.getPlayerCharacters = getPlayerCharacters.bind(this, privateVars);
    }

    // Methods Using Private Variables
    function isRunning(privateVars) {
        return privateVars.isRunning;
    }

    function endCampaign(privateVars) {
        privateVars.isRunning = false;
    }

    function getPlayerCharacters() {
        return [];
    }

    // Static Methods
    function createCampaign(name) {
        if (!name)
            throw new Error("A campaign must have a name");

        return new Campaign(name);
    }

    // Static API
    return {
        create: createCampaign
    };
})();


