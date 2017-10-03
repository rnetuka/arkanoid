/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 9:26
 * To change this template use File | Settings | File Templates.
 */

var LASER_SHOT_WIDTH = 3;

var LASER_SHOT_HEIGHT = 5;

function createLaserShotGradient(shot) {
    var gradient = getCanvasContext().createLinearGradient(0, 0, LASER_SHOT_WIDTH, LASER_SHOT_HEIGHT);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(1, '#ffff00');
    return gradient;
}

function drawLaserShot(shot) {
    var context = getCanvasContext();
    context.fillStyle = createLaserShotGradient(shot);
    context.fillRect(shot.x - LASER_SHOT_WIDTH / 2, shot.y - LASER_SHOT_HEIGHT / 2, LASER_SHOT_WIDTH, LASER_SHOT_HEIGHT);
}

function drawLaserShots() {
    game.getLaserShots().forEach(function(shot) {
        drawLaserShot(shot);
    });
}