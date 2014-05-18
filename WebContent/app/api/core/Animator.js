define(["core/Constants", "core/AnimationEngine", "libs/kinetic","core/LayoutManager", "animgen/CodeAnimationGenerator", "anim/AnimationControls"], function(Constants,AnimationEngine,Kinetic,LayoutManager, CodeAnimationGenerator, AnimationControls) {


    function Animator(animationId, /*codeStatementLines,*/ configs) {
        this.animationId = animationId;
        this.configs = configs;
        this.animationType = configs[Constants.ANIMATION_TYPE];
        this.animationEngine = new AnimationEngine(/*animationId,*/this.configs[Constants.ANIMATION_UNIT_TIME]);
        this.stage = null;
        this.layoutManager = null;
        this.codeAnimationGenerator = null; //new CodeAnimationGenerator(this.animationId, codeStatementLines);
    }

    Animator.prototype.createStage = function () {
        var animatorRef = this;
        this.stage = new Kinetic.Stage({
            container: animatorRef.configs[Constants.STAGE_CONTAINERDIV],
            width: animatorRef.configs[Constants.STAGE_HEIGHT],
            height: animatorRef.configs[Constants.STAGE_WIDTH],
            opacity: animatorRef.configs[Constants.STAGE_OPACITY]
        });

        this.layoutManager = new LayoutManager(this.stage);
        if( this.animationType == Constants.ANIMATION_TYPE_CODE_ANIMATION){
            var controlConfigs = {};
            controlConfigs[Constants.ANIMATION_CONTROL_Y] = this.configs[Constants.ANIMATION_CONTROL_Y] ;
            controlConfigs[Constants.ANIMATION_CONTROL_X] = this.configs[Constants.ANIMATION_CONTROL_X] ;
            controlConfigs[Constants.ANIMATION_CONTROL_BUTTON_WIDTH] = this.configs[Constants.ANIMATION_CONTROL_BUTTON_WIDTH] ;
            controlConfigs[Constants.ANIMATION_CONTROL_BUTTON_HEIGHT] = this.configs[Constants.ANIMATION_CONTROL_BUTTON_HEIGHT];

            this.animationControl = new AnimationControls(this.configs,this.layoutManager.getLayer(),this,this.layoutManager);
        }

//        this.layoutManager.getLayer().red(animatorRef.configs[jsav.STAGE_COLOR_RED]);
//        this.layoutManager.getLayer().blue(animatorRef.configs[jsav.STAGE_COLOR_BLUE]);
//        this.layoutManager.getLayer().green(animatorRef.configs[jsav.STAGE_COLOR_GREEN]);
    };

    Animator.prototype.getAnimationId = function () {
        return this.animationId;
    };

    Animator.prototype.playCodeAnimation = function () {
        this.animationEngine.play();
    };

    Animator.prototype.pauseCodeAnimation = function () {
        this.animationEngine.pause();
    };

    Animator.prototype.forwardCodeAnimation = function () {
        this.animationEngine.forward();
    };

//    Animator.prototype.resumeCodeAnimation = function () {
//        this.animationEngine.resume();
//    };

//    Animator.prototype.resetCodeAnimation = function () {
//        this.animationEngine.reset();
//
//        var layer = this.layoutManager.getLayer();
//        layer.removeChildren();
//        layer.clear();
//        layer.draw();
//    };
    
    Animator.prototype.createCodeAnimationGenerator = function(codeStatementLines){
        this.codeAnimationGenerator = new CodeAnimationGenerator(this.animationId, codeStatementLines);
    };

    Animator.prototype.endAnimateLineExecution = function (statementNumber) {
        this.codeAnimationGenerator.generateEndCodeStatementAnimation(statementNumber);
    };

    Animator.prototype.startAnimateLineExecution = function (statementNumber) {
        this.codeAnimationGenerator.generateStartCodeStatementAnimation(statementNumber);
    };

    Animator.prototype.getAnimationEngine = function () {
        return this.animationEngine;
    };

    Animator.prototype.getLayoutManager = function () {
        return this.layoutManager;
    };

    Animator.prototype.getConfigs = function () {
        return this.configs;
    };

    return Animator;
});