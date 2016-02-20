"use strict";

var should = require("should");
// Todo: Configure mocha to not need relative paths
var PlayerCharacter = require("../../lib/models/characters/PlayerCharacter");
var StatusEffect = require("../../lib/models/StatusEffect");

describe("PlayerCharacters", function() {
    var data = { "name": "Thorgon" };

    describe("new characters", function() {
       it("should have a name", function() {
           var playerCharacter = new PlayerCharacter(data);

           playerCharacter.name().should.equal(data.name);
       });

        it("should have no status effects", function(){
            var playerCharacter = new PlayerCharacter(data);

            playerCharacter.statusEffects().length.should.equal(0);
        });
    });

    describe("adding status effects ", function(){
        it("should add the effect to the player", function(){
            var playerCharacter = new PlayerCharacter(data);
            var statusEffect = new StatusEffect();

            playerCharacter.addStatusEffect(statusEffect);

            playerCharacter.hasStatusEffect(statusEffect).should.be.true();
        });

        it("should add a second copy of a stackable effect", function(){
            // todo: don't use `new PlayerCharacter(data)` with a local `createStatusEffectContainer` because it can work on many things.
            var playerCharacter = new PlayerCharacter(data);
            var statusEffect = new StatusEffect({ name: "irellevant", stackable: true });
            // todo: StatusEffect.createStackable({});
            // todo: Object Mother pattern

            playerCharacter.addStatusEffect(statusEffect);
            playerCharacter.addStatusEffect(statusEffect);

            playerCharacter.statusEffects().length.should.equal(2);
        });

        it("should not add a second copy of a non-stackable effect", function(){
            var playerCharacter = new PlayerCharacter(data);
            var statusEffect = new StatusEffect({ name: "irrelevant", stackable: true });

            playerCharacter.addStatusEffect(statusEffect);
            playerCharacter.addStatusEffect(statusEffect);

            playerCharacter.statusEffects().length.should.equal(1);
        })
    });

});




