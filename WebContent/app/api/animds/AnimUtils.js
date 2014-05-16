/**
 * Created by nitiraj on 1/5/14.
 */
define(["core/Utils", "core/Point", "libs/connect"], function (Utils,Point,ConnectJs) {

    var AnimUtils = {
        animateObjectShift : function (object, tox, toy, unitTime, layer,callback) {
            var numberOfPoints = 9;
            var x1 = object.getX();
            var y1 = object.getY();

            var points = Utils.getTransitionPointsOnLine(x1,y1,tox,toy,numberOfPoints);
            points.push(new Point(tox,toy));
            var i = 0 ;
            this.repeater(function () {
                object.setXY(points[i].getX(),points[i].getY());
                i++;
                layer.draw();
            },unitTime,numberOfPoints,callback);
        },
        
        animateObjectArrayMove : function (array, diffx, diffy, unitTime, layer,callback) {
            var numberOfPoints = 10;
            var stepX = diffx/numberOfPoints;
            var stepY = diffy/numberOfPoints;
            
            this.repeater(function () {
            	for( var i = 0 ; i < array.length ; i++){
            		array[i].moveXY(stepX,stepY);
            	}
                layer.draw();
            },unitTime,numberOfPoints,callback);
        },

        animatePointerTailShift : function (pointer, tox, toy, unitTime, layer,callback) {
            var numberOfPoints = 9;
            var x1 = pointer.x1;
            var y1 = pointer.y1;

            var points = Utils.getTransitionPointsOnLine(x1,y1,tox,toy,numberOfPoints);
            points.push(new Point(tox,toy));
            var i = 0 ;
            this.repeater(function () {
                pointer.setTailPoint(points[i++]);
                layer.draw()},unitTime,numberOfPoints,callback);
        },
        animatePointerHeadShift : function (pointer, tox, toy, unitTime, layer,callback) {
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

        animateHighLightTextRect : function( textRect, highLightColor, unitTime, layer, callback ){
            var originalColor = textRect.getRectFill();
            this.repeater(function(){
                if( textRect.getRectFill() == originalColor){
                    textRect.setRectFill(highLightColor);
                }else{
                    textRect.setRectFill(originalColor);
                }
            },unitTime,4,callback);
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
    
    getAllChildrenOfTree = function(binaryTree){
    	var children = [];
    	Utils.inorder(binaryTree,function(){
    			children = children.concat(binaryTree.getChildren());
    	});
    	
    	return children;
    };

    return AnimUtils;
});