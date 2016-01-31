var should = require("should");
var Campaign = require("../lib/models/Campaign");
var User = require("../lib/models/User");
var CampaignMembershipCollection = require("../lib/collections/CampaignMembershipCollection");

describe("Campaign Membership", function() {
    var FakeDb= function() {return {
        rows: [],
        findPlayersByCampaign: function(campaignId){
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
        var cmc = new CampaignMembershipCollection(new FakeDb());
        var campaign = new Campaign({name: "Billy G", _id: "fakeId"});

        var players = cmc.findPlayersForCampaign(campaign);

        players.length.should.equal(0);
    });

    it("can create a membership", function(){
        var cmc = new CampaignMembershipCollection(new FakeDb());
        var campaign = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});
        var user = new User({name: "Nolan P", _id: "fakiestId"});

        cmc.registerUserAsPlayer(user, campaign);

        cmc.findPlayersForCampaign(campaign).length.should.equal(1);
    });

    describe("finding players", function(){
       it("should only return users in that campaign", function(){
           var cmc = new CampaignMembershipCollection(new FakeDb());
           var campaign1 = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});
           var campaign2 = new Campaign({name: "Hoard of theDragon Queen", _id: "otherOned"});
           var user = new User({name: "Nolan P", _id: "fakiestId"});

           cmc.registerUserAsPlayer(user, campaign1);

           cmc.findPlayersForCampaign(campaign2).length.should.equal(0);
       });

        it("should return players as User objects", function(){
            var cmc = new CampaignMembershipCollection(new FakeDb());
            var campaign = new Campaign({name: "Hoard of theDragon Queen", _id: "fakeId"});
            var user = new User({name: "Nolan P", _id: "fakiestId"});

            cmc.registerUserAsPlayer(user, campaign);
            cmc.registerUserAsPlayer(user, campaign);
            cmc.registerUserAsPlayer(user, campaign);

            var players = cmc.findPlayersForCampaign(campaign);
            players.length.should.equal(3);

            players.forEach(function(user){
                (User.prototype.isPrototypeOf(user)).should.be.true();
            })
        });
    });
});

