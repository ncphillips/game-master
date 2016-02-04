function generateMonsters(generator){
    var monsterIds = [];
    var monster;
    var monsterTemplate;
    for (var i=1; i <= generator.count; i++) {
        monsterTemplate = MonsterTemplates.findOne({name: generator.monsterName});
        monster = $.extend({}, monsterTemplate, {name: [monsterTemplate.name, i].join(" ")});
        delete monster._id;
        if (monster.hd) {
            //monster.hp = rollHitDie(monster.hd);
        }
        monster.max_hp = monster.hp;
        monster.initiative = rollD20(monster.abilities.str);
        monster.playerCharacater = false;
        monster.destroyAfterEncounter = true;
        monsterIds.push(Characters.insert(monster));
    }
    return monsterIds;
}
