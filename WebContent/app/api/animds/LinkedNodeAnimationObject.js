/**
 * Created by nitiraj on 20/4/14.
 */
define([ "core/Utils", "animds/TextRectAnimationObject", "core/Logger", "animds/AnimationObject","animds/PointerAnimationObject", "libs/kinetic", "animds/LinkedNodeExtension"],
    function (Utils, TextRectAnimationObject, Logger, AnimationObject, PointerAnimationObject, Kinetic, LinkedNodeExtension) {

    function LinkedNodeAnimationObject(configs, hasNextPointer, hasPrevPointer, layer, group) {
        AnimationObject.call(this, "LinkedNodeAnimationObject", configs, layer);

        if (Utils.isNullOrUndefined(group)) {
            this.group = new Kinetic.Group({
                draggable: true
            });

            this.originalGroup = this.group;
        } else {
            this.group = group;
        }

        this.rect = new TextRectAnimationObject(configs,layer,this.group);

        if( hasNextPointer ){
        	var nextPointerConfigs = configs["nextPointerConfigs"] ;
            this.nextPointer = new PointerAnimationObject(nextPointerConfigs,layer,group);
            this.nextPointer.pointTailTo(this.rect);
        }

        if( hasPrevPointer ){
        	var prevPointerConfigs = configs["prevPointerConfigs"];
            this.prevPointer = new PointerAnimationObject(prevPointerConfigs,layer,group);
            this.prevPointer.pointTailTo(this.rect);
        }
    }

    LinkedNodeAnimationObject.prototype = new AnimationObject();

    LinkedNodeAnimationObject.prototype.getRect = function(){
        return this.rect;
    };

    LinkedNodeAnimationObject.prototype.getChildren = function(){
        var children = this.rect.getChildren();
        if( this.nextPointer ){
            children = children.concat(this.nextPointer.getChildren());
        }

        if( this.prevPointer){
            children = children.concat(this.prevPointer.getChildren());
        }

        return children;
    };

    LinkedNodeAnimationObject.prototype.moveXY = function(xdiff,ydiff){

        this.rect.moveXY(xdiff,ydiff);

        if( !Utils.isNullOrUndefined(this.nextPointer)){
            this.nextPointer.moveXY(xdiff,ydiff);
        }

        if( !Utils.isNullOrUndefined(this.prevPointer)){
            this.prevPointer.moveXY(xdiff,ydiff);
        }
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

    LinkedNodeAnimationObject.prototype.setGroup =function(group){
        this.rect.setGroup(group);
        if( this.nextPointer){
            this.nextPointer.setGroup(group);
        }
        if( this.prevPointer){
            this.prevPointer.setGroup(group);
        }

        if( !Utils.isNullOrUndefined(this.originalGroup)){
            this.originalGroup.destroy();
            this.originalGroup = null;
        }
        this.group = group;
    };

    LinkedNodeAnimationObject.prototype.getRoot = function(){
        return this.rect.getRoot();
    };

    LinkedNodeAnimationObject.prototype.getPointTo = function(point){
        return this.getRect().getPointTo(point);
    };
    return LinkedNodeAnimationObject;
});