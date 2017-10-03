/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 20.2.15
 * Time: 15:03
 * To change this template use File | Settings | File Templates.
 */

QUnit.module('Collisions: ', {
   beforeEach: function() {
       this.game = new Game();

       // width = 30
       // height = 20
       this.powerUp = new PowerUp(new PowerUpType());

       // paddle X = <100, 200>
       // paddle Y = <300, 320>
       this.paddle = new Paddle();
       this.paddle.setTo(100, 310);
    }
});

QUnit.test('paddle & power up: ok', function(assert) {
    this.powerUp.setTo(90, 290);
    assert.ok(this.game.isPowerUpPaddleCollision(this.powerUp, this.paddle));
});

QUnit.test('paddle & power up: X too low', function(assert) {
    this.powerUp.setTo(69, 290);
    assert.ok(! this.game.isPowerUpPaddleCollision(this.powerUp, this.paddle));
});

QUnit.test('paddle & power up: X too high', function(assert) {
    this.powerUp.setTo(201, 290);
    assert.ok(! this.game.isPowerUpPaddleCollision(this.powerUp, this.paddle));
});

QUnit.test('paddle & power up: Y too low', function(assert) {
    this.powerUp.setTo(90, 279);
    assert.ok(! this.game.isPowerUpPaddleCollision(this.powerUp, this.paddle));
});

QUnit.test('paddle & power up: Y too high', function(assert) {
    this.powerUp.setTo(90, 321);
    assert.ok(! this.game.isPowerUpPaddleCollision(this.powerUp, this.paddle));
});