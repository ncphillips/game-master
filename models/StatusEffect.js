// No `var` makes it global in Meteor
StatusEffect = (function(){
    function StatusEffect(data) {

    }

    return StatusEffect;
})();

// For accessing with Node
if(module){
    module.exports = StatusEffect
}