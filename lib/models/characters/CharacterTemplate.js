if (typeof module !== 'undefined') {
    BaseCharacter = require('./BaseCharacter');
    $ = require("lodash");
}
// No `var` makes it global in Meteor
CharacterTemplate = (function() {
    "use strict";
    function CharacterTemplate(data) {
        BaseCharacter.call(this, data);
        this.__data__ = $.extend(this.__data__, validateCharacterTemplateData(data || {}));
    }

    CharacterTemplate.prototype = Object.create(BaseCharacter.prototype);
    CharacterTemplate.prototype.constructor = CharacterTemplate;

    CharacterTemplate.prototype.source = function(){
        return this.__data__.source;
    };

    CharacterTemplate.prototype.page = function(){
        return this.__data__.page;
    };

    CharacterTemplate.prototype.hd= function(){
        return this.__data__.hd;
    };

    CharacterTemplate.prototype.cr= function(){
        return this.__data__.cr;
    };



    // Private Functions
    function validateCharacterTemplateData(data) {
        var validData = {};

        validData.source = data.source;
        validData.page = data.page;
        validData.hd = data.hd;
        validData.cr = data.cr;

        return validData;
    }

    return CharacterTemplate;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = CharacterTemplate;
}
