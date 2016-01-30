"use strict";

var should = require("should");
var PlayerCharacter = require("../../models/PlayerCharacter");
var StatusEffect = require("../../models/StatusEffect");

describe("PlayerCharacters", function() {
    var data = { "name": "Thorgon" };

    describe("new characters", function() {
       it("should have a name", function() {
           var playerCharacter = new PlayerCharacter(data);

           playerCharacter.getName().should.equal(data.name);
       });

        it("should have no status effects", function(){
            var playerCharacter = new PlayerCharacter(data);

            playerCharacter.getStatusEffects().length.should.equal(0);
        });
    });

    describe("adding status effects ", function(){
        it("should add the effect to the player", function(){
            var playerCharacter = new PlayerCharacter(data);
            var statusEffect = new StatusEffect();

            playerCharacter.addStatusEffect(statusEffect);

            playerCharacter.hasStatusEffect(statusEffect).should.be.true();
        });
    });

});




