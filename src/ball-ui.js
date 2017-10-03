/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 14:55
 * To change this template use File | Settings | File Templates.
 */

function drawBalls() {
    game.getBalls().forEach(function(ball) {
        drawBall(ball);
    });
}

/**
 * Draws the ball.
 */
function drawBall(ball) {
    var context = getCanvasContext();
    context.beginPath();
    context.arc(ball.x(), ball.y(), ball.radius(), 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = '#eeeeee';
    context.fill();
}