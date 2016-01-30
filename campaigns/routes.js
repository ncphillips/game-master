Router.route("/campaigns", {
    name:"campaignsList",
    data: function(){
        console.log("Asdfasdfafasd");
        return {
            campaigns: campaigns.findAll()
        };
    }
});

Router.route("/campaigns/add", {name: "campaignsAdd"});

Router.route("/campaigns/:campaignId", {
    name: "campaignsView",
    data: function () {
        return {
            campaign: Campaigns.find(this.params.campaignId).fetch()[0]
        };
    }
});

