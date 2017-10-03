/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 20.2.15
 * Time: 14:33
 * To change this template use File | Settings | File Templates.
 */

QUnit.module('Brick geometry: ', {
    beforeEach: function() {
        var width = 100;
        var height = 20;
        this.brick = new Brick(200, 20, width, height);
    }
});

QUnit.test('left X', function(assert) {
    var expected = 200;
    var x = this.brick.leftX();
    assert.equal(x, expected);
});

QUnit.test('right X', function(assert) {
    var expected = 300;
    var x = this.brick.rightX();
    assert.equal(x, expected);
});

QUnit.test('top Y', function(assert) {
    var expected = 20;
    var y = this.brick.topY();
    assert.equal(y, expected);
});

QUnit.test('bottom Y', function(assert) {
    var expected = 40;
    var y = this.brick.bottomY();
    assert.equal(y, expected);
});