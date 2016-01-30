"use strict";

var should = require("should");
var Campaign = require("../models/Campaign");
var PlayerCharacter = require("../models/PlayerCharacter");

describe("PlayerCharacters", function() {
    describe("new characters", function() {
       it("should have a name", function() {
           var data = { "name": "Thorgon" };
           var playerCharacter = PlayerCharacter.create(data);

           playerCharacter.getName().should.equal(data.name);
       });
    });

});




