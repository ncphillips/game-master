Meteor.publish("characters", function(){
    if (this.userId) {
        return Characters.find();
    } else {
        this.ready();
    }
});