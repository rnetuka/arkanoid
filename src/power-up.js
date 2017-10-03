/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 27.7.16
 * Time: 18:18
 * To change this template use File | Settings | File Templates.
 */

var DROP_SPEED_NORMAL = 3;
var DROP_SPEED_FAST = 5;
var DROP_SPEED_X_FAST = 7;

/**
 *
 * @param text
 * @param speed
 * @param apply
 * @constructor
 */
function PowerUpType(name, label, color, dropSpeed, apply) {

    this.name = function() {
        return name;
    };

    this.label = function() {
        return label;
    };

    this.color = function() {
        return color;
    };

    this.labelColor = function() {
        return color;
    };

    this.dropSpeed = function() {
        return dropSpeed;
    };

    this.apply = function(game) {
        apply(game);
    };

}

function getCommonPowerUps() {
    var powerUps = [];
    powerUps.push(new PowerUpType('Shrink', '-', '#0000ff', DROP_SPEED_NORMAL, function(game) { game.shrinkPaddle(); }));
    powerUps.push(new PowerUpType('Expand', '+', '#0000ff', DROP_SPEED_NORMAL, function(game) { game.expandPaddle(); }));
    powerUps.push(new PowerUpType('Speed Up', 'S+', '#ffa500', DROP_SPEED_NORMAL, function(game) {
        game.getBalls().forEach(function(ball) {
            ball.speedUp();
        });
    }));
    powerUps.push(new PowerUpType('Speed Down', 'S-', '#ffa500', DROP_SPEED_NORMAL, function(game) {
        game.getBalls().forEach(function(ball) {
            ball.speedDown();
        });
    }));
    powerUps.push(new PowerUpType('Divide', 'D', '#00ffff', DROP_SPEED_NORMAL, function(game) {
        var balls = game.getBalls();
        if (balls.length > 0) {
            var prototypeBall = balls[0];
            prototypeBall.setBreaksThrough(false);
            prototypeBall.shrink();
            var clone1 = prototypeBall.clone();
            var clone2 = prototypeBall.clone();
            clone1.setXDirection(prototypeBall.xDirection() + 1);;
            clone2.setXDirection(prototypeBall.xDirection() - 1);
            balls.push(clone1);
            balls.push(clone2);
        }
    }));
    powerUps.push(new PowerUpType('Catch', 'C', '#00ff00', DROP_SPEED_NORMAL, function(game) { game.getPaddle().applyGlue(); }));
    powerUps.push(new PowerUpType('Bonus', '$', '#ff00ff', DROP_SPEED_NORMAL, function(game) { game.addScore(50); }));
    return powerUps;
}

function getUncommonPowerUps() {
    var powerUps = [];
    powerUps.push(new PowerUpType('Break Through', 'B', '#ffff00', DROP_SPEED_FAST, function(game) {
        var balls = game.getBalls();
        if (balls.length > 0) {
            balls.splice(1, balls.length - 1);
            balls[0].setBreaksThrough(true);
            balls[0].restoreSize();
        }
    }));
    powerUps.push(new PowerUpType('Laser', 'L', '#ff0000', DROP_SPEED_FAST, function(game) { game.getPaddle().armLaser(); }));
    return powerUps;
}

function getRarePowerUps() {
    var powerUps = [];
    powerUps.push(new PowerUpType('Extra Life', 'P', '#808080', DROP_SPEED_X_FAST, function(game) { game.addLife(); }));
    return powerUps;
}




/**
 * Power up types. Each type is an object with properties <code>text, speed</code> and <code>apply</code>.
 * <code>Text</code>contains the text to be displayed on the screen, <code>speed</code> denotes falling speed of the
 * power up and <code>apply</code> contains closure to a function that should be called when the player picks up the
 * power up.
 *
 * <p>
 * There are following types of power ups: <em>shrink, extend, speedUp, speedDown, penetration</em> and <em>bonus</em>
 * </p>
 *
 * @type {object}
 */

/**
 * Creates a new power object derived from given power up type.
 *
 * @param   {PowerUpType} type
 *
 * @constructor
 */
function PowerUp(type) {

    /**
     * power up x coordinate (measured from left top corner)
     *
     * @type {number}
     */
    var x = 0;

    /**
     * power up y coordinate (measured from left top corner)
     *
     * @type {number}
     */
    var y = 0;

    /**
     * power up width in pixels
     *
     * @type {number}
     */
    var WIDTH = 40;

    /**
     * power up height in pixels
     *
     * @type {number}
     */
    var HEIGHT = 20;


    this.x = function() {
        return x;
    };

    this.y = function() {
        return y;
    };

    this.width = function() {
        return WIDTH;
    };

    this.height = function() {
        return HEIGHT;
    };

    this.leftX = function() {
        return x;
    };

    this.rightX = function() {
        return x + WIDTH;
    };

    this.topY = function() {
        return y;
    };

    this.bottomY = function() {
        return y + HEIGHT;
    };

    this.label = function() {
        return type.label();
    };

    this.color = function() {
        return type.color();
    };

    /**
     * Gets power up falling speed in pixels per game tick
     */
    this.speed = function() {
        return type.dropSpeed();
    };

    this.pickUp = function(game) {
        type.apply(game);
    };

    this.setTo = function(newX, newY) {
        x = newX;
        y = newY;
    };

    this.dropTo = function(newY) {
        if (newY < y) {
            throw 'cannot drop';
        }
        y = newY;
    };

}




function PowerUpGenerator(game) {

    /**
     * Generates random power up at given coordinates.
     *
     * @param   {number} x
     *          x coordinate
     *
     * @param   {number} y
     *          y coordinate
     */
    this.generatePowerUp = function() {
        return new PowerUp(generatePowerUpType());
    };

    /**
     * Generates random power up type based on power up distribution.
     *
     * @returns {PowerUpType} random power up type
     *
     * @see powerUpDistribution
     */
    function generatePowerUpType() {
        var powerUpTypes;
        var random = Math.random();
        if (random < 0.1 && !game.playerHasMaxLives()) {
            powerUpTypes = getRarePowerUps();
        } else if (random < 0.4) {
            powerUpTypes = getUncommonPowerUps();
        } else {
            powerUpTypes = getCommonPowerUps();
        }
        return powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    }

}