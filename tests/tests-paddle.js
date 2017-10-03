/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 20.2.15
 * Time: 14:33
 * To change this template use File | Settings | File Templates.
 */

QUnit.module('Paddle geometry', {
    beforeEach: function() {
        // width = 100
        // height = 20
        this.paddle = new Paddle();
        this.paddle.setTo(50, 100);
    }
});

QUnit.test('left X', function(assert) {
    var expected = 50;
    var x = this.paddle.leftX();
    assert.equal(x, expected);
});

QUnit.test('middle X', function(assert) {
    var expected = 100;
    var x = this.paddle.middleX();
    assert.equal(x, expected);
});

QUnit.test('right X', function(assert) {
    var expected = 150;
    var x = this.paddle.rightX();
    assert.equal(x, expected);
});

QUnit.test('top Y', function(assert) {
    var expected = 90;
    var y = this.paddle.topY();
    assert.equal(y, expected);
});

QUnit.test('middle Y', function(assert) {
    var expected = 100;
    var y = this.paddle.middleY();
    assert.equal(y, expected);
});

QUnit.test('bottom Y', function(assert) {
    var expected = 110;
    var y = this.paddle.bottomY();
    assert.equal(y, expected);
});

QUnit.module('Paddle size manipulation', {
    beforeEach: function() {
        // width = 100
        // size increment +- 20
        // min width = 40
        // max width = 160
        this.paddle = new Paddle();
    }
});

QUnit.test('shrink', function(assert) {
    this.paddle.shrink();
    var expected = 80;
    var width = this.paddle.getWidth();
    assert.equal(width, expected);
});

QUnit.test('shrink has limit', function(assert) {
    for (var i = 0; i < 5; i++) {
        this.paddle.shrink();
    }
    var expected = 40;
    var width = this.paddle.getWidth();
    assert.equal(width, expected);
});

QUnit.test('extend', function(assert) {
    this.paddle.extend();
    var expected = 120;
    var width = this.paddle.getWidth();
    assert.equal(width, expected);
});

QUnit.test('extend has limit', function(assert) {
    for (var i = 0; i < 5; i++) {
        this.paddle.extend();
    }
    var expected = 160;
    var width = this.paddle.getWidth();
    assert.equal(width, expected);
});

QUnit.module('Paddle move', {
    beforeEach: function() {
        // speed = 4
        this.paddle = new Paddle();
        this.paddle.setTo(50, 100);
    }
});

QUnit.test('vector for left movement', function(assert) {
    this.paddle.moveLeft();
    var expected = -4;
    var vector = this.paddle.moveVector();
    assert.equal(vector, expected);
});

QUnit.test('vector for right movement', function(assert) {
    this.paddle.moveRight();
    var expected = 4;
    var vector = this.paddle.moveVector();
    assert.equal(vector, expected);
});

QUnit.test('vector for stopped movement', function(assert) {
    this.paddle.moveLeft();
    this.paddle.stopMovement();
    var expected = 0;
    var vector = this.paddle.moveVector();
    assert.equal(vector, expected);
});