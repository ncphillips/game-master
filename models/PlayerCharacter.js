// No `var` makes it global in Meteor
PlayerCharacter = (function() {
    "use strict";
    var CHARACTER_SIZES = {
        SMALL: "S",
        MEDIUM: "M",
        LARGE: "L"
    };

    var CHARACTER_ALIGNMENTS = {
        NN: "NN", NG: "NG", NE: "NE",
        CN: "CN", CG: "CG", CE: "CE",
        LN: "LN", LG: "LG", LE: "LE"
    };

    var CHARACTER_LANGUAGES = {
        COMMON: "Common"
    };

    var CHARACTER_TYPE = {
        HUMANOID: "Humanoid"
    };

    function PlayerCharacter(data) {
        this.__data__ = validatePlayerCharacterData(data || {});
    }

    PlayerCharacter.prototype.getName = function() {
        return this.__data__.name;
    };

    PlayerCharacter.prototype.addStatusEffect = function(statusEffect){
        this.__data__.statusEffects.push(statusEffect);

    };

    PlayerCharacter.prototype.getStatusEffects = function(){
        return this.__data__.statusEffects;
    };

    PlayerCharacter.prototype.hasStatusEffect = function(target){
        //for (var statusEffect in this.getStatusEffects()) {
        var effects = this.getStatusEffects();
        for (var i=0; i < effects.length; i++) {
            if (effects[i].equals(target)) {
                return true;
            }
        }

        return false;
    };

    // Private Functions
    function validatePlayerCharacterData(data) {
        var validData = {};
        validData.name = data.name || "<New Player Character>";
        validData.size = data.size || CHARACTER_SIZES.MEDIUM;
        validData.type = data.type || CHARACTER_TYPE.HUMANOID;

        validData.alignment = data.alignment || CHARACTER_ALIGNMENTS.NN;
        validData.languages = data.languages || [CHARACTER_LANGUAGES.COMMON];
        validData.telepathy = data.telepathy;

        validData.ac = data.ac || 10;
        validData.hp = data.hp || 8;
        validData.skills = data.skills || {};

        validData.abilities = {};
        if (data.abilities)
            validData.abilities = {
                str: data.abilities.str || 10,
                dex: data.abilities.dex || 10,
                con: data.abilities.con || 10,
                int: data.abilities.int || 10,
                wis: data.abilities.wis || 10,
                cha: data.abilities.cha || 10
            };

        if (data.savingThrows)
            validData.savingThrows = {
                str: data.savingThrows.str || 0,
                dex: data.savingThrows.dex || 0,
                con: data.savingThrows.con || 0,
                int: data.savingThrows.int || 0,
                wis: data.savingThrows.wis || 0,
                cha: data.savingThrows.cha || 0
            };

        validData.senses = {};
        if (data.senses)
            validData.senses = {
                passive: data.senses.passive || 10,
                blindsight: data.senses.blindsight,
                darkvision: data.senses.darkvision,
                tremorsense: data.senses.tremorsense,
                truesight: data.senses.truesight
            };

        validData.spellcasting = {};
        if (data.spellcasting)
            validData.spellcasting = {
                level_0: {known: data.spellcasting.level_0.known},
                level_1: { known: data.spellcasting.level_1.known, slots: data.spellcasting.level_1.slots },
                level_2: { known: data.spellcasting.level_2.known, slots: data.spellcasting.level_2.slots },
                level_3: { known: data.spellcasting.level_3.known, slots: data.spellcasting.level_3.slots },
                level_4: { known: data.spellcasting.level_4.known, slots: data.spellcasting.level_4.slots },
                level_5: { known: data.spellcasting.level_5.known, slots: data.spellcasting.level_5.slots },
                level_6: { known: data.spellcasting.level_6.known, slots: data.spellcasting.level_6.slots },
                level_7: { known: data.spellcasting.level_7.known, slots: data.spellcasting.level_7.slots },
                level_8: { known: data.spellcasting.level_8.known, slots: data.spellcasting.level_8.slots },
                level_9: { known: data.spellcasting.level_9.known, slots: data.spellcasting.level_9.slots },
                level_10: { known: data.spellcasting.level_10.known, slots: data.spellcasting.level_10.slots }
            };

        validData.damageAdjustments = {};
        if (data.damageAdjustments)
            validData.damageAdjustments = {
                immunities: data.damageAdjustments.immunities,
                vulnerabilities: data.damageAdjustments.vulnerabilities,
                resistance: data.damageAdjustments.resistance,
                conditionImmunities: data.damageAdjustments.conditionImmunities
            };

        validData.speed = {};
        if (data.speed)
            validData.speed = {
                walk: data.speed.walk || 30,
                fly: data.speed.fly,
                burrow: data.speed.burrow,
                climb: data.speed.climb,
                swim: data.speed.swim
            };

        validData.actions = [];
        if (data.actions)
            validData.actions = data.actions.map(function(action){
                return {name: action.name, text: action.text};
            });

        validData.qualities = data.qualities;
        validData.reactions = data.reactions;
        validData.max_hp = data.max_hp || validData.hp;
        validData.initiative = data.initiative;

        validData.campaign = data.campaign;
        validData.description = data.description;
        validData.background = data.background;

        validData.statusEffects = data.statusEffects || [];

        // Players
        validData.playerCharacter = data.playerCharacter;
        validData.type = data.type;
        validData.classLevel = data.classLevel;
        validData.race = data.race;

        // NPC or Monster Only
        validData.source = data.source;
        validData.page = data.page;
        validData.hd = data.hd;
        validData.cr = data.cr;
        validData.destroyAfterEncounter = data.destroyAfterEncounter;

        return validData;
    }

    return PlayerCharacter;
})();

// For accessing with node
if (module) {
    module.exports = PlayerCharacter;
}
