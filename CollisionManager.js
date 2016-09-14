/**
 * Created by Lorenzo Matterhorn on 03.08.2015.
 */

//update array of unit x.coordinates

checkCoordinates = function(unit) {
    var Line = UnitCurrentPosition[unit.line];
    for (var j = 0; j < Line.length; j++) {
        if (unit.id == Line[j].id) {

            if (unit.side == 'ally' && Line[j + 1]) {
                var nextUnit = Line[j + 1];
                if (!unit.ranged && nextUnit.side != unit.side) {
                    var target = nextUnit;
                }
                else if (unit.ranged) {
                    for (var k = j; k < Line.length; k++) {
                        if (Line[k].side != unit.side) {
                            target = Line[k];
                            break;
                        }
                    }
                }
                unit.canMove = !(nextUnit.position.x - unit.position.x <= meleeRange || (target && target.position.x - unit.position.x < unit.range));
                unit.lengthToTarget = nextUnit.position.x - unit.position.x;
                if (!unit.fighting && !unit.canMove && (target && target.position.x - unit.position.x < unit.range)) {
                    startFight(unit, target);
                }
                //test
                if (unit.bashRange) {
                    unit.nextUnit = nextUnit;
                }

            }

            if (unit.side == 'enemy' && j > 0) {
                nextUnit = Line[j - 1];
                if (!unit.ranged && nextUnit.side != unit.side) {
                    target = nextUnit;
                }
                else {
                    //update??
                    for (k = j; k >= 0; k--) {
                        if (Line[k].side != unit.side) {
                            target = Line[k];
                            break;
                        }
                    }
                }
                unit.canMove = !(unit.position.x - nextUnit.position.x <= meleeRange || (target && unit.position.x - target.position.x < unit.range));
                unit.lengthToTarget = unit.position.x - nextUnit.position.x;

                if (!unit.fighting && !unit.canMove && (target && unit.position.x - target.position.x < unit.range)) {
                    startFight(unit, target);

                }
                //test
                if (unit.bashRange) {
                    unit.nextUnit = nextUnit;
                }

            }

        }
    }
};

