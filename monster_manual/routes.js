Router.route('/monsters', { name: 'monstersList' });

Router.route('/monsters/:name', {
    name: 'monstersView',
    data: function () {
        var name = this.params.name;
        var query = {name: name.replace('_', ' ')};
        return MonsterTemplates.findOne(query);
    }
});
