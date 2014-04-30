/**
 * Created by nitiraj on 27/4/14.
 */

define(["animgen/AnimationGenerator", "animds/LinkedListAnimationObject", "core/AnimationInput", "core/jsav"], function (AnimationGenerator, LinkedListAnimationObject, AnimationInput, jsav) {

    function LinkedListAnimationGenerator(animationId, name){
        AnimationGenerator.call(this);
        this.name = name;
        this.animationId = animationId;
        this.animator = jsav.getAnimatorById(animationId);
        this.linkedlistAO = new LinkedListAnimationObject(this.animator.getConfigs(), animationId, this.animator.getLayoutManager(), this.animator.getLayoutManager().getLayer(), this.animator.getAnimationEngine());
        this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.createObject, []));
    }

    LinkedListAnimationGenerator.prototype.addFront = function (data) {
        this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.addFront, [data]));
    };

    LinkedListAnimationGenerator.prototype.addLast = function (data) {
        this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.addLast, [data]));
    };

    LinkedListAnimationGenerator.prototype.removeAt = function (index) {
        this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.removeAt, [index]));
    };

    LinkedListAnimationGenerator.prototype.elementAt = function (index) {
    	this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.elementAt, [index]));
    };

    LinkedListAnimationGenerator.prototype.getLength = function () {
    	this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.getLength, []));
    };

    LinkedListAnimationGenerator.prototype.getHead = function(){
    	this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.getHead, []));
    };

    LinkedListAnimationGenerator.prototype.getTail = function(){
    	this.animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.getTail, []));
    };

    LinkedListAnimationGenerator.prototype.toString = function(){
        return "[LinkedListAnimationGenerator linkedListAO= " + this.linkedlistAO + "]";
    };

    return LinkedListAnimationGenerator;
});