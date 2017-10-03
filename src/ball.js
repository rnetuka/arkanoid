/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 28.7.16
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */

/**
 * Creates a new ball object.
 *
 * @constructor
 */
function Ball() {

    /**
     * ball radius
     *
     * @type {number}
     */
    var DEFAULT_RADIUS = 10;

    var SHRINKED_RADIUS = 5;

    var SPEED_INCREMENT = 0.4;

    var MIN_SPEED = 0.6;


    var radius = DEFAULT_RADIUS;

    /**
     * ball speed modifier (1 = 100%, 1.2 = 120% etc.)
     *
     * @type {number}
     */
    var speed = 0.6;

    /**
     * flag whether or not is the ball penetrating the bricks
     *
     * @type {boolean}
     */
    var breakThrough = false;

    /**
     * X coordinate of the ball (measured at ball center)
     *
     * @type {number}
     */
    var x;

    /**
     * Y coordinate of the ball (measured at ball center)
     *
     * @type {number}
     */
    var y;

    /**
     * X vector that defines increase of ball center on X axis every game tick
     *
     * @type {number}
     */
    var sx = 0;

    /**
     * Y vector that defines increase of ball center on Y axis every game tick
     *
     * @type {number}
     */
    var sy = 0;

    var caught = false;


    this.x = function() {
        return x;
    };

    this.y = function() {
        return y;
    };

    this.radius = function() {
        return radius;
    };

    /**
     * Speeds the ball up.
     */
    this.speedUp = function() {
        speed += SPEED_INCREMENT;
    };

    /**
     * Speeds the ball down while preserving minimal allowed speed.
     */
    this.speedDown = function() {
        speed = Math.max(speed - SPEED_INCREMENT, MIN_SPEED);
    };

    this.speed = function() {
        return speed;
    };

    this.setSpeed = function(newSpeed) {
        speed = newSpeed;
    };

    this.breaksThrough = function() {
        return this.breakThrough;
    };

    this.setBreaksThrough = function(breaksThrough) {
        this.breakThrough = breaksThrough;
    };

    /**
     * Moves the ball in given vector.
     */
    this.move = function() {
        x += sx * speed;
        y += sy * speed;
    };

    this.catch = function() {
        caught = true;
    };

    this.release = function() {
        caught = false;
    };

    /**
     * Sets the ball into position.
     *
     * @param   {number} x
     *          x coordinate
     *
     * @param   {number} y
     *          y coordinate
     */
    this.setTo = function(targetX, targetY) {
        x = targetX;
        y = targetY;
    };

    this.setX = function(targetX) {
        x = targetX;
    };

    this.setY = function(targetY) {
        y = targetY;
    };

    this.isMoving = function() {
        return !caught;
    };

    this.isCaught = function() {
        return caught;
    };

    this.xDirection = function() {
        return sx;
    };

    this.setXDirection = function(xDirection) {
        sx = xDirection;
    };

    this.yDirection = function() {
        return sy;
    };

    this.setYDirection = function(yDirection) {
        sy = yDirection;
    };

    this.setMoveVector = function(xDirection, yDirection) {
        sx = xDirection;
        sy = yDirection;
    };

    this.revertSx = function() {
        sx *= -1;
    };

    this.revertSy = function() {
        sy *= -1;
    };

    this.shrink = function() {
        radius = SHRINKED_RADIUS;
    };

    this.restoreSize = function() {
        radius = DEFAULT_RADIUS;
    };

    /**
     * Clones the ball object.
     *
     * @returns {Ball} new ball object with same properties as the original
     */
    this.clone = function() {
        var ball = new Ball();
        ball.setSpeed(speed);
        ball.setBreaksThrough(breakThrough);
        ball.setTo(x, y);
        ball.setMoveVector(sx, sy);
        if (radius < DEFAULT_RADIUS) {
            ball.shrink();
        }
        return ball;
    };

}
