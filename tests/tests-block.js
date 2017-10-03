/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 20.2.15
 * Time: 16:40
 * To change this template use File | Settings | File Templates.
 */

QUnit.module('Brick block: ', {
    beforeEach: function() {
        // brick width = 100
        // gap width/height = 2
        this.block = new Block(510);
    }
});

QUnit.test('get bricks', function(assert) {
    var bricks = this.block.getBricks();
    assert.equal(bricks.length, 20);
    assert.equal(bricks.indexOf(null), -1);
});

QUnit.test('remove brick', function(assert) {
    var brick = this.block.getBricks()[0];
    this.block.removeBrick(brick);
    var bricks = this.block.getBricks();
    assert.equal(bricks.length, 19);
    assert.equal(bricks.indexOf(brick), -1);
});

QUnit.test('starting brick count', function(assert) {
    assert.equal(this.block.remainingBrickCount(), 20);
});

QUnit.test('remaining brick count', function(assert) {
    var brick = this.block.getBricks()[0];
    this.block.removeBrick(brick);
    assert.equal(this.block.remainingBrickCount(), 19);
});