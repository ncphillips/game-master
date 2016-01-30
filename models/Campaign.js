var Campaign = (function() {
    // Constructor
    function Campaign(name) {
        this.name = name;


        var privateVars = {
            isRunning: true,
            playerCharacters: []
        };

        this.isRunning = isRunning.bind(this, privateVars);
        this.endCampaign = endCampaign.bind(this, privateVars);
        this.getPlayerCharacters = getPlayerCharacters.bind(this, privateVars);
        this.addPlayerCharacter = addPlayerCharacter.bind(this, privateVars);
    }

    // Methods Using Private Variables
    function isRunning(p) {
        return p.isRunning;
    }

    function endCampaign(p) {
        p.isRunning = false;
    }

    function getPlayerCharacters(p) {
        return p.playerCharacters;
    }

    function addPlayerCharacter(p, playerCharacter) {
        p.playerCharacters.push(playerCharacter);
    }


    // Static Methods
    function createCampaign(name) {
        if (!name)
            throw new Error("A campaign must have a name");

        return new Campaign(name);
    }

    // Static API
    return {
        create: createCampaign
    };
})();

if (module) {
    module.exports = Campaign;
}
