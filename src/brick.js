/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 27.7.16
 * Time: 19:42
 * To change this template use File | Settings | File Templates.
 */

/** block width (in number of bricks) */
var BRICKS_ROW = 11;

var BRICKS_COLUMN = 24;



/**
 * @constructor
 */
function Brick(hitPoints, x, y, width, height, color, value) {

    var remainingHitPoints = hitPoints;


    this.hit = function() {
        remainingHitPoints--;
    };

    this.destroy = function() {
        remainingHitPoints = 0;
    };

    this.remainingHitPoints = function() {
        return remainingHitPoints;
    };

    this.isDamaged = function() {
        return remainingHitPoints < hitPoints;
    };

    this.isDestroyed = function() {
        return remainingHitPoints == 0;
    };

    this.color = function() {
        return color;
    };

    this.value = function() {
        return value;
    };

    /**
     * Gets leftmost X coordinate for brick in given column.
     *
     * @param   {number} column
     *          column index
     *
     * @returns {number} leftmost X coordinate
     */
    this.leftX = function() {
        return x;
    };

    /**
     * Gets rightmost X coordinate for brick in given column.
     *
     * @param   {number} column
     *          column index
     *
     * @returns {number} rightmost X coordinate
     */
    this.rightX = function() {
        return x + width;
    };

    /**
     * Gets X coordinate in the middle of a brick for brick in given column.
     *
     * @param   {number} column
     *          column index
     *
     * @returns {number} middle X coordinate
     */
    this.middleX = function() {
        return (this.leftX() + this.rightX()) / 2;
    };

    /**
     * Gets topmost Y coordinate for brick in given row.
     *
     * @param   {number} row
     *          row index
     *
     * @returns {number} topmost Y coordinate
     */
    this.topY = function() {
        return y;
    };

    /**
     * Gets bottommost Y coordinate for brick in given row.
     *
     * @param   {number} row
     *          row index
     *
     * @returns {number} bottommost Y coordinate
     */
    this.bottomY = function() {
        return y + height;
    };

    this.width = function() {
        return width;
    };

    this.height = function() {
        return height;
    };

}



/**
 *
 * @constructor
 */
function Block(stage, gameWidth, gameHeight) {

    var startingBrickCount = 0;

    /**
     * 2D array of <code>Brick</code> objects. Indexed as <code>bricks[row][column]</code>
     *
     * @type {Array}
     */
    var bricks = [];

    var brickWidth = gameWidth / BRICKS_ROW;

    var brickHeight = gameHeight / BRICKS_COLUMN;


    (function initBricks() {
        for (var i = 0; i < stage.length; i++) {
            var row = stage[i];
            bricks.push([]);

            for (var j = 0; j < row.length; j++) {
                var x = j * brickWidth;
                var y = i * brickHeight;

                var brickMetadata = row[j];
                var hitPoints = brickMetadata.hitPoints || 1;

                bricks[i][j] = new Brick(hitPoints, x, y, brickWidth, brickHeight, brickMetadata.color, 100);
                startingBrickCount++;
            }
        }
    })();

    /**
     * Gets all bricks from the block. Destroyed bricks are excluded from the return value.
     *
     * @returns {Array} array of not-yet-destroyed bricks in the block
     */
    this.bricks = function() {
        var result = [];
        bricks.forEach(function(column) {
            column.forEach(function(brick) {
                if (brick != null) {
                    result.push(brick);
                }
            });
        });
        return result;
    };

    /**
     * Removes a brick from the block.
     *
     * @param   {Brick} brick
     *          brick to be removed
     */
    this.removeBrick = function(brick) {
        for (var row = 0; row < BRICKS_ROW; row++) {
            for (var column = 0; column < BRICKS_COLUMN; column++) {
                if (bricks[row][column] == brick) {
                    bricks[row][column] = null;
                }
            }
        }
    };

    this.isDestroyed = function() {
        return bricks.every(function(row) {
            return row.every(function(element) {
                return element == null;
            });
        });
    };

}