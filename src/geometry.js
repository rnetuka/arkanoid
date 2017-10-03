/**
 * Created with JetBrains WebStorm.
 * User: rnetuka
 * Date: 29.7.16
 * Time: 13:58
 * To change this template use File | Settings | File Templates.
 */

function lineEquation(x1, y1, x2, y2) {
    var sx = x1 - x2;
    var sy = y1 - y2;

    var a = -sy;
    var b = sx;
    var c = sy * x1 - sx * y1;

    // X = A + t*u

    return {a: a, b: b, c: c};

}

function pointOnLineSegment(lineSegment, point) {
    var sx = lineSegment.x1 - lineSegment.x2;
    var sy = lineSegment.y1 - lineSegment.y2;

    // X = A + t*u
    var t1 = (point.x - lineSegment.x1) / sx;
    var t2 = (point.y - lineSegment.y1) / sy;

    return (t1 > 0 && t1 < 1.0) && (t2 > 0 && t2 < 1.0);
}