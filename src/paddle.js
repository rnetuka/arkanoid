/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 28.7.16
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */

/**
 * Creates a new paddle object.
 *
 * @constructor
 */
function Paddle() {

    /**
     * minimal allowed paddle width
     *
     * @type {number}
     */
    var MIN_WIDTH = 40;

    /**
     * maximal allowed paddle width
     *
     * @type {number}
     */
    var MAX_WIDTH = 160;

    var GROW_SIZE = 20;


    /**
     * paddle width in game units
     *
     * @type {number}
     */
    var width = 100;

    /**
     * paddle height in game units
     *
     * @type {number}
     */
    var HEIGHT = 20;

    /**
     * paddle X-axis move vector, i.e. <code>-1</code> for moving left, <code>0</code> for staying still or
     * <code>1</code> for moving right (manual paddle control only)
     *
     * @type {number}
     */
    var control = 0;

    /**
     * paddle speed in pixels per tick (manual paddle control only)
     *
     * @type {number}
     */
    var SPEED = 4;

    /**
     * paddle X coordinate (note that X is the leftmost horizontal coordinate, not central one)
     *
     * @type {number}
     */
    var x;

    /**
     * paddle Y coordinate (note that Y is the central vertical coordinate)
     *
     * @type {number}
     */
    var y;

    var sticky = false;

    var laser = false;

    var laserCooldown = false;


    this.x = function() {
        return x;
    };

    this.leftX = function() {
        return x;
    };

    this.leftCentralX = function() {
        return this.leftX() + this.radius();
    };

    /**
     * Gets X coordinate in the middle of the paddle.
     *
     * @returns {number} paddle middle X coordinate
     */
    this.middleX = function() {
        return x + (width / 2);
    };

    this.rightX = function() {
        return x + width;
    };

    this.rightCentralX = function() {
        return this.rightX() - this.radius();
    };

    /**
     * Gets Y coordinate on top of the paddle.
     *
     * @returns {number} paddle top Y coordinate
     */
    this.topY = function() {
        return y - HEIGHT / 2;
    };

    this.middleY = function() {
        return y;
    };

    this.bottomY = function() {
        return y + HEIGHT / 2;
    };

    this.width = function() {
        return width;
    };

    this.height = function() {
        return HEIGHT;
    };

    this.radius = function() {
        return this.height() / 2;;
    };

    /**
     * Shrinks the paddle by one size while preserving minimal width requirement.
     */
    this.shrink = function() {
        if (width > MIN_WIDTH) {
            width -= GROW_SIZE;
        }
    };

    /**
     * Extends the paddle by one size while preserving maximal width requirement.
     */
    this.expand = function() {
        if (width < MAX_WIDTH) {
            width += GROW_SIZE;
        }
    };

    this.moveLeft = function() {
        control = -1;
    };

    this.moveRight = function() {
        control = 1;
    };

    this.stopMovement = function() {
        control = 0;
    };

    this.moveVector = function() {
        return control * SPEED;
    };

    this.setTo = function(destinationX, destinationY) {
        x = destinationX;
        y = destinationY;
    };

    this.moveTo = function(destinationX) {
        x =  destinationX;
    };

    this.applyGlue = function() {
        sticky = true;
    };

    this.isSticky = function() {
        return sticky;
    };

    this.armLaser = function() {
        laser = true;
    };

    this.disarmLaser = function() {
        laser = false;
    };

    this.laserOnCooldown = function() {
        return laserCooldown;
    };

    this.heatLaser = function() {
        laserCooldown = true;
    };

    this.coolDownLaser = function() {
        laserCooldown = false;
    };

    this.isArmed = function() {
        return laser;
    };

    this.leftLaserX = function() {
        return this.leftCentralX();
    };

    this.rightLaserX = function() {
        return this.rightCentralX();
    };

    this.scale = function(d) {
        width *= d;
        HEIGHT *= d;
    };

}
