Router.configure({
    layoutTemplate: 'base'
});

Router.onBeforeAction(function loggedIn(){
    if(!Meteor.userId()) {
        this.redirect('/');
    } else {
        this.next();
    }
}, {except: ['homepage']});

Router.route('/', { name: 'homepage' });




