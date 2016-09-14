/**
 * Created by Lorenzo Matterhorn on 30.07.2015.
 */

function createYourPlace() {
    for (var i = 0; i < numberLines; i++) {
        var place = PIXI.Sprite.fromImage('pic/field/rightPlace.png');
        place.interactive = true;
        place.buttonMode = true;
        place
            .on('click', placeHere)
            .on('mouseover',beLighter)
            .on('mouseout',beDarker);

        place.scale.set(unitFieldScale);
        place.position.x = fieldLeftTopX + fieldDrawlineWidth / 2;
        place.position.y = fieldLeftTopY + fieldDrawlineWidth / 2 + fieldLineHeight * i;
        place.alpha = barelyVisibleAlpha;
        place.visible = false;
        place.id = i;
        place.side = 'ally';

        yourBasePlace.addChild(place);
    }
}

function createEnemyPlace() {
    for (var i = 0; i < numberLines; i++) {
        var place = PIXI.Sprite.fromImage('pic/field/rightPlace.png');
        place.interactive = true;
        place.buttonMode = true;
        place
            .on('click', placeHere)
            .on('mouseover', beLighter)
            .on('mouseout', beDarker);

        place.scale.set(unitFieldScale);
        place.position.x = fieldLeftTopX + fieldLineWidth - fieldLineHeight + fieldDrawlineWidth / 2;
        place.position.y = fieldLeftTopY + fieldDrawlineWidth / 2 + fieldLineHeight * i;
        place.alpha = barelyVisibleAlpha;
        place.visible = false;
        place.id = i;
        place.side = 'enemy';

        enemyBasePlace.addChild(place);
    }
}

function beLighter() {
    this.alpha = fullAlpha;
}
function beDarker() {
    this.alpha = barelyVisibleAlpha;
}
function placeHere() {
    var canCreate = true;
    if (battlefield.children[0]) {
        for (var i = 0; i < battlefield.children.length; i++) {
            //through all units watch - do they located on rightPlaces?
            if(battlefield.children[i].line == this.id)  {
                if ((this.side == 'ally' && battlefield.children[i].position.x > fieldLeftTopX + fieldLineHeight + fieldDrawlineWidth / 2)||
                    (this.side == 'enemy' && battlefield.children[i].position.x < fieldLeftTopX + fieldLineWidth - fieldLineHeight * 2 + fieldDrawlineWidth / 2)) {
                    canCreate = canCreate && true;
                }
                else {
                    canCreate = canCreate && false;
                }
            }

        }
        if (canCreate) {
            createUnit(this.id, this.side);
        }
    }
    else{
        createUnit(this.id, this.side);
    }

}
