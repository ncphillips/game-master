var should = require("should");
var Campaign = require("../lib/models/Campaign");
var User = require("../lib/models/User");
var CampaignMembershipCollection = require("../lib/collections/CampaignMembershipCollection");

describe("Campaign Membership", function() {
    var FakeUserDb = {
        rows: [{name: "Nolan P", _id: "fakiestId"}]
    };

    var FakeDb= function() {return {
        rows: [],
        findPotentialPlayers: function(campaignId){
            return FakeUserDb.rows;
        },
        findPlayersInCampaign: function(campaignId){
            return this.rows.filter(function(membership){
                return (membership.groupType === 'campaign' && membership.groupId === campaignId);
            });
        },
        insert: function(data, callback){
            this.rows.push(data);
            if (callback) callback(this.rows.length);
        }
    };};


    it("initially there are no memberships", function() {
        CampaignMembershipCollection.setDatabaseConnection(new FakeDb());
        var campaign = new Campaign({name: "Billy G", _id: "fakeId"});

        var players = CampaignMembershipCollection.findPlayersInCampaign(campaign);

        players.length.should.equal(0);
    });

    it("can create a membership", function(){
        CampaignMembershipCollection.setDatabaseConnection(new FakeDb());
        var campaign = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});
        var user = new User({name: "Nolan P", _id: "fakiestId"});

        CampaignMembershipCollection.registerUserAsPlayer(user, campaign);

        CampaignMembershipCollection.findPlayersInCampaign(campaign).length.should.equal(1);
    });

    describe("finding players", function(){
        it("should only return users in that campaign", function(){
            CampaignMembershipCollection.setDatabaseConnection(new FakeDb());
            var campaign1 = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});
            var campaign2 = new Campaign({name: "Hoard of theDragon Queen", _id: "otherOned"});
            var user = new User({name: "Nolan P", _id: "fakiestId"});

            CampaignMembershipCollection.registerUserAsPlayer(user, campaign1);

            CampaignMembershipCollection.findPlayersInCampaign(campaign2).length.should.equal(0);
        });

        it("should return players as User objects", function(){
            CampaignMembershipCollection.setDatabaseConnection(new FakeDb());
            var campaign = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});
            var user = new User({name: "Nolan P", _id: "fakiestId"});

            CampaignMembershipCollection.registerUserAsPlayer(user, campaign);
            CampaignMembershipCollection.registerUserAsPlayer(user, campaign);
            CampaignMembershipCollection.registerUserAsPlayer(user, campaign);

            var players = CampaignMembershipCollection.findPlayersInCampaign(campaign);
            players.length.should.equal(3);

            players.forEach(function(user){
                (User.prototype.isPrototypeOf(user)).should.be.true();
            })
        });
    });

    describe("finding potential players", function(){


       it("should find some users", function(){
           CampaignMembershipCollection.setDatabaseConnection(new FakeDb());
           var campaign = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});

           var potentialPlayers = CampaignMembershipCollection.findPotentialPlayers(campaign);

           potentialPlayers.length.should.equal(1);

       });
    });
});

