/**
 * Created by nitiraj on 27/4/14.
 */

define(["animgen/AnimationGenerator", "animds/LinkedListAnimationObject", "core/AnimationInput"], function (AnimationGenerator, LinkedListAnimationObject, AnimationInput) {

    function LinkedListAnimationGenerator(animationId, name){
        AnimationGenerator.call(this);
        this.name = name;
        this.animationId = animationId;
        this.linkedlistAO = new LinkedListAnimationObject(animationId, name);
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, LinkedListAnimationObject.prototype.createObject, []));
    }


    LinkedListAnimationGenerator.prototype.addFront = function (data) {
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.addFront, [data]));
    };

    LinkedListAnimationGenerator.prototype.addLast = function (data) {
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.addLast, [data]));
    };

    LinkedListAnimationGenerator.prototype.removeAt = function (index) {
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.linkedlistAO, LinkedListAnimationObject.prototype.removeAt, [index]));
    };

    LinkedListAnimationGenerator.prototype.elementAt = function (index) {
        Logger.info("No animation for this method.");
    };

    LinkedListAnimationGenerator.prototype.getLength = function () {
        Logger.info("No animation for this method.");
    };

    LinkedListAnimationGenerator.prototype.getHead = function(){
        Logger.info("No animation for this method.");
    };

    LinkedListAnimationGenerator.prototype.getTail = function(){
        Logger.info("No animation for this method.");
    };

    LinkedListAnimationGenerator.prototype.toString = function(){
        return "[LinkedListAnimationGenerator linkedListAO= " + this.linkedlistAO + "]";
    };

    return LinkedListAnimationGenerator;
});