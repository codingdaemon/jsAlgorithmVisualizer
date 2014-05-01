/**
 * Created by nitiraj on 20/4/14.
 */
define(["animds/TextRectAnimationObject", "core/Logger", "animds/AnimationObject","animds/PointerAnimationObject", "libs/kinetic", "animds/LinkedNodeExtension"], function (TextRectAnimationObject, Logger, AnimationObject, PointerAnimationObject, Kinetic, LinkedNodeExtension) {

    function LinkedNodeAnimationObject(configs, hasNextPointer, hasPrevPointer, layer) {
        AnimationObject.call(this,"LinkedNodeAnimationObject",layer);
        this.rect = new TextRectAnimationObject(configs,layer);
        this.group = new Kinetic.Group();
        this.group.add(this.rect.getGroup());

        if( hasNextPointer ){
        	var nextPointerConfigs = configs["nextPointerConfigs"] ;
            this.nextPointer = new PointerAnimationObject(nextPointerConfigs,layer);
            this.nextPointer.getGroup().draggable(false);
            this.nextPointer.pointTailTo(this.rect);
            this.group.add(this.nextPointer.getGroup());
        }

        if( hasPrevPointer ){
        	var prevPointerConfigs = configs["prevPointerConfigs"];
            this.prevPointer = new PointerAnimationObject(prevPointerConfigs,layer);
            this.prevPointer.getGroup().draggable(false);
            this.prevPointer.pointTailTo(this.rect);
            this.group.add(this.prevPointer.getGroup());
        }
    }

    LinkedNodeAnimationObject.prototype = new AnimationObject();

    LinkedNodeAnimationObject.prototype.getRect = function(){
        return this.rect;
    };

    LinkedNodeAnimationObject.prototype.getNextPointer = function(){
        return this.nextPointer;
    };

    LinkedNodeAnimationObject.prototype.getPrevPointer = function(){
        return this.prevPointer;
    };

    LinkedNodeAnimationObject.prototype.getGroup =function(){
        return this.group;
    };

    LinkedNodeAnimationObject.prototype.getRoot = function(){
        return this.group;
    };

    LinkedNodeAnimationObject.prototype.getPointTo = function(point){
        return this.getRect().getPointTo(point);
    };
    return LinkedNodeAnimationObject;
});