define(["Utils", "Animator", "CodeParser", "Defaults","Logger"], function (Utils, Animator, CodeParser, Defaults,Logger) {

    jsav = {
        animatorMap: [],
        currentCodeAnimationId: 0,

        resolveAnimatorConfigs: function (configs) {
            return Utils.overrideObject(Defaults, configs);
        },

        generateCodeAnimation: function (codeString, configs) {
            var animationId = this.currentCodeAnimationId;
            var codeParser = new CodeParser(codeString, animationId);
            var codeStatementLines = codeParser.getCodeStatementLines();
            var animatorConfigs = this.resolveAnimatorConfigs(configs);
            var animator = new Animator(animationId, codeStatementLines, animatorConfigs);// codeStatementLines, options
            this.animatorMap[animationId] = animator;

            var modifiedCode = codeParser.getModifiedCode();
            this.runCodeAndAnimate(animationId, modifiedCode);

            this.currentCodeAnimationId++;

            return animationId;
        },

        getAnimatorById: function (animationId) {
            return this.animatorMap[animationId];
        },

        runCodeAndAnimate: function (animationId, modifiedCode) {
            Logger.info("Executing the code : " + modifiedCode);
            var animator = this.getAnimatorById(animationId);
            animator.createStage();

            var head = document.head;

            var jsCodeScript = document.createElement("script");
            jsCodeScript.type = 'text/javascript';
            jsCodeScript.innerHTML = modifiedCode;

            head.appendChild(jsCodeScript);
        },

        playCodeAnimation: function (animationId) {
            var animator = this.animatorMap[animationId];
            animator.playCodeAnimation();
        },

        startAnimateLineExecution: function (statementNumber, animationId) {
            var animator = this.animatorMap[animationId];
            if (null == animator) {
                throw "Cannot Find the Animation with Id " + animationId;
            }

            animator.startAnimateLineExecution(statementNumber);
        },

        endAnimateLineExecution: function (statementNumber, animationId) {
            var animator = this.animatorMap[animationId];
            if (null == animator) {
                throw "Cannot Find the Animation with Id " + animationId;
            }

            animator.endAnimateLineExecution(statementNumber);
        }
    };

    return jsav;
});