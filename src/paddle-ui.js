/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

/**
 * Creates gradient for the paddle object.
 *
 * @param   {Paddle} paddle
 *          paddle object
 *
 * @returns {CanvasGradient} color for the paddle object
 */
function createPaddleGradient(paddle) {
    var gradient = getCanvasContext().createLinearGradient(paddle.leftX(), paddle.middleY(), paddle.leftX(), paddle.middleY() + 20);
    gradient.addColorStop(0, '#eeeeee');
    gradient.addColorStop(1, '#909090');
    return gradient;
}

/**
 * Draws the paddle.
 */
function drawPaddle(paddle2) {
    var paddle = paddle2 || game.getPaddle();
    var context = getCanvasContext();
    var y = paddle.middleY() - (paddle.height() / 2);
    context.beginPath();
    context.moveTo(paddle.leftX(), y);
    context.arcTo(paddle.rightX(), y, paddle.rightX(), y + paddle.radius(), paddle.radius());
    context.arcTo(paddle.rightX(), y + paddle.height(), paddle.rightX() - paddle.radius(), y + paddle.height(), paddle.radius());
    context.arcTo(paddle.leftX(), y + paddle.height(), paddle.leftX(), y + paddle.height() - paddle.radius(), paddle.radius());
    context.arcTo(paddle.leftX(), y, paddle.leftX() + paddle.radius(), y, paddle.radius());
    context.closePath();
    context.fillStyle = createPaddleGradient(paddle);
    context.fill();

    var trimWidth = paddle.width() / 10;

    context.fillStyle = 'orange';
    context.fillRect(paddle.leftCentralX(), paddle.topY(), trimWidth, paddle.height());
    context.fillRect(paddle.rightCentralX() - trimWidth, paddle.topY(), trimWidth, paddle.height());

    if (paddle.isArmed()) {

        var stripeWidth = Math.ceil(trimWidth / 5.0);

        context.fillStyle = 'red';
        context.fillRect(paddle.leftCentralX(), paddle.topY(), trimWidth, paddle.height());
        context.fillRect(paddle.rightCentralX() - trimWidth, paddle.topY(), trimWidth, paddle.height());

        context.fillStyle = 'blue';
        context.fillRect(paddle.leftCentralX() + (trimWidth / 2 - stripeWidth / 2), paddle.topY(), stripeWidth, paddle.height());
        context.fillRect(paddle.rightCentralX() - trimWidth + (trimWidth / 2 - stripeWidth / 2), paddle.topY(), stripeWidth, paddle.height());
    }
}

function movePaddleByMouse(mouseX) {
    var canvasX = getCanvas().offsetLeft;
    if ((mouseX > canvasX) && (mouseX < canvasX + game.width())) {
        var newX = mouseX - canvasX;
        game.movePaddle(newX - (game.getPaddle().width() / 2));
    }
}