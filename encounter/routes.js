Router.route('/campaigns/:campaignId/encounters', {
    name: 'encountersList',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId),
            encounters: Encounters.find({campaign: this.params.campaignId}).fetch()
        };
    }
});

Router.route('/campaigns/:campaignId/encounters/add', {
    name: 'encountersAdd',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId)
        };
    }
});

Router.route('/campaigns/:campaignId/encounters/:encounterId', {
    name: 'encountersView',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId),
            encounter: Encounters.findOne(this.params.encounterId, {campaign: this.params.campaignId})
        };
    }
});

Router.route('/campaigns/:campaignId/encounters/:encounterId/run', {
    name: 'encountersRun',
    onBeforeAction: function(){
        var encounter = Encounters.findOne(this.params.encounterId, {campaign: this.params.campaignId});
        if (encounter.status === 'In Progress') {
            this.next();
        } else {
            this.redirect('encountersView', this.params);
        }
    },
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId),
            encounter: Encounters.findOne(this.params.encounterId, {campaign: this.params.campaignId})
        };
    }
});
