define(["animgen/AnimationGenerator", "animds/StackAnimationObject", "core/AnimationInput"], function (AnimationGenerator, StackAnimationObject, AnimationInput) {

    function StackAnimationGenerator(animationId, name) {
        AnimationGenerator.call(this);
        this.name = name;
        this.animationId = animationId;
        this.animator = jsav.getAnimatorById(this.animationId);
//        function StackAnimationObject(configs, layer, animationEngine, layoutManager) {
        this.layoutManager = this.animator.getLayoutManager();
        this.stackAnimObject = new StackAnimationObject(this.animator.getConfigs(),this.layoutManager.getLayer(),this.animator.getAnimationEngine(), this.layoutManager);

        this.animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.createObject, []));
    }

    StackAnimationGenerator.prototype = new AnimationGenerator();

    StackAnimationGenerator.prototype.toString = function () {
        return "StackAnimationGenerator[ name = " + this.name + ", stackAnimObject = " + this.stackAnimObject + "]";
    };

    StackAnimationGenerator.prototype.push = function (data) {
//        var animator = jsav.getAnimatorById(this.animationId);
        this.animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.push, [data]));
    };

    StackAnimationGenerator.prototype.pop = function () {
//        var animator = jsav.getAnimatorById(this.animationId);
        this.animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.pop, []));
    };
    return StackAnimationGenerator;
});