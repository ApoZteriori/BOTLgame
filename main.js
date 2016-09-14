var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);


// create the root of the scene graph
var stage = new PIXI.Container();

/*
var startMenuContainer = new PIXI.Container();
var menuBG = PIXI.Sprite.fromImage('pic/field/menuBG.jpg');
menuBG.width = window.innerWidth;
menuBG.height = window.innerHeight;
startMenuContainer.addChild(menuBG);
*/

//container for dynamic/statical elements
var dynamic = new PIXI.Container();
var statical = new PIXI.Container();
// container for all unit on battlefield
var battlefield = new PIXI.Container();
var unitToPick = new PIXI.Container();
var yourBasePlace = new PIXI.Container();
var enemyBasePlace = new PIXI.Container();
var drawField = new PIXI.Container();
var testEvent = new PIXI.Container();


stage.addChild(dynamic);
stage.addChild(statical);
statical.addChild(drawField);
statical.addChild(battlefield);
dynamic.addChild(unitToPick);
dynamic.addChild(yourBasePlace);
dynamic.addChild(enemyBasePlace);
dynamic.addChild(testEvent);

battlefield.counter = 0;

//texture for HP indicator
var fullhp = PIXI.Texture.fromImage('pic/unit/hp/hp1.png');
var halfhp = PIXI.Texture.fromImage('pic/unit/hp/hp2.png');
var lowhp = PIXI.Texture.fromImage('pic/unit/hp/hp3.png');
//------------------------------------

//text for description of unit
var unitDescription = new PIXI.Text(' ', { font: '20px Snippet', fill: 'white', align: 'left' });
unitDescription.position.set(fieldLeftTopX, 400);
dynamic.addChild(unitDescription);
var textAllyPts = new PIXI.Text(Ally_pts, { font: '30px Snippet', fill: 'orange', align: 'left'});
textAllyPts.position.set(fieldLeftTopX, 340);
dynamic.addChild(textAllyPts);
var textEnemyPts = new PIXI.Text(Enemy_pts, { font: '30px Snippet', fill: 'purple', align: 'left' });
textEnemyPts.position.set(fieldLeftTopX + fieldLineWidth - unitPicturesSize * unitFieldScale, 340);
dynamic.addChild(textEnemyPts);
var textError = new PIXI.Text(' ', { font: '30px Snippet', fill: 'red', align: 'left' });
textError.position.set(fieldLeftTopX + 50, 340);
textError.alpha = 0;
dynamic.addChild(textError);
//------------------------------------

//draw fight field-------------
var field = new PIXI.Graphics();
field.lineStyle(fieldDrawlineWidth, 0xffd900, 1);
for (var i = 0; i < numberLines; i++) {
    field.drawRect(fieldLeftTopX, fieldLeftTopY + fieldLineHeight * i, fieldLineWidth, fieldLineHeight);
}
field.drawRect(fieldLeftTopX, fieldLeftTopY, fieldLineHeight, fieldLineHeight * numberLines);
field.drawRect(fieldLeftTopX + fieldLineWidth - fieldLineHeight, fieldLeftTopY, fieldLineHeight, fieldLineHeight * numberLines);
drawField.addChild(field);
//------------------------------

//create some event button (to debugg)-------
//var someEvent = PIXI.Sprite.fromImage('pic/some_event.png');
//someEvent.position.x = 450;
//someEvent.position.y = 400;
//someEvent.interactive = true;
//someEvent.buttonMode = true;
//someEvent
//    .on('click', getSomeEvent);
//
//testEvent.addChild(someEvent);
//
//function getSomeEvent() {
//    battlefield.stop();
//    //battlefield.children[1].canMove = !battlefield.children[1].canMove;
//}
//------------------------------------------

setInterval(function() {
    changePts(10, 'ally');
    changePts(10, 'enemy');
}, 10000);

createYourPlace();
createEnemyPlace();

createPickUnit();

animate();

function animate() {
    if (textError.alpha > 0) {
        textError.alpha -=0.02
    }

    for (var i = 0; i < battlefield.children.length; i++) {
        //check collision
        checkCoordinates(battlefield.children[i]);
        // unit die in collision?
        if (battlefield.children[i])
        battlefield.children[i].move();
    }
    renderer.render(stage);
    requestAnimationFrame(animate);
}

startMenu = function() {

};