Template.navbar.helpers({
   currentRouteIs: function(routeName){
       return Router.current().route.getName().indexOf(routeName) === 0;
   }
});
