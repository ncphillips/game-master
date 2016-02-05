Meteor.publish("encounters", function(){
    var userId = this.userId;
    if (userId) {
        return _db.encounters.find();
        //return _db.encounters.find({
        //    $or: [
        //        { creator: userId },
        //        { dungeonMaster: userId },
        //        { players: userId }
        //    ]
        //});
    } else {
        this.ready();
    }
});
