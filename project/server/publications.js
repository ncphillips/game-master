Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({}, {_id: 1, "emails.address": 1});
    } else {
        this.ready();
    }
});



