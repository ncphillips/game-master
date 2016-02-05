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

CampaignMembershipCollection = (function(){
    function CampaignMembershipCollection() {
        BaseCollection.call(this);
        this.entityConstructor = Membership;
        this.entityPrototype = Membership.prototype;
    }

    CampaignMembershipCollection.prototype = Object.create(BaseCollection.prototype);
    CampaignMembershipCollection.prototype.constructor = CampaignMembershipCollection;


    CampaignMembershipCollection.prototype.findPlayersInCampaign = function(campaignId){
        if (typeof campaignId === 'object') {
            campaignId = campaignId.getId();
        }
        return this._db.findPlayersInCampaign(campaignId).map(function(player){
            return new User(player);
        });
    };

    CampaignMembershipCollection.prototype.findPotentialPlayers = function(campaignId){
        if (typeof campaignId === 'object') {
            campaignId = campaignId.getId();
        }
        return this._db.findPotentialPlayers(campaignId).map(function(player){
            return new User(player);
        });
    };

    CampaignMembershipCollection.prototype.registerUserAsPlayer = function(user, campaign){
        if (typeof user !== 'object') {
            var id = user;
            user = { getId: function() {return id}};
        }

        var membership = new Membership({});

        membership.setMember(user);
        membership.setMemberRole("player");
        membership.setGroup(campaign);
        membership.setGroupType("campaign");

        this._db.insert(membership.__data__);
    };

    CampaignMembershipCollection.prototype.removePlayerFromCampaign = function(userId, campaignId){
        if(typeof userId === 'object')
            userId = userId.getId();
        if(typeof campaignId === 'object')
            campaignId = campaignId.getId();
        this._db.removePlayerFromCampaign(userId, campaignId);
    };

    return new CampaignMembershipCollection();
})();



if (typeof module !== "undefined") {
    module.exports = CampaignMembershipCollection;
}