/**
 * Created by nitiraj on 1/5/14.
 */
define(["core/Utils", "core/Point", "libs/connect"], function (Utils,Point,ConnectJs) {

    var AnimUtils = {
        animatePointerTailShift : function (pointer, tox, toy, unitTime, layer,callback) {
//            context = context || window;
            var numberOfPoints = 9;
            var x1 = pointer.x1;
            var y1 = pointer.y1;

            var points = Utils.getTransitionPointsOnLine(x1,y1,tox,toy,numberOfPoints);
            points.push(new Point(tox,toy));
            var i = 0 ;
            this.repeater(function () {
                pointer.setTailPoint(points[i++]);
                layer.draw()},unitTime,numberOfPoints,callback);
//            var intervalTimer = setInterval(
//                i++;
//                if( i > numberOfPoints ){
//                    clearInterval(intervalTimer);
//                    callback.apply(context);
//                }
//            }, unitTime);
        },
        animatePointerHeadShift : function (pointer, tox, toy, unitTime, layer,callback) {
//            context = context || window;
            var numberOfPoints = 9;
            var x1 = pointer.x2;
            var y1 = pointer.y2;

            var points = Utils.getTransitionPointsOnLine(x1,y1,tox,toy,numberOfPoints);
            points.push(new Point(tox,toy));
            var i = 0;
            this.repeater(function () {
                    pointer.setHeadPoint(points[i++]);
                    layer.draw();
                }
                ,unitTime,numberOfPoints,callback);
//            var i = 0 ;
//            var intervalTimer = setInterval(function () {
//                pointer.setHeadPoint(points[i]);
//                layer.draw();
//                i++;
//                if( i > numberOfPoints ){
//                    clearInterval(intervalTimer);
//                    callback.apply(context);
//                }
//            }, unitTime);
        },

        animatePointHeadTo : function(pointer,object, unitTime,layer,callback){
            var tailPoint = new Point(pointer.x1, pointer.y1);
            var newHeadPoint = object.getPointTo(tailPoint);

            this.animatePointerHeadShift(pointer,newHeadPoint.getX(),newHeadPoint.getY(),unitTime,layer,callback);

            pointer.pointHeadTo(object);
        },

        animatePointTailTo : function(pointer,object, unitTime,layer,callback){
            var headPoint = new Point(pointer.x2, pointer.y2);
            var newTailPoint = object.getPointTo(headPoint);

            this.animatePointerTailShift(pointer,newTailPoint.getX(),newTailPoint.getY(),unitTime,layer,callback);

            pointer.pointTailTo(object);
        },

        repeater : function(func,unitTime,numberOfTimes,callback){
            var i = 0 ;
            var timeoutFunction = function() {
                func();
                i++;
                if( i < numberOfTimes ){
                    setTimeout(timeoutFunction,unitTime);
                }else{
                    callback();
                }
            };
            setTimeout(timeoutFunction,0);
        },

        animateNodeDeletion : function(linkedNode,unitTime,layer,callback){
            var children = linkedNode.getChildren();
            var opacities = [];
            for(var j = 0 ; j < children.length ; j++){
                opacities[j] = children[j].opacity();
            }

            this.repeater(function(){
                for(var i = 0 ; i < children.length; i++){
                    children[i].opacity(children[i].opacity() - opacities[i]/10 );
                }
                layer.draw();
            },unitTime,10,function(){
                for(var k = 0 ; k < children.length; k++)
                linkedNode.destroy();
                callback();
            });
        }
    };

    return AnimUtils;
});