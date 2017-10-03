/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 9:35
 * To change this template use File | Settings | File Templates.
 */

function twoCirclesCollision(x1, y1, r1, x2, y2, r2) {
    var d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    return d - (r1 + r2) <= 0;
}

function circleRectangleCollision(circle, rectangle) {
    var r = circle.r;
    // ma stred v pocatku

    for (var i = 0; i < 4; i++) {
        var lineSegment = rectangle[i];
        var lineEquation = lineEquation(lineSegment.x1, lineSegment.y1, lineSegment.x1, lineSegment.y2);

        var a = lineEquation.a;
        var b = lineEquation.b;
        var c = lineEquation.c;

        var k = -a / b;
        var q = -c / b;

        var d = Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2);

        if (d < 0) {
            break;
        }

        if (d == 0) {
            // 1 point

            var x = -q*k / (1 + Math.pow(k, 2)) + 1 / (1 + Math.pow(k, 2)) * Math.sqrt(Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2));
            var y = q / (1 + Math.pow(k, 2)) + k / (1 + Math.pow(k, 2)) * Math.sqrt(Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2));

            if (pointOnLineSegment(lineSegment, {x: x, y: y})) {
                return true;
            }
        }

        if (d > 0) {
            // 2 points

            var x1 = -q*k / (1 + Math.pow(k, 2)) + 1 / (1 + Math.pow(k, 2)) * Math.sqrt(Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2));
            var y1 = q / (1 + Math.pow(k, 2)) + k / (1 + Math.pow(k, 2)) * Math.sqrt(Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2));

            var x2 = -q*k / (1 + Math.pow(k, 2)) - 1 / (1 + Math.pow(k, 2)) * Math.sqrt(Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2));
            var y2 = q / (1 + Math.pow(k, 2)) - k / (1 + Math.pow(k, 2)) * Math.sqrt(Math.pow(r, 2) * (1 + Math.pow(k, 2)) - Math.pow(q, 2));

            if (pointOnLineSegment(lineSegment, {x: x1, y: y1})) {
                return true;
            }

            if (pointOnLineSegment(lineSegment, {x: x2, y: y2})) {
                return true;
            }
        }
    }
    //return false;
}

//TODO: vzacne maly balon propadava skrz padlo
function isPaddleCollision(ball, paddle) {
    var leftCollision = twoCirclesCollision(ball.x(), ball.y(), ball.radius(), paddle.leftCentralX(), paddle.middleY(), paddle.radius());
    var rightCollision = twoCirclesCollision(ball.x(), ball.y(), ball.radius(), paddle.rightCentralX(), paddle.middleY(), paddle.radius());

    var centralCollision = (ball.y() + ball.radius() == paddle.topY()
        && ball.x() >= paddle.leftCentralX()
        && ball.x() <= paddle.rightCentralX());

    return leftCollision || rightCollision || centralCollision;
}

function checkPaddleCollision(ball, paddle, resolveFunction) {
    if (isPaddleCollision(ball, paddle)) {
        resolveFunction(ball);
    }
}

/**
 * Checks if brick in given row and column collided with the ball.
 *
 * @param   {Ball} ball
 *
 * @param   {object} brick
 *          brick
 *
 * @returns {boolean} <code>true</code> if brick has collided with the ball, <code>false</code> otherwise
 */
function isBrickCollision(ball, brick) {
    return ball.x() >= brick.leftX()
        && ball.x() <= brick.rightX()
        && ball.y() >= brick.topY()
        && ball.y() <= brick.bottomY();
}

function checkBrickCollision(ball, brickBlock, resolveFunction) {
    brickBlock.bricks().forEach(function(brick) {
        if (isBrickCollision(ball, brick)) {
            resolveFunction(ball, brick);
        }
    });
}

function checkLaserCollision(shot, brickBlock, resolveFunction) {
    brickBlock.bricks().forEach(function(brick) {
        if (isLaserShotCollision(shot, brick)) {
            resolveFunction(shot, brick);
        }
    });
}

function isLaserShotCollision(shot, brick) {
    return shot.x >= brick.leftX()
        && shot.x <= brick.rightX()
        && shot.y >= brick.topY()
        && shot.y <= brick.bottomY();
}

function isPowerUpCollision(powerUp, paddle) {
    var xCollision = (powerUp.leftX() >= paddle.leftX() && powerUp.leftX() <= paddle.rightX())
        || (powerUp.rightX() >= paddle.leftX() && powerUp.rightX() <= paddle.rightX());
    var yCollision = (powerUp.topY() >= paddle.topY() && powerUp.topY() <= paddle.bottomY())
        || (powerUp.bottomY() >= paddle.topY() && powerUp.bottomY() <= paddle.bottomY());
    return xCollision && yCollision;
}

function checkPowerUpCollision(powerUp, paddle, resolveFunction) {
    if (isPowerUpCollision(powerUp, paddle)) {
        resolveFunction(powerUp);
    }
}