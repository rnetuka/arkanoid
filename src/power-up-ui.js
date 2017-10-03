/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 14:55
 * To change this template use File | Settings | File Templates.
 */

/**
 * Creates gradient for given power up object.
 *
 * @param   {PowerUp} powerUp
 *          power up object
 *
 * @returns {CanvasGradient} color for the power up object
 */
function createPowerUpGradient(powerUp) {
    var gradient = getCanvasContext().createLinearGradient(0, powerUp.y(), 0, powerUp.y() + powerUp.height());
    gradient.addColorStop(0, powerUp.color());
    gradient.addColorStop(1, powerUp.color());
    return gradient;
}

/**
 * Draws currently active power ups.
 */
function drawPowerUps() {
    game.getPowerUps().forEach(function(powerUp) {
        drawPowerUp(powerUp);
    });
}

/**
 * Draws a power up.
 *
 * @param   {object} powerUp
 *          power up to be drawn
 *
 * @see     PowerUp
 */
function drawPowerUp(powerUp) {
    var radius = powerUp.height() / 2;
    var context = getCanvasContext();

    context.beginPath();
    context.moveTo(powerUp.leftX(), powerUp.y());
    context.arcTo(powerUp.rightX(), powerUp.y(), powerUp.rightX(), powerUp.y() + radius, radius);
    context.arcTo(powerUp.rightX(), powerUp.y() + powerUp.height(), powerUp.rightX() - radius, powerUp.y() + powerUp.height(), radius);
    context.arcTo(powerUp.leftX(), powerUp.y() + powerUp.height(), powerUp.leftX(), powerUp.y() + powerUp.height() - radius, radius);
    context.arcTo(powerUp.leftX(), powerUp.y(), powerUp.leftX() + radius, powerUp.y(), radius);
    context.closePath();
    context.fillStyle = createPowerUpGradient(powerUp);
    context.fill();

    context.font = 'bold 12px Courier'
    context.fillStyle = 'white';
    context.fillText(powerUp.label(), powerUp.leftX() + 6 + (powerUp.width() / 2), powerUp.topY() + (powerUp.height() - 5));
}