CampaignMembershipCollection = (function(){
    function CampaignMembershipCollection(db) {
        this._db = db;
    }

    CampaignMembershipCollection.prototype.findPlayersForCampaign = function(campaign){
        return this._db.findPlayersByCampaign(campaign.getId()).map(function(player){
            return new User(player);
        });
    };

    CampaignMembershipCollection.prototype.registerUserAsPlayer = function(user, campaign){
        var membership = new Membership({});

        membership.setMember(user);
        membership.setMemberRole("player");
        membership.setGroup(campaign);
        membership.setGroupType("campaign");

        this._db.insert(membership.__data__);
    };

    return CampaignMembershipCollection;
})();

Membership = (function(){
   function Membership(data) {
       this.__data__ = validateData(data);
   }

    Membership.prototype.setMember = function(user){
        this.__data__.userId = user.getId();
    };

    Membership.prototype.setMemberRole = function(role){
        this.__data__.role = role;
    };

    Membership.prototype.setGroup = function(group){
        this.__data__.groupId= group.getId();
    };

    Membership.prototype.setGroupType = function(type){
        this.__data__.groupType = type;
    };

    function validateData(data) {
        var validData = {};

        if (data._id) {
            validData._id = data._id;
        }

        return validData;
    }

    return Membership;
})();

if (typeof module !== "undefined") {
    module.exports = CampaignMembershipCollection;
}
