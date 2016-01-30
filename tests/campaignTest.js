"use strict";

var should = require("should");
var Campaign = require("../models/Campaign");
var PlayerCharacter = require("../models/PlayerCharacter");

describe("Campaign", function() {
    var campaignName = "Hoard of the Dragon Queen";

    describe("new campaigns", function() {
        it("should exist", function() {
            var campaign = new Campaign(campaignName);

            should.exist(campaign);
        });

        it("should throw an Error without a name ", function() {
            (function() { new Campaign(); }).should.throw();
        });

        it("should set the name from the input value", function() {
            var campaign = new Campaign(campaignName);

            campaign.name.should.equal(campaignName);
        });

        it("should be running", function() {
            var campaign = new Campaign(campaignName);

            campaign.isRunning().should.be.true();
        });

        it("should have no player characters", function() {
            var campaign = new Campaign(campaignName);

            campaign.getPlayerCharacters().length.should.equal(0);
        });
    });

    describe("ending campaigns", function() {
        it("should no longer be running", function() {
            var campaign = new Campaign(campaignName);

            campaign.endCampaign();

            campaign.isRunning().should.be.false();
        });

        it("should be idempotent", function() {
            var campaign = new Campaign(campaignName);

            campaign.endCampaign();
            campaign.endCampaign();

            campaign.isRunning().should.be.false();
        });
    });

    describe("adding player characters", function() {
        it("should have the new player character", function() {
            var campaign = new Campaign(campaignName);
            var playerCharacter = PlayerCharacter.create("Thorgon");

            campaign.addPlayerCharacter(playerCharacter);

            campaign.hasPlayerCharacter(playerCharacter).should.be.true();
        });

        it("should not be able to add the player a second time", function() {
            var campaign = new Campaign(campaignName);
            var playerCharacter = PlayerCharacter.create("Thorgon");
            var addPC = campaign.addPlayerCharacter.bind(campaign, playerCharacter);

            addPC();

            addPC.should.throw();
        });
    });
});




