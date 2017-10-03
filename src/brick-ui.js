/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 14:55
 * To change this template use File | Settings | File Templates.
 */

/**
 * Creates color gradient for bricks in given row.
 *
 * @param   {Brick} brick
 *
 * @param   {string | color} color1
 *
 * @param   {string | color} color2
 *
 * @returns {CanvasGradient}
 */
/*function createBrickGradient(brick, color1, color2) {
 var gradient = getCanvasContext().createLinearGradient(0, brick.topY(), 0, brick.bottomY());
 gradient.addColorStop(0, color1);
 gradient.addColorStop(1, color2);
 return gradient;
 }*/

/**
 * Draws the brick block.
 */
function drawBricks() {
    var context = getCanvasContext();
    game.getBricks().forEach(function(brick) {
        context.fillStyle = '#000000';
        context.fillRect(brick.leftX(), brick.topY(), brick.width(), brick.height());
        context.fillStyle = brick.color();
        context.fillRect(brick.leftX() - 1, brick.topY() - 1, brick.width() - 2, brick.height() -2);
    });
}