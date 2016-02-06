Meteor.publish("monsterTemplates", function(){
    if (this.userId) {
        return MonsterTemplates.find({$or: [{source: "A MM"}, {creator: this.userId}]});
    } else {
        this.ready();
    }
});