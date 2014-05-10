define(["animgen/AnimationGenerator", "core/AnimationInput", "animds/CodeAnimationObject"], function (AnimationGenerator, AnimationInput, CodeAnimationObject) {
    function CodeAnimationGenerator(animationId, codeStatementLines) {
        this.animationId = animationId;
        AnimationGenerator.call(this);
        this.codeStatementLines = codeStatementLines;
        this.animator = jsav.getAnimatorById(this.animationId);
        this.layoutManager = this.animator.getLayoutManager();
        this.codeAnimObject = new CodeAnimationObject(this.codeStatementLines,this.animator.getConfigs(), this.layoutManager.getLayer(),this.animator.getAnimationEngine(), this.layoutManager );

        this.animator.getAnimationEngine().push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.createObject, []));
    }

    CodeAnimationGenerator.prototype = new AnimationGenerator();

    CodeAnimationGenerator.prototype.generateStartCodeStatementAnimation = function (statementNumber) {
//        var animator = jsav.getAnimatorById(this.animationId);
        this.animator.getAnimationEngine().push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.startCodeStatementAnimation, [statementNumber]));
    };

    CodeAnimationGenerator.prototype.generateEndCodeStatementAnimation = function (statementNumber) {
//        var animator = jsav.getAnimatorById(this.animationId);
        this.animator.getAnimationEngine().push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.endCodeStatementAnimation, [statementNumber]));
    };

    return CodeAnimationGenerator;
});