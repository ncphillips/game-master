var should = require("should");
var CampaignCollection = require("../../lib/collections/CampaignCollection");
var Campaign = require("../../lib/models/Campaign");

describe("CampaignCollection", function() {
    var fake_database = {
        rows: {},
        nextId: 0,
        insert: function(data, callback) {
            data._id = this.nextId++;
            this.rows[data._id] = data;

            if (callback) callback(data._id);
        },
        update: function (id, data, callback) {
            this.rows[id] = data;

            if (callback) callback(data._id);
        },
        findOne: function(id){
            return this.rows[id];
        }
    };

    var campaignData = {"name": "Test Campaign"};
    var campaignCollection = new CampaignCollection(fake_database);

    describe("saving campaigns", function(){
        it("should not accept non-Campaign objects", function(){
            var badInputs = [null, undefined, "", {}, 1, 1.2, -1, [], function() {}];

            badInputs.forEach(function(input){
                campaignCollection.save.bind(null, input).should.throw();
            });
        });

        it("should be okay with Campaign objects", function(){
            var campaign = new Campaign(campaignData);

            (function() {campaignCollection.save(campaign);}).should.not.throw();
        });
    });

    describe("retrieving campaigns by id", function(){
        it("should return campaign with the given id", function(){
            var campaign = new Campaign(campaignData);

            campaignCollection.save(campaign, function(id){
                var retrievedCampaign = campaignCollection.findById(id);

                should(Campaign.prototype.isPrototypeOf(retrievedCampaign)).be.true();

                should.exist(retrievedCampaign.getId());
            });
        });

        it("should throw an error if there is no campaign with that id", function(){
            (function() { campaignCollection.findById(null);}).should.throw("No such Campaign exists");
        });
    });

});
