/**
 * Created by nitiraj on 20/4/14.
 */
define(["animds/TextRectAnimationObject", "core/Logger", "animds/AnimationObject","animds/PointerAnimationObject", "libs/kinetic"], function (TextRectAnimationObject, Logger, AnimationObject, PointerAnimationObject, Kinetic) {

    function LinkedNodeAnimationObject(configs, hasNextPointer, hasPrevPointer, layer) {
        AnimationObject.call(this,"LinkedNodeAnimationObject",layer);
        this.rect = new TextRectAnimationObject(configs,layer);
        this.group = new Kinetic.Group();
        this.group.add(this.rect);

        if( hasNextPointer ){
            this.nextPointer = new PointerAnimationObject(configs,layer);
            this.nextPointer.pointTailTo(this.rect);
            this.group.add(this.nextPointer);
        }

        if( hasPrevPointer ){
            this.prevPointer = new PointerAnimationObject(configs,layer);
            this.prevPointer.pointTailTo(this.rect);
            this.group.add(this.prevPointer);
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
});