define(["animgen/AnimationGenerator", "core/AnimationInput", "animds/CodeAnimationObject"], function (AnimationGenerator, AnimationInput, CodeAnimationObject) {
    function CodeAnimationGenerator(animationId, codeStatementLines) {
        this.animationId = animationId;
        AnimationGenerator.call(this);
        this.codeStatementLines = codeStatementLines;
        this.codeAnimObject = new CodeAnimationObject(animationId, "JavaScript Code", this.codeStatementLines);
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.createObject, []));
    }

    CodeAnimationGenerator.prototype = new AnimationGenerator();

    CodeAnimationGenerator.prototype.generateStartCodeStatementAnimation = function (statementNumber) {
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.startCodeStatementAnimation, [statementNumber]));
    };

    CodeAnimationGenerator.prototype.generateEndCodeStatementAnimation = function (statementNumber) {
        var animator = jsav.getAnimatorById(this.animationId);
        animator.getAnimationEngine().push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.endCodeStatementAnimation, [statementNumber]));
    };

    return CodeAnimationGenerator;
});