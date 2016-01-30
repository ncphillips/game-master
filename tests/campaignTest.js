"use strict";

var should = require("should");
var Campaign = require("../models/Campaign");
var PlayerCharacter = require("../models/PlayerCharacter");

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

    describe("adding player characters", function() {
        it("should have one player character", function() {
            var campaign = Campaign.create(campaignName);
            var playerCharacter = PlayerCharacter.create("Thorgon");

            campaign.addPlayerCharacter(playerCharacter);

            campaign.getPlayerCharacters().length.should.equal(1);
        });
    });
});




