// No `var` makes it global in Meteor
StatusEffect = (function(){
    function StatusEffect(data) {
        data = data || {};

        this.name = data || "<Effect>";
        this.stackable = data.stackable;
        this.rounds = data.rounds || 1;
        this.roundsLeft = this.rounds;
    }

    StatusEffect.prototype.canStack = function(){
        return this.stackable;
    };

    StatusEffect.prototype.equals = function (o) {
        if (!StatusEffect.prototype.isPrototypeOf(o)) {
            return false;
        }

        return this.name === o.name;
    };

    return StatusEffect;
})();

// For accessing with Node
if(module){
    module.exports = StatusEffect
}