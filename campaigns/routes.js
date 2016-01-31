Router.route("/campaigns", {
    name:"campaignsList",
    data: function(){
        console.log("Asdfasdfafasd");
        return {
            campaigns: CampaignCollection.findAll()
        };
    }
});

Router.route("/campaigns/add", {name: "campaignsAdd"});

Router.route("/campaigns/:campaignId", {
    name: "campaignsView",
    data: function () {
        return {
            campaign: CampaignCollection.findById(this.params.campaignId)
        };
    }
});

