// No `var` makes it global in Meteor
Encounter = (function(){
    function Encounter(data) {
        this.__data__ = validateDate(data);
    }


    function isValidCampaign(campaign) {
        return campaign && Campaign.prototype.isPrototypeOf(campaign);
    }

    function validateDate(data){
        return data;
    }

    return Encounter;

})();


// For accessing with Node
if(typeof module !== 'undefined') {
    module.exports = Encounter
}