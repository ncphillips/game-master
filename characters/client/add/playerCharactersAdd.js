Template.playerCharactersAdd.helpers({
    playersInCampaign: function(){
        return CampaignMembershipCollection.findPlayersInCampaign(this.campaign);
    },
    crumbs: function(){
        if (this.campaign){
            var campaignId = this.campaign.id();
            var text = this.campaign.name();
            return {
                breadcrumbs: [{
                    text: "Campaigns",
                    name: "campaignsList",
                    data: {}
                }, {
                    text: text,
                    name: "campaignsView",
                    data: {campaignId: campaignId}
                }, {
                    text: "Player Characters",
                    name: "playerCharactersList",
                    data: {campaignId: campaignId}
                }]
            };
        } else {
            return [];
        }
    }
});

Template.playerCharactersAdd.events({
    "click .add-player-character": function(e){
        e.preventDefault();

        var urlParams = Router.current().params;
        var name =  $("#name").val();
        var hpMax = $("#hp-max").val();

        if (!(hpMax && name)) {
            alert("Missing Name or HP");
            return;
        }

        var playerCharacter = new PlayerCharacter({
            name: name,
            player: $('#character-player :selected').val(),
            classLevel: $("#character-class-level").val(),
            race: $("#character-race").val(),
            max_hp: hpMax,
            hp: hpMax,
            playerCharacter: true,
            size: $("#size").val(),
            ac: $("#ac").val(),
            abilities: {
                abr: $("#ab_str").val(),
                dex: $("#ab_dex").val(),
                con: $("#ab_con").val(),
                wis: $("#ab_wis").val(),
                int: $("#ab_int").val(),
                cha: $("#ab_cha").val()
            },
            savingThrows: {
                str: $("#st_str").val(),
                dex: $("#st_dex").val(),
                con: $("#st_con").val(),
                wis: $("#st_wis").val(),
                int: $("#st_int").val(),
                cha: $("#st_cha").val()
            },
            speed: {
                walk: $("#speed_walk").val(),
                burrow: $("#speed_burrow").val(),
                climb: $("#speed_climb").val(),
                fly: $("#speed_fly").val(),
                swim: $("#speed_swim").val()
            },
            senses: {
                passive: $("#senses_passive").val(),
                darkvision: $("#senses_darkvision").val(),
                tremorsense: $("#senses_tremorsense").val(),
                blindsight: $("#senses_blindsight").val(),
                truesight: $("#senses_truesight").val()
            },
            campaign: urlParams.campaignId,
            description: $("#character-description").val(),
            background: $("#character-background").val()
        });

        PlayerCharacterCollection.save(playerCharacter, function(id){
            var campaignId = Router.current().params.campaignId;
            Router.go('playerCharactersView', {campaignId: campaignId, playerCharacterId: id});
        });

    }
});
