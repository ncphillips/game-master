var should = require("should");
var Encounter = require("../../lib/models/Encounter");

describe("Encounter", function(){

    var campaignData = {name: "Princes of the Apocalypse"};

    describe("adding encounters to campaigns", function(){
       it("should throw error when first argument is non-Campaign", function(){
           var badCampaigns = ["", null, undefined, function() {}, 1, 1.4, [], {}];

           badCampaigns.forEach(function(campaign){
               (function(){ new Encounter(campaign)}).should.throw("Invalid Campaign in first argument");
           });
       });
    });
});
