Meteor.publish("playerCharacters", function(){
    if (this.userId) {
        return _db.playerCharacters.find();
    } else {
        this.ready();
    }
});