/**
 * Created by Lorenzo Matterhorn on 30.07.2015.
 */




function createPickUnit() {
    for (var i = 0; i < unitPickNumber; i++) {
        var pickMe = PIXI.Sprite.fromImage('pic/unit/pick/' + (i + 1) + '.png');
        pickMe.interactive = true;
        pickMe.buttonMode = true;
        pickMe.number = i;
        pickMe
            .on('click',selectUnit);
        pickMe.scale.set(unitPickScale);
        pickMe.position.x = pickPositions[2 * i];
        pickMe.position.y = pickPositions[2 * i + 1];
        pickMe.alpha = halfAlpha;
        unitToPick.addChild(pickMe);
    }
}

function selectUnit() {
    //console.log(unitToPick.children);
    //makes all pick unit unpicked
    for (var i = 0; i < unitPickNumber; i++) {
        if (unitToPick.children[i].selected && unitToPick.children[i] != this ) {
            unitToPick.children[i].alpha = halfAlpha;
            unitToPick.children[i].selected = false;
        }
    }
    // then when pick or unpick some
    if (!this.selected) {
        this.alpha = fullAlpha;
        this.selected = true;
        for (var j = 0; j < numberLines; j++) {
            //console.log(toPlaceHere.children);
            yourBasePlace.children[j].visible = true;
            enemyBasePlace.children[j].visible = true;
            switch (this.number) {
                case 0:
                    unitDescription.text = 'Blademaster. Simply fighter, trained parry enemy"s attack.\n And firebolls. Do not ask how...';
                    break;
                case 1:
                    unitDescription.text = 'Berserker. Pain makes him crazy.\n On low life gained bonus damage';
                    break;
                case 2:
                    unitDescription.text = 'Rogue. Like dirty games. Can evade\n attack & contrattack at once';
                    break;
                case 3:
                    unitDescription.text = 'Bowman. Strong range attack, but slow & can miss.\n No any attack animation. Just imagine that yourself';
                    break;
                case 4:
                    unitDescription.text = 'Energy-mant. Simply mage. Ignoring\n armor becouse... its a magic';
                    break;
                case 5:
                    unitDescription.text = 'Man-with-Shield. Run on enemy if see\n him & first attack deal doubledamage';
                    break;
                case 6:
                    unitDescription.text = 'Spiritual. Has heal aura, but not now...\n relax, its early pre-prealpha ';
                    break;
            }
        }

    }
    else {
        this.alpha = halfAlpha;
        this.selected = false;
        for (j = 0; j < numberLines; j++) {
            yourBasePlace.children[j].visible = false;
            enemyBasePlace.children[j].visible = false;
            unitDescription.text = ' ';
        }
    }
}

