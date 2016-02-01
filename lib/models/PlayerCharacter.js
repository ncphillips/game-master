// No `var` makes it global in Meteor
PlayerCharacter = (function() {
    "use strict";
    var CHARACTER_SIZES = {
        TINY: "T",
        SMALL: "S",
        MEDIUM: "M",
        LARGE: "L",
        GARGANTUAN: "G"
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
        BaseCharacter.call(this, data);
        this.__data__ = $.extend(this.__data__, validatePlayerCharacterData(data || {}));
    }

    PlayerCharacter.prototype.constructor = Object.create(BaseCharacter.prototype);

    PlayerCharacter.prototype.getId = function(){
        return this.__data__._id;
    };

    PlayerCharacter.prototype.getName = function() {
        return this.__data__.name;
    };

    PlayerCharacter.prototype.getSize = function() {
        return this.__data__.size;
    };
    PlayerCharacter.prototype.setSize = function(size) {
        /** Compare against CHARACTER_SIZE */
        this.__data__.size = size;
    };

    PlayerCharacter.prototype.getAc = function(){
        return this.__data__.ac;
    };

    PlayerCharacter.prototype.getInitiative = function() {
        return this.__data__.initiative;
    };

    PlayerCharacter.prototype.getHp = function(){
        return this.__data__.hp;
    };

    PlayerCharacter.prototype.getAbilities = function(){
        return this.__data__.abilities;
    };

    PlayerCharacter.prototype.getSavingThrows= function(){
        return this.__data__.savingThrows;
    };

    PlayerCharacter.prototype.getActions= function(){
        return this.__data__.actions;
    };

    PlayerCharacter.prototype.getLanguages = function(){
        return this.__data__.languages;
    };

    PlayerCharacter.prototype.getDamageAdjustments = function(){
        return this.__data__.damageAdjustments;
    };

    PlayerCharacter.prototype.getSenses= function(){
        return this.__data__.senses;
    };

    PlayerCharacter.prototype.addStatusEffect = function(statusEffect){
        if (this.hasStatusEffect(statusEffect) && !statusEffect.isStackable()) {
            return;
        }
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
if(typeof module !== 'undefined') {
    module.exports = PlayerCharacter;
}
