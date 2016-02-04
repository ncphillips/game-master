Meteor.publish("encounters", function(){
    var userId = this.userId;
    if (userId) {
        return Encounters.find({
            $or: [
                { creator: userId },
                { dungeonMaster: userId },
                { players: userId }
            ]
        });
    } else {
        this.ready();
    }
});
