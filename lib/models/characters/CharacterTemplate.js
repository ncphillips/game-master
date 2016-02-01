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
