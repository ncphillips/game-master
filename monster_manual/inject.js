monsterTemplateDbConnection = {
    findMonsters: function(query, page, pageSize){
        page = page || 0;
        pageSize = pageSize || 20;
        var options = {
            sort: {source: 1, page: 1},
            limit: pageSize,
            skip: page * pageSize
        };
        return MonsterTemplates.find(query, options).fetch();
    }
};
