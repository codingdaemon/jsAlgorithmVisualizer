/**
 * Created by nitiraj on 11/5/14.
 */
define([ "animgen/AnimationGenerator", "core/AnimationInput", "animds/BinaryTreeAnimationObject"],function(AnimationGenerator, AnimationInput, BinaryTreeAnimationObject){

    function BinaryTreeAnimationGenerator(animationId,name,thisBinaryTree, left,right,data){
        AnimationGenerator.call(this);
        this.name = name;
        this.animationId = animationId;
        this.animator = jsav.getAnimatorById(animationId);

        this.binaryTreeAO = new BinaryTreeAnimationObject(this.animator.getConfigs(), this.animator.getLayoutManager().getLayer(), this.animator.getAnimationEngine(), this.animator.getLayoutManager());
        this.animator.getAnimationEngine().push(new AnimationInput(this.binaryTreeAO, BinaryTreeAnimationObject.prototype.createObject, [thisBinaryTree,left,right,data]));
    }

    BinaryTreeAnimationGenerator.prototype = new AnimationGenerator();


    BinaryTreeAnimationGenerator.prototype.setRight = function(right){
        this.animator.getAnimationEngine().push(new AnimationInput(this.binaryTreeAO, BinaryTreeAnimationObject.prototype.setRight, [right]));
    };

    BinaryTreeAnimationGenerator.prototype.setLeft = function(left){
        this.animator.getAnimationEngine().push(new AnimationInput(this.binaryTreeAO, BinaryTreeAnimationObject.prototype.setLeft, [left]));
    };

    BinaryTreeAnimationGenerator.prototype.setData = function(data){
        this.animator.getAnimationEngine().push(new AnimationInput(this.binaryTreeAO, BinaryTreeAnimationObject.prototype.setData, [data]));
    };

    return BinaryTreeAnimationGenerator;
});