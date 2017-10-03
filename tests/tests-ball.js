/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 24.2.15
 * Time: 13:41
 * To change this template use File | Settings | File Templates.
 */

QUnit.module('Ball: ', {
    beforeEach: function() {
        this.ball = new Ball();
    }
});

QUnit.test('speed down is limited', function(assert) {
    this.ball.speedDown();
    this.ball.speedDown();
    assert.equal(this.ball.getSpeed(), 0.6);
});

QUnit.test('moving the ball', function(assert) {
    this.ball.set(10, 10);
    this.ball.speedUp();
    this.ball.move(15, 20);
    var coordinates = [this.ball.getX(), this.ball.getY()];
    var expected = [31, 38];
    assert.deepEqual(coordinates, expected);
});

QUnit.test('clone', function(assert) {
    var clone = this.ball.clone();
    assert.equal(clone.getX(), this.ball.getX());
    assert.equal(clone.getY(), this.ball.getY());
    assert.equal(clone.getSpeed(), this.ball.getSpeed());
    assert.equal(clone.sx, this.ball.sx);
    assert.equal(clone.sy, this.ball.sy);
    assert.equal(clone.isPenetrating(), this.ball.isPenetrating());
    assert.equal(clone.started, this.ball.started);
});