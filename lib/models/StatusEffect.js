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
        return this.__data__.name;
    };

    StatusEffect.prototype.description = function(description){
        return this.__data__.description;
    };

    StatusEffect.prototype.roundsLeft = function(roundsLeft){
        return this.__data__.roundsLeft;
    };

    StatusEffect.prototype.rounds = function(rounds){
        return this.__data__.rounds;
    };

    StatusEffect.prototype.isStackable = function(){
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