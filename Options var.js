/**
 * Created by Lorenzo Matterhorn on 03.08.2015.
 */
//debugg options - not needed in release =)
var allAttack = 0;
var specAttack = 0;
//field draw options
var fieldLeftTopX = 100;
var fieldLeftTopY = 25;
var fieldLineWidth = 550;
var fieldLineHeight = 60;
var numberLines = 5;
var fieldDrawlineWidth = 4;
//options for unit pick & place

var unitPicturesSize = 100;
var unitPickScale = 0.5;
var unitFieldScale = 0.56;
var unitPickNumber = 7;
// alpha options
var fullAlpha = 1;
var halfAlpha = 0.5;
var barelyVisibleAlpha = 0.2;
//fight option
var meleeRange = unitPicturesSize * unitFieldScale;
var critX2 = 2;
//supported textures options
var positionHP = 7;
var hpScale = 2;
// array of pick coordinates
var pickPositions = [
    20, fieldLeftTopY,
    20, fieldLeftTopY + 55,
    20, fieldLeftTopY + 55 * 2,
    20, fieldLeftTopY + 55 * 3,
    20, fieldLeftTopY + 55 * 4,
    20, fieldLeftTopY + 55 * 5,
    20, fieldLeftTopY + 55 * 6
];
// array of unit coordinates on battlefield lines
var UnitStartPositions = [
    fieldLeftTopX + fieldDrawlineWidth / 2, fieldLeftTopY + fieldDrawlineWidth / 2,
    fieldLeftTopX + fieldDrawlineWidth / 2, fieldLeftTopY + fieldDrawlineWidth / 2 + fieldLineHeight,
    fieldLeftTopX + fieldDrawlineWidth / 2, fieldLeftTopY + fieldDrawlineWidth / 2 + fieldLineHeight * 2,
    fieldLeftTopX + fieldDrawlineWidth / 2, fieldLeftTopY + fieldDrawlineWidth / 2 + fieldLineHeight * 3,
    fieldLeftTopX + fieldDrawlineWidth / 2, fieldLeftTopY + fieldDrawlineWidth / 2 + fieldLineHeight * 4
];
//array for collision detect
var UnitCurrentPosition = [
    [],
    [],
    [],
    [],
    []
];
//PTS
var Ally_pts = 30;
var Enemy_pts = 30;

changePts = function(value, side) {
    if (side == 'ally' && Ally_pts + value >= 0) {
        Ally_pts += value;
        textAllyPts.text = Ally_pts;
        return true;
    }
    else if (side == 'enemy' && Enemy_pts + value >= 0) {
        Enemy_pts += value;
        textEnemyPts.text = Enemy_pts;
        return true;
    }
    else {
        textError.text = 'Need more pts';
        textError.alpha = 1;
        return false;
    }

};

//create class of unit - Warrior (simple)
//Blademaster
Warrior = function(unit) {
    unit.maxhp = unit.hp = 300;
    unit.minDamage = 30;
    unit.maxDamage = 50;
    unit.armor = 10;
    unit.attackSpeed = 1;
    unit.moveSpeed = 1;
    unit.range = meleeRange;
    unit.pts = 4;

    unit.parry = 10;// %
};
//Tolerain
Berserk = function(unit) {
    unit.maxhp = unit.hp = 300;
    unit.minDamage = 40;
    unit.maxDamage = 80;
    unit.armor = 10;
    unit.attackSpeed = 2;
    unit.moveSpeed = 0.9;
    unit.range = meleeRange;
    unit.pts = 5;

    unit.rage = 1.5;//when hp below 50% attack +20% (100% + 20%)
};
//Rat
Rogue = function(unit) {
    unit.maxhp = unit.hp = 250;
    unit.minDamage = 20;
    unit.maxDamage = 40;
    unit.armor = 15;
    unit.attackSpeed = 0.7;
    unit.moveSpeed = 1.1;
    unit.range = meleeRange;
    unit.pts = 7;

    unit.evasion = 5; //when evade attack - contrattack
};
//Arthelp
Bowyer = function(unit) {
    unit.maxhp = unit.hp = 300;
    unit.minDamage = 80;
    unit.maxDamage = 100;
    unit.armor = 5;
    unit.attackSpeed = 1.5;
    unit.moveSpeed = 1;
    unit.ranged = true;
    unit.range = 200;
    unit.pts = 10;

    unit.miss = 5;//%
};
//Ignismant
Mage = function(unit) {
    unit.maxhp = unit.hp = 300;
    unit.minDamage = 60;
    unit.maxDamage = 80;
    unit.armor = 5;
    unit.attackSpeed = 1.5;
    unit.moveSpeed = 1;
    unit.ranged = true;
    unit.range = 150;
    unit.pts = 12;

    unit.ignoreArmor = true;
};
//Basher
Horse = function(unit) {
    unit.maxhp = unit.hp = 300;
    unit.minDamage = 60;
    unit.maxDamage = 80;
    unit.armor = 5;
    unit.attackSpeed = 1.5;
    unit.moveSpeed = 1;
    unit.range = meleeRange;
    unit.accelerateMoveSpeed = 10;
    unit.pts = 15;

    unit.bashRange = 250;//px
};
//Spiritual
Woundslicking = function(unit) {
    unit.maxhp = unit.hp = 300;
    unit.minDamage = 50;
    unit.maxDamage = 80;
    unit.armor = 10;
    unit.attackSpeed = 1.5;
    unit.moveSpeed = 1;
    unit.range = meleeRange;
    unit.pts = 20;

    unit.healValue = 10;
    unit.healRange = 150;//px
};
