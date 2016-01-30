// No `var` makes it global in Meteor
Encounter = (function(){
    function Encounter(campaign, data) {
        if (!isValidCampaign(campaign)) {
            throw new Error("Invalid Campaign in first argument");
        }

    }


    function isValidCampaign(campaign) {
        return campaign && Campaign.prototype.isPrototypeOf(campaign);
    }

    return Encounter;

})();


// For accessing with Node
if(typeof module !== 'undefined') {
    module.exports = Encounter
}