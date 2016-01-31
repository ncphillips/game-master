Meteor.publish("monsterTemplates", function(){
    if (this.userId) {
        return MonsterTemplates.find({});
    } else {
        this.ready();
    }
});