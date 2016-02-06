Router.route('/campaigns/:campaignId/encounters', {
    name: 'encountersList',
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId),
            encounters: EncounterCollection.findByCampaign(this.params.campaignId)
        };
    }
});

Router.route('/campaigns/:campaignId/encounters/add', {
    name: 'encountersAdd',
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId)
        };
    }
});

Router.route('/campaigns/:campaignId/encounters/:encounterId', {
    name: 'encountersView',
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId),
            encounter: EncounterCollection.findById(this.params.encounterId, {campaign: this.params.campaignId})
        };
    }
});

Router.route('/campaigns/:campaignId/encounters/:encounterId/run', {
    name: 'encountersRun',
    onBeforeAction: function(){
        var encounter = EncounterCollection.findById(this.params.encounterId);
        if (encounter && encounter.status() === ENCOUNTER_STATUSES.IN_PROGRESS) {
            this.next();
        } else {
            this.redirect('encountersView', this.params);
        }
    },
    data: function(){
        return {
            campaign: CampaignCollection.findById(this.params.campaignId),
            encounter: EncounterCollection.findById(this.params.encounterId)
        };
    }
});
