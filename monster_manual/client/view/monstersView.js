Template.monstersView.helpers({
    abilityBonus: function(score){
        return Math.floor((score-10)/2);
    },
    sizeText: function(size){
        switch(size) {
            case "T": return "Tiny";
            case "S": return "Small";
            case "M": return "Medium";
            case "L": return "Large";
            case "H": return "Huge";
            case "G": return "Gargantuan";
        }
    },
    languageList: function(languages){
        if (languages) {
            return languages.join(", ");
        }
    },
    crumbs: function(){
        return {breadcrumbs: [
            {text: "Monster Manual", name: "monstersList"}
        ]};
    }
});