/**
 * Created by nitiraj on 20/4/14.
 */
define(["animds/TextRect", "core/Logger", "animds/AnimationObject","animds/Pointer", "libs/kinetic"], function (TextRect, Logger, AnimationObject, Pointer, Kinetic) {

    function LinkedNode(configs, hasNextPointer, hasPrevPointer, layer) {
        AnimationObject.call(this,"LinkedNode",layer);
        this.rect = new TextRect(configs,layer);
        this.group = new Kinetic.Group();
        this.group.add(this.rect);

        if( hasNextPointer ){
            this.nextPointer = new Pointer(configs,layer);
            this.nextPointer.pointTailTo(this.rect);
            this.group.add(this.nextPointer);
        }

        if( hasPrevPointer ){
            this.prevPointer = new Pointer(configs,layer);
            this.prevPointer.pointTailTo(this.rect);
            this.group.add(this.prevPointer);
        }
    }

    LinkedNode.prototype = new AnimationObject();

    LinkedNode.prototype.getRect = function(){
        return this.rect;
    };

    LinkedNode.prototype.getNextPointer = function(){
        return this.nextPointer;
    };

    LinkedNode.prototype.getPrevPointer = function(){
        return this.prevPointer;
    };

    LinkedNode.prototype.getGroup =function(){
        return this.group;
    };

    LinkedNode.prototype.getRoot = function(){
        return this.group;
    };
});