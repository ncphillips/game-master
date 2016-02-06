CHARACTER_SIZES = function() {
    return {
        TINY: "T",
        SMALL: "S",
        MEDIUM: "M",
        LARGE: "L",
        GARGANTUAN: "G"
    };
};

CHARACTER_ALIGNMENTS = function() {
    return {
        NN: "NN", NG: "NG", NE: "NE",
        CN: "CN", CG: "CG", CE: "CE",
        LN: "LN", LG: "LG", LE: "LE"
    };
};

CHARACTER_LANGUAGES = function() {
    return {
        COMMON: "Common"
    };
};

CHARACTER_TYPE = function() {
    return {
        HUMANOID: "Humanoid"
    };
};

// No `var` makes it global in Meteor
BaseCharacter = (function() {
    "use strict";


    function BaseCharacter(data) {
        this.__data__ = validateData(data || {});
    }

    BaseCharacter.prototype.id = function(){
        return this.__data__._id;
    };

    BaseCharacter.prototype.name = function() {
        return this.__data__.name;
    };

    BaseCharacter.prototype.size = function(size) {
        if (typeof size !== "undefined") {
            this.__data__.size = size;
        }
        return this.__data__.size;
    };

    BaseCharacter.prototype.ac = function(){
        return this.__data__.ac;
    };

    BaseCharacter.prototype.initiative = function(initiative) {
        if (typeof initiative !== "undefined") {
            this.__data__.initiative = initiative-0;
        }
        return this.__data__.initiative;
    };

    BaseCharacter.prototype.isPlayerCharacter = function(){
        return this.__data__.isPlayerCharacter || this.__data__.playerCharacter;
    };

    BaseCharacter.prototype.hp = function(hp){
        if (typeof hp !== "undefined") {
            if (hp >= this.max_hp()) {
                hp = this.max_hp();
            } else if (hp < 0) {
                hp = 0;
            }
            this.__data__.hp = hp;
        }
        return this.__data__.hp;
    };

    BaseCharacter.prototype.max_hp = function(max_hp){
        if (typeof max_hp !== "undefined") {
            this.__data__.max_hp = max_hp;
        }
        return this.__data__.max_hp;
    };

    BaseCharacter.prototype.abilities = function(){
        return this.__data__.abilities;
    };

    BaseCharacter.prototype.savingThrows= function(){
        return this.__data__.savingThrows;
    };

    BaseCharacter.prototype.actions= function(){
        return this.__data__.actions;
    };

    BaseCharacter.prototype.languages = function(){
        return this.__data__.languages;
    };

    BaseCharacter.prototype.damageAdjustments = function(){
        return this.__data__.damageAdjustments;
    };

    BaseCharacter.prototype.senses= function(){
        return this.__data__.senses;
    };

    BaseCharacter.prototype.alignment = function(){
        return this.__data__.alignment;
    };

    BaseCharacter.prototype.type = function(){
        return this.__data__.type;
    };

    BaseCharacter.prototype.addStatusEffect = function(statusEffect){
        if (this.hasStatusEffect(statusEffect) && !statusEffect.isStackable()) {
            return;
        }
        this.__data__.statusEffects.push(statusEffect.__data__);

    };

    BaseCharacter.prototype.statusEffects = function(){
        return this.__data__.statusEffects.map(function(data){
            return new StatusEffect(data);
        });
    };

    BaseCharacter.prototype.hasStatusEffect = function(target){
        //for (var statusEffect in this.getStatusEffects()) {
        var effects = this.statusEffects();
        //for (var i=0; i < effects.length; i++) {
        //    if (effects[i].equals(target)) {
        //        return true;
        //    }
        //}

        return false;
    };

    BaseCharacter.prototype.dealDamage = function(damage){
        this.hp(this.hp() - damage);
    };

    // Private Functions
    function validateData(data) {
        var validData = {};
        if (data._id)
            validData._id = data._id;
        validData.name = data.name || "<New Player Character>";
        validData.size = data.size || CHARACTER_SIZES().MEDIUM;
        validData.type = data.type || CHARACTER_TYPE().HUMANOID;

        validData.alignment = data.alignment || CHARACTER_ALIGNMENTS().NN;
        validData.languages = data.languages || [CHARACTER_LANGUAGES().COMMON];
        validData.telepathy = data.telepathy;

        validData.ac = data.ac || 10;
        validData.hp = data.hp;
        validData.max_hp = data.max_hp;
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

        //validData.spellcasting = {};
        //if (data.spellcasting)
        //    validData.spellcasting = {
        //        level_0: {known: data.spellcasting.level_0.known},
        //        level_1: { known: data.spellcasting.level_1.known, slots: data.spellcasting.level_1.slots },
        //        level_2: { known: data.spellcasting.level_2.known, slots: data.spellcasting.level_2.slots },
        //        level_3: { known: data.spellcasting.level_3.known, slots: data.spellcasting.level_3.slots },
        //        level_4: { known: data.spellcasting.level_4.known, slots: data.spellcasting.level_4.slots },
        //        level_5: { known: data.spellcasting.level_5.known, slots: data.spellcasting.level_5.slots },
        //        level_6: { known: data.spellcasting.level_6.known, slots: data.spellcasting.level_6.slots },
        //        level_7: { known: data.spellcasting.level_7.known, slots: data.spellcasting.level_7.slots },
        //        level_8: { known: data.spellcasting.level_8.known, slots: data.spellcasting.level_8.slots },
        //        level_9: { known: data.spellcasting.level_9.known, slots: data.spellcasting.level_9.slots },
        //        level_10: { known: data.spellcasting.level_10.known, slots: data.spellcasting.level_10.slots }
        //    };

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
        data.actions = data.actions || [];
        validData.actions = data.actions.map(function(action){
            return {name: action.name, text: action.text};
        });

        validData.qualities = data.qualities;
        validData.reactions = data.reactions;
        validData.initiative = data.initiative;

        validData.campaign = data.campaign;
        validData.description = data.description;
        validData.background = data.background;

        validData.statusEffects = data.statusEffects || [];

        return validData;
    }

    return BaseCharacter;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = BaseCharacter;
}
