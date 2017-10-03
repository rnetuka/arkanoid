/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 24.2.15
 * Time: 10:43
 * To change this template use File | Settings | File Templates.
 */

QUnit.module('Power up geometry:', {
    beforeEach: function() {
        // width = 30
        // height = 20
        this.powerUp = new PowerUp(new PowerUpType());
        this.powerUp.setTo(100, 300);
    }
});

QUnit.test('left X', function(assert) {
    assert.equal(this.powerUp.leftX(), 100);
});

QUnit.test('right X', function(assert) {
    assert.equal(this.powerUp.rightX(), 130);
});

QUnit.test('top Y', function(assert) {
    assert.equal(this.powerUp.topY(), 300);
});

QUnit.test('bottom Y', function(assert) {
    assert.equal(this.powerUp.bottomY(), 320);
});

QUnit.module('Power up:', {
    beforeEach: function() {
        var type = new PowerUpType('', 4, (function(module) {return function() {module.pickedUp = true;}})(this));
        this.powerUp = new PowerUp(type);
        this.pickedUp = false;
    }
});

QUnit.test('dropping', function(assert) {
    this.powerUp.dropTo(50);
    assert.equal(this.powerUp.getY(), 50);
});

QUnit.test('dropping exception', function(assert) {
    assert.throws(function() {this.powerUp.dropTo(-10)});
});

QUnit.test('picking up', function(assert) {
    this.powerUp.pickUp();
    assert.ok(this.pickedUp);
});