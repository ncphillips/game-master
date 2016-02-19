// No `var` makes it global in Meteor
StatusEffect = (function(){
    function StatusEffect(data) {
        data = data || {};

        this.__data__ = {};
        this.__data__.name = data.name || "<Effect>";
        this.__data__.description = data.description;
        this.__data__.stackable = data.stackable;
        this.__data__.rounds = data.rounds || 1;
        this.__data__.roundsLeft = data.roundsLeft || this.__data__.rounds;
    }

    StatusEffect.prototype.name = function(name){
        if (typeof name !== "undefined") {
            this.__data__.name = name;
        }
        return this.__data__.name;
    };

    StatusEffect.prototype.description = function(description){
        if (typeof description !== "undefined") {
            this.__data__.description = description;
        }
        return this.__data__.description;
    };

    StatusEffect.prototype.roundsLeft = function(roundsLeft){
        if (typeof roundsLeft !== "undefined") {
            this.__data__.roundsLeft = roundsLeft;
        }
        return this.__data__.roundsLeft;
    };

    StatusEffect.prototype.rounds = function(rounds){
        if (typeof rounds !== "undefined") {
            this.__data__.rounds = rounds;
        }
        return this.__data__.rounds;
    };

    StatusEffect.prototype.isStackable = function(stackable){
        if (typeof stackable !== "undefined") {
            this.__data__.stackable = stackable;
        }
        return this.__data__.stackable;
    };

    StatusEffect.prototype.equals = function (o) {
        if (!StatusEffect.prototype.isPrototypeOf(o)) {
            return false;
        }

        return this.getName() === o.getName();
    };

    return StatusEffect;
})();

// For accessing with Node
if(typeof module !== 'undefined') {
    module.exports = StatusEffect

}