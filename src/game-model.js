/*
 * HTML Ricochet
 *
 * Created by: Radovan Netuka
 * Date: 5 Feb 2015
 *
 * Based on example from book HTML5 in Action (Manning, , http://html5inaction.com/) with a nostalgic feeling for
 * Arkanoid (http://en.wikipedia.org/wiki/Arkanoid)
 */

/**
 * Creates a new Game object.
 *
 * @constructor
 */
function Game(canvasWidth, canvasHeight) {

    /**
     * Chance for spawning a power up being after a brick is destroyed
     *
     * @type {number}
     */
    var POWER_UP_CHANCE = 0.05;

    var LASER_SHOT_SPEED = 8;

    var LASER_COOLDOWN_PERIOD = 500;

    var MAX_LIVES = 5;

    /**
     * paddle offset from bottom screen edge (in pixels)
     *
     * @type {number}
     */
    var PADDLE_OFFSET_BOTTOM = 30;


    /** remaining game stages */
    var stages = getStages();

    /** current game stage */
    var stage;

    /**
     * Current stage number
     *
     * @type {number}
     */
    var stageNumber = 1;

    /**
     * Player getScore
     *
     * @type {number}
     */
    var score = 0;

    /** remaining lives */
    var lives = 3;

    /**
     * Game paddle
     */
    var paddle;

    /**
     * Currently active game balls
     *
     * @type {Array}
     */
    var balls = [];

    var powerUpGenerator = new PowerUpGenerator(this);

    /**
     * Currently active power ups, available to be picked up by the player
     *
     * @type {Array}
     */
    var powerUps = [];

    var laserShots = [];

    var laserCooldownTimeout;

    /**
     *
     * @type {Block}
     */
    var brickBlock;


    /**
     * Gets playground width.
     *
     * @returns {number}
     */
    this.width = function() {
        return width();
    };

    this.height = function() {
        return height();
    };

    function width() {
        return Math.min(canvasWidth, canvasHeight);
    }

    function height() {
        return Math.min(canvasWidth, canvasHeight);
    }

    this.playerHasMaxLives = function() {
        return lives < MAX_LIVES;
    };

    this.getBalls = function() {
        return balls;
    };

    /**
     * Resets the ball. This will clear all current balls and replaces them with a new ball stuck to the paddle.
     */
    function resetBall() {
        var ball = new Ball();
        ball.setTo(paddle.middleX(), paddle.topY() - ball.radius());
        ball.catch();
        balls = [ball];
    }

    /**
     * Resets the brick block.
     */
    function resetBricks() {
        brickBlock = new Block(stage, width(), height());
    }

    /**
     * Resets the paddle.
     */
    function resetPaddle() {
        paddle = new Paddle();
        paddle.setTo(width() / 2 - (paddle.width() / 2), height() - (paddle.height() / 2) - PADDLE_OFFSET_BOTTOM);
        if (laserCooldownTimeout) {
            clearTimeout(laserCooldownTimeout);
        }
    }

    function removeLaserShots() {
        laserShots = [];
    }

    function nextStage() {
        stage = stages.shift();
        stageNumber++;
        resetBricks();
        resetPaddle();
        resetBall();
        removeLaserShots();
    }

    /**
     * @returns {number} current stage number
     */
    this.stageNumber = function() {
        return stageNumber;
    };

    /**
     * @returns {number} player score
     */
    this.getScore = function() {
        return score;
    };

    this.addScore = function(points) {
        score += points;
    };

    this.addLife = function() {
        lives = Math.min(lives + 1, MAX_LIVES);
    };

    this.getPlayerLives = function() {
        return lives;
    };

    function hasNextStage() {
        return stages.length > 0;
    }

    this.isWon = function() {
        return brickBlock.isDestroyed() && !hasNextStage();
    };

    /**
     * Checks if the game is over either by the player winning it or losing it.
     *
     * @returns {boolean} <code>true</code> if the game is over<code>false</code> otherwise
     */
    this.isOver = function() {
        return lives == 0;
    };

    this.isEnded = function() {
        return this.isWon() || this.isOver();
    };

    /**
     * @returns {Paddle} game paddle
     */
    this.getPaddle = function() {
        return paddle;
    };

    /**
     *
     * @returns {Array}
     */
    this.getPowerUps = function() {
        return powerUps;
    };

    this.getBricks = function() {
        return brickBlock.bricks();
    };

    this.getLaserShots = function() {
        return laserShots;
    };

    function hitBrick(brick, ball) {
        if (ball.breaksThrough()) {
            destroyBrick(brick);
        } else {
            brick.hit();
            if (brick.isDestroyed()) {
                destroyBrick(brick);
            }
            ball.revertSy();
        }
    }

    /**
     *
     * @param brick
     */
    function destroyBrick(brick) {
        brick.destroy();
        score += brick.value();
        brickBlock.removeBrick(brick);
        if (brickBlock.isDestroyed()) {
            if (hasNextStage()) {
                nextStage();
            }
        } else if (powerUpSpawning()) {
            var powerUp = powerUpGenerator.generatePowerUp();
            powerUp.setTo(brick.middleX(), brick.bottomY());
            powerUps.push(powerUp);
        }
    }

    /**
     * Starts the ball. This function throws an exception if the ball is already started,
     *
     * @throws  {string} exception message if the ball is already started
     */
    this.startBalls = function() {
        balls.forEach(function(ball) {
            if (ball.isCaught()) {
                ball.setYDirection(-1 * (1.5 * 5 * ball.speed()));
                ball.release();
            }
        });
    };

    this.fireLaser = function() {
        if (paddle.isArmed() && !paddle.laserOnCooldown()) {
            laserShots.push({x: paddle.leftLaserX(), y: paddle.topY()});
            laserShots.push({x: paddle.rightLaserX(), y: paddle.topY()});
            paddle.heatLaser();
            laserCooldownTimeout = setTimeout(function() {
                paddle.coolDownLaser();
            }, LASER_COOLDOWN_PERIOD);
        }
    };

    this.expandPaddle = function() {
        var formerWidth = paddle.width();
        paddle.expand();
        adjustPaddleAfterSizeChange(formerWidth);
    };

    this.shrinkPaddle = function() {
        var formerWidth = paddle.width();
        paddle.shrink();
        adjustPaddleAfterSizeChange(formerWidth);
    };

    function adjustPaddleAfterSizeChange(formerWidth) {
        var offsetX = (paddle.width() - formerWidth) / 2;
        paddle.moveTo(paddle.x() - offsetX);
    }

    function loseLife() {
        lives--;
        resetPaddle();
        resetBall();
        removeLaserShots();
    }

    /**
     * Tests if power up should be spawned.
     *
     * @returns {boolean} <code>true</code> if power up should be spawned, <code>false</code> otherwise
     */
    function powerUpSpawning() {
        return Math.random() < POWER_UP_CHANCE;
    }

    /**
     * Removes given power up from game without applying its effect.
     *
     * @param   {PowerUp} powerUp
     *          power up to be removed
     */
    function removePowerUp(powerUp) {
        var i = powerUps.indexOf(powerUp);
        powerUps.splice(i, 1);
    }

    function removeLaserShot(shot) {
        var i = laserShots.indexOf(shot);
        laserShots.splice(i, 1);
    }

    function removeBall(ball) {
        var i = balls.indexOf(ball);
        balls.splice(i, 1);
        if (balls.length == 0) {
            loseLife();
        }
    }

    /**
     * Resolves all moving objects.
     */
    this.doTick = function() {
        this.movePaddle();
        moveBalls();
        movePowerUps();
        moveLaserShots();
    };

    /**
     * Resolves moving paddle (note: move issued by arrow keys only)
     */
    this.movePaddle = function(newX) {
        newX = newX || paddle.leftX() + paddle.moveVector();

        newX = Math.max(0, newX);
        newX = Math.min(newX, width() - paddle.width());

        var formerX = paddle.x();

        paddle.moveTo(newX);
        moveCaughtBalls(newX - formerX);
    };

    function moveCaughtBalls(xDirection) {
        balls.forEach(function(ball) {
            if (ball.isCaught()) {
                ball.setX(ball.x() + xDirection);
            }
        });
    }

    /**
     * Resolves moving ball(s) on the screen.
     */
    function moveBalls() {
        balls.forEach(function(ball) {
            if (ball.isMoving()) {
                ball.move();
                checkBrickCollision(ball, brickBlock, resolveBrickCollision);
                checkEdgeCollision(ball);
                checkPaddleCollision(ball, paddle, resolvePaddleCollision);
            }
        });
    }

    function movePowerUps() {
        powerUps.forEach(function(powerUp) {
            powerUp.dropTo(powerUp.y() + powerUp.speed());
            if (powerUp.y() > height) {
                removePowerUp(powerUp);
            }
            checkPowerUpCollision(powerUp, paddle, resolvePowerUpCollision);
        });
    }

    function moveLaserShots() {
        laserShots.forEach(function(shot) {
            shot.y -= LASER_SHOT_SPEED;
            checkLaserCollision(shot, brickBlock, resolveLaserCollision);
        });
    }

    function checkEdgeCollision(ball) {
        if (ball.y() > height()) {
            removeBall(ball);
        }
        if (ball.y() < 1) {
            ball.revertSy();
        }
        if (ball.x() <= 0 || ball.x() >= width()) {
            ball.revertSx();
        }
    }

    function resolveBrickCollision(ball, brick) {
        hitBrick(brick, ball);
    }

    function resolvePaddleCollision(ball) {
        if (paddle.isSticky()) {
            ball.catch();
        } else {
            ball.setXDirection(7 * ((ball.x() - paddle.middleX()) / paddle.width()));
            ball.revertSy();
            // TODO: srazka kulecnikovych kouli
        }
    }

    function resolveLaserCollision(shot, brick) {
        brick.hit();
        if (brick.isDestroyed()) {
            destroyBrick(brick);
        }
        removeLaserShot(shot);
    }

    var resolvePowerUpCollision = (function(game) {
        return function(powerUp) {
            powerUp.pickUp(game);
            removePowerUp(powerUp);
        };
    })(this);

    stage = stages.shift();
    resetBricks();
    resetPaddle();
    resetBall();
}




