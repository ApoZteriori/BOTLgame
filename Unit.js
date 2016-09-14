/**
 * Created by Lorenzo Matterhorn on 30.07.2015.
 */

function createUnit(line, side) {
    //find selected pickUnit
    for (var i = 0; i < unitPickNumber; i++) {
        if (unitToPick.children[i].selected) {
            var unitNumber = i+1;
        }
    }

    var unit = PIXI.Sprite.fromImage('pic/unit/pick/'+unitNumber+'.png');
    unit.scale.set(unitFieldScale);
    unit.side = side;
    unit.position.y = UnitStartPositions[2 * line + 1];
    unit.line = line;
    unit.canMove = true;
    unit.id = battlefield.counter;
    unit.fighting = false;
    unit.ranged = false;
    // add properties of selected class to unit
    switch (unitNumber) {
        case 1:
            Warrior(unit);
            break;
        case 2:
            Berserk(unit);
            break;
        case 3:
            Rogue(unit);
            break;
        case 4:
            Bowyer(unit);
            break;
        case 5:
            Mage(unit);
            break;
        case 6:
            Horse(unit);
            break;
        case 7:
            Woundslicking(unit);
            break;
    }
    if (!changePts(-unit.pts, unit.side)) {
        return;
    }

    if (side == 'ally') {
        unit.position.x = UnitStartPositions[2 * line];
        //add this unit to special array
        //problem - on high bf.counter value loop will grown!!! - ??? what loop
        UnitCurrentPosition[unit.line].unshift(unit);
        //border of side
        var borderFrame = PIXI.Sprite.fromImage('pic/unit/pick/ally_border.png');
    }
    if (side == 'enemy') {
        unit.position.x = UnitStartPositions[2 * line] + fieldLineWidth - fieldLineHeight;
        UnitCurrentPosition[unit.line].push(unit);
        //border of side
        borderFrame = PIXI.Sprite.fromImage('pic/unit/pick/enemy_border.png');
    }

    //support texture options HP/BORDER/HEAL--------
    var healAura = PIXI.Sprite.fromImage('pic/unit/healAura.png');
    healAura.position.set(-130);
    var hp = new PIXI.Sprite(fullhp);
    hp.position.x = positionHP;
    hp.position.y = positionHP;
    hp.scale.set(hpScale);
    //--------------------------

    unit.move = function() {

        if (this.bashRange && this.lengthToTarget <= this.bashRange && !this.firstHitDone && this.nextUnit.side != this.side) {
            if (this.lengthToTarget - meleeRange < this.accelerateMoveSpeed) {
                this.moveSpeed = this.lengthToTarget - meleeRange;
            }
            else {
                this.moveSpeed = this.accelerateMoveSpeed;
            }
            this.buffBashAttack = true;
        }

        if (this.side == 'ally') {
            if (this.canMove) {
                this.position.x += this.moveSpeed;
            }

            if (this.position.x > fieldLeftTopX + fieldLineWidth - fieldDrawlineWidth / 2 - unitPicturesSize * unitFieldScale) {
                unit.die();
            }
        }
        if (this.side == 'enemy') {
            if (this.canMove) {
                this.position.x -= this.moveSpeed;
            }

            if (this.position.x < fieldLeftTopX + fieldDrawlineWidth / 2) {
                unit.die();
            }
        }
    };

    unit.attack = function(unit, target) {

        target.getDamage(unit);

        if (target.hp < 7/10 * target.maxhp) {target.children[1].texture = halfhp;}
        if (target.hp < 3/10 * target.maxhp) {target.children[1].texture = lowhp;}

        if (target.hp <= 0) {
            clearInterval(target.intervalID);
            clearInterval(unit.intervalID);
            target.die();
            unit.fighting = false;
            unit.canMove = true;
            changePts(target.pts - 1, unit.side);
        }
    };

    unit.getDamage = function(unit) {
        //disadwantage - perform ONLY 1 if from list

        var normalDamage = Math.floor(Math.random() * (unit.maxDamage - unit.minDamage + 1)) + unit.minDamage - this.armor;

        //PARRY
        if (this.parry && Math.random()*100 + 1  <= this.parry) {
            //no damage 10% chance

        }
        //RAGE increased rage damage
        else if (unit.rage && unit.hp < unit.maxhp / 4) {
            this.hp -= (Math.floor(Math.random() * (unit.maxDamage - unit.minDamage + 1)) + unit.minDamage)* unit.rage - target.armor;

        }
        //contrattack on evade
        else if (this.evasion && Math.random()*100 <= this.evasion) {
            this.hp -= normalDamage;
            specAttack++;
            //contrattack work only if unit fighting
            if (this.fighting) {
                unit.hp -= Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage - unit.armor;
            }
        }
        //MISS
        else if (unit.miss && Math.random()*100 + 1 >= this.miss) {
            this.hp -= normalDamage;
        }
        //Ignore Armor
        else if (unit.ignoreArmor) {
            this.hp -= Math.floor(Math.random() * (unit.maxDamage - unit.minDamage + 1)) + unit.minDamage;
        }
        //Bash damage
        else if (unit.bashRange && unit.buffBashAttack) {
            this.hp -= normalDamage * critX2;
            unit.buffBashAttack = false;
            unit.firstHitDone = true;
            unit.moveSpeed = 1;
        }

        else {
            this.hp -= normalDamage;
        }

        //debugg-----
        allAttack++;
        if (allAttack == 1000 || allAttack == 2000 || allAttack == 3000) {console.log((specAttack/allAttack) * 100)}
        //----------
    };

    unit.heal = function(value) {
        this.hp += value;
        if (this.hp > this.maxhp) {
            this.hp = this.maxhp;
        }
    };

    //delete unit from BF
    unit.die = function() {
        //find this unit in array
        for (var j = 0; j < UnitCurrentPosition[this.line].length; j++) {
            if (this.id == UnitCurrentPosition[this.line][j].id) {
                UnitCurrentPosition[this.line].splice(j, 1);
            }
        }
        battlefield.removeChild(this);
    };


    battlefield.addChild(unit);
    unit.addChild(borderFrame);
    unit.addChild(hp);

    if (unit.healRange) {
        unit.addChild(healAura);
        startHealAura();
    }



    battlefield.counter++;


    //index unreliable - often change
    //console.log(battlefield.getChildIndex(unit));
    //console.log(UnitCurrentPosition);
    //console.log(battlefield.children);
}
