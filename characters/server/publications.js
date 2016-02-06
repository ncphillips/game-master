Meteor.publish("characters", function(){
    if (this.userId) {
        return _db.characters.find();
    } else {
        this.ready();
    }
});