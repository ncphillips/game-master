ENCOUNTER_STATUSES = {
    NOT_STARTED: "Not Started"
};

Encounter = (function(){
    "use strict";

    var methodNames = {
        CREATE: "encounter.create",
        UPDATE: "encounter.update"
    };

    var meteorMethods = {};
    meteorMethods[methodNames.CREATE] = function(encounter){
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var urlParams = { campaignId: encounter.campaign };
        urlParams.encounterId = Encounters.insert(encounter);

        Router.go('encounterView', urlParams);
    };

    meteorMethods[methodNames.UPDATE] = function(encounter){
        Encounters.update(encounter._id, encounter);
    };

    Meteor.methods(meteorMethods);

    function Encounter(data) {
        if (!(data.campaign && data.campaign._id))
            throw new Error("Cannot create an encounter outside of a campaign");

        this.campaign = data.campaign._id;
        this.name = data.name || "<Name>";
        this.status = data.status || ENCOUNTER_STATUSES.NOT_STARTED;
        this.round = data.round || 1;
        this.description = data.description || "";
        this.currentPlayerIndex = data.currentPlayerIndex || 0;
        this.dungeonMaster = data.dungeonMaster || Meteor.userId();
        this.creator = data.creator || Meteor.userId();
        this.players = data.players || data.campaign.players;
        this.playerCharacters = data.playerCharacters || Characters.listPcIdsForCampaign(data.campaign);
        this.monsterGenerators = data.monsterGenerators || [];
    }

    Character.prototype.save = function(){
        if (!this._id) {
            this._id = Meteor.call(methodNames.CREATE, this);
        }

        Meteor.call(methodNames.UPDATE, this);
    };

    return Encounter;
})();

