Meteor.publish("monsterTemplates", function(){
    if (this.userId) {
        return MonsterTemplates.find({source: "A MM"});
    } else {
        this.ready();
    }
});