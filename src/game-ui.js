/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 20.2.15
 * Time: 12:26
 * To change this template use File | Settings | File Templates.
 */

/**
 * Key code for left arrow key
 *
 * @constant
 * @type {number}
 */
var KEY_ARROW_LEFT = 37;

/**
 * Key code for right arrow key
 *
 * @constant
 * @type {number}
 */
var KEY_ARROW_RIGHT = 39;

var KEY_SPACE = 32;

/**
 * The game instance
 *
 * @type {Game}
 */
var game;


/**
 * Gets canvas element for the game.
 *
 * @returns {HTMLElement} canvas HTML element
 */
function getCanvas() {
    if (! getCanvas.result) {
        getCanvas.result = document.getElementById('game-canvas');
    }
    return getCanvas.result;
}

/**
 * Gets canvas context for drawing.
 *
 * @returns {CanvasRenderingContext2D} canvas context
 */
function getCanvasContext() {
    if (! getCanvasContext.result) {
        getCanvasContext.result = getCanvas().getContext('2d');
    }
    return getCanvasContext.result;
}

function animate() {
    window.requestAnimationFrame(animate);
    if (! game.isEnded()) {
        game.doTick();
        draw();
    }
}

/**
 * Draws the game screen.
 */
function draw() {
    if (game.isOver()) {
        displayGameOverScreen();
    } else if (game.isWon()) {
        displayVictoryScreen();
    } else {
        drawBackground();
        drawBricks();
        drawPaddle();
        drawBalls();
        drawPowerUps();
        drawLaserShots();
    }
    drawHud();
}

/**
 * Draws game background.
 */
function drawBackground() {
    var context = getCanvasContext();
    context.fillStyle = '#000000';
    context.fillRect(0, 0, game.width(), game.height());
}

/**
 * Draws game HUD.
 */
function drawHud() {
    drawPlayerScore();
    drawStageNumber();
    drawPlayerLives();
}

function drawPlayerScore() {
    var context = getCanvasContext();
    context.font = '12px helvetica, arial';
    context.fillStyle = 'white';
    context.textAlign = 'right';
    context.fillText('Round: ' + game.stageNumber(), game.width() - 5, game.height() - 5);
}

function drawPlayerLives() {
    for (var i = 0; i < game.getPlayerLives(); i++) {
        var paddle = new Paddle();
        paddle.scale(0.3);
        paddle.setTo(10 +  i*(paddle.width() + 10), game.height() - 5);
        drawPaddle(paddle);
    }
}

function drawStageNumber() {
    var context = getCanvasContext();
    context.font = '12px helvetica, arial';
    context.fillStyle = 'white';
    context.textAlign = 'right';
    context.fillText('Round: ' + game.stageNumber(), game.width() - 5, game.height() - 5);
}

/**
 * Displays welcome screen.
 */
function displayWelcomeScreen() {
    drawScreen('ARKANOID', 'Click To Start', 'white');
}

/**
 * Displays screen telling the user he/she has lost. This stops the game and enables game restart.
 */
function displayGameOverScreen() {
    drawScreen('Game Over', 'Click To Retry', 'red');
    getCanvas().addEventListener('click', restartGame, false);
}

/**
 * Displays screen telling the user that he/she has won. This stops the game and enables game restart.
 */
function displayVictoryScreen() {
    drawScreen('You Won', 'Click To Start Again', 'white');
    getCanvas().addEventListener('click', restartGame, false);
}

/**
 * Draws screen displaying given text.
 *
 * @param   {string} title
 *          title text
 *
 * @param   {string} text
 *          additional text displayed under the title
 *
 * @param   {string | color} titleColor
 *          title color
 */
function drawScreen(title, text, titleColor) {
    var canvas = getCanvas();
    var context = getCanvasContext();
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = titleColor;
    context.textAlign = 'center';
    context.font = '40px helvetica, arial';
    context.fillText(title, canvas.width / 2, canvas.height / 2);
    context.fillStyle = '#999999';
    context.font = '20px helvetica, arial';
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 30);
}

function setUp() {
    if (getCanvas().getContext) {
        displayWelcomeScreen();
        getCanvas().addEventListener('click', runGame, false);
    }
}

function runGame() {
    getCanvas().removeEventListener('click', runGame, false);
    game = createGame();
    initControls();
    animate();
}

/**
 * Restarts the game.
 */
function restartGame() {
    getCanvas().removeEventListener('click', restartGame, false);
    game = createGame();
}

function createGame() {
    return new Game(getCanvas().width, getCanvas().height);
}

/**
 * Initializes controls for the game.
 */
function initControls() {
    var controlsKeyDown = function(event) {
        switch (event.keyCode) {
            case KEY_ARROW_LEFT:
                game.getPaddle().moveLeft();
                break;
            case KEY_ARROW_RIGHT:
                game.getPaddle().moveRight();
                break;
            case KEY_SPACE:
                game.startBalls();
                game.fireLaser();
                break;
        }
    };
    var controlsKeyUp = function(event) {
        if ((event.keyCode == KEY_ARROW_LEFT) || (event.keyCode == KEY_ARROW_RIGHT)) {
            game.getPaddle().stopMovement();
        }
    };
    window.addEventListener('keydown', controlsKeyDown, true);
    window.addEventListener('keyup', controlsKeyUp, true);
    window.addEventListener('mousemove', function(event) {
        movePaddleByMouse(event.pageX);
    }, true);
    getCanvas().addEventListener('click', function(event) {
        game.startBalls();
        game.fireLaser();
    }, false);
}

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();