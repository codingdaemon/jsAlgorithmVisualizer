/**
 * Created by nitiraj on 1/5/14.
 */
define(["core/Utils", "core/Point"], function (Utils,Point) {

    var AnimUtils = {
        animatePointerTailShift : function (pointer, tox, toy, unitTime, layer,context,callback) {
            context = context || window;
            var numberOfPoints = 9;
            var x1 = pointer.x1;
            var y1 = pointer.y1;

            var points = Utils.getTransitionPointsOnLine(x1,y1,tox,toy,numberOfPoints);
            points.push(new Point(tox,toy));
            var i = 0 ;
            var intervalTimer = setInterval(function () {
                pointer.setTailPoint(points[i]);
                layer.draw();
                i++;
                if( i > numberOfPoints ){
                    clearInterval(intervalTimer);
                    callback.apply(context);
                }
            }, unitTime);
        },
        animatePointerHeadShift : function (pointer, tox, toy, unitTime, layer, context ,callback) {
            context = context || window;
            var numberOfPoints = 9;
            var x1 = pointer.x2;
            var y1 = pointer.y2;

            var points = Utils.getTransitionPointsOnLine(x1,y1,tox,toy,numberOfPoints);
            points.push(new Point(tox,toy));
            var i = 0 ;
            var intervalTimer = setInterval(function () {
                pointer.setHeadPoint(points[i]);
                layer.draw();
                i++;
                if( i > numberOfPoints ){
                    clearInterval(intervalTimer);
                    callback.apply(context);
                }
            }, unitTime);
        }
    };

    return AnimUtils;
});