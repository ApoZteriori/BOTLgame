/**
 * Created by Lorenzo Matterhorn on 10.08.2015.
 */
startFight = function(unit, target) {
    unit.fighting = true;
    //first attack is played immediately
    unit.attack(unit, target);
    //then special timer restart this func every attackSpeed time
    unit.intervalID = setInterval(function() {unit.attack(unit, target)},unit.attackSpeed * 1000)
};

startHealAura = function() {
    //if NOT fight start aura work

    if (!this.fighting) {
        this.children[2].visible = true;
        this.healIntervalID = setInterval(function() {

            this.heal(this.healValue);
            //find ally unit in range
            for (var i = 0; i < battlefield.children.length; i++) {
                var someUnit = battlefield.children[i];
                //calc range this - someUnit
                var range = Math.sqrt(Math.pow(this.position.x - someUnit.position.x) + Math.pow(this.position.y - someUnit.position.y));
                if (range < this.healRange) {
                    someUnit.heal(this.healValue)
                }
            }

        }, 1000)
    }
    else {
        clearInterval(this.healIntervalID);
        this.children[2].visible = false;
    }

};