/**
 * Created by nitiraj on 10/5/14.
 */
define(["core/Logger", "animds/ArrayAnimationObject", "core/AnimationInput"], function(Logger, ArrayAnimationObject, AnimationInput){

    function ArrayAnimationGenerator(animationId, name, size){
        this.animationId = animationId;
        this.animator = jsav.getAnimatorById(animationId);
        this.animationEngine = this.animator.getAnimationEngine();
        this.name = name;
        this.animObject = new ArrayAnimationObject(this.animator.getConfigs(), this.animator.getLayoutManager().getLayer(), this.animationEngine, this.animator.getLayoutManager()) ;
        this.animationEngine.push(new AnimationInput(this.animObject,ArrayAnimationObject.prototype.createObject, [size]));
    }

    ArrayAnimationGenerator.prototype.at = function(index){
        Logger.info("ArrayAnimationGenerator.at(index) with index = " + index);
        this.animationEngine.push(new AnimationInput(this.animObject, ArrayAnimationObject.prototype.at, [index]));
    };

    ArrayAnimationGenerator.prototype.set = function(index, value){
        Logger.info("ArrayAnimationGenerator.set(index,value) with index = " + index + ", value = " + value);
        this.animationEngine.push(new AnimationInput(this.animObject, ArrayAnimationObject.prototype.set, [index,value]));
    };

    return ArrayAnimationGenerator;
});