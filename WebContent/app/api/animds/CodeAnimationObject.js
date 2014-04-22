define(["animds/AnimationObject", "libs/kinetic","core/Constants","core/Logger"], function (AnimationObject, Kinetic,Constants,Logger) {

    function CodeAnimationObject(animationId, name, codeLines) {
        this.animationId = animationId;
        this.animator = jsav.getAnimatorById(animationId);
        AnimationObject.call(this, name);
        this.codeLines = codeLines;
        this.allCodeText = [];
        this.codeStatementText = [];
        this.group = new Kinetic.Group();
        this.group.draggable(true);
    }

    CodeAnimationObject.prototype = new AnimationObject();

    CodeAnimationObject.prototype.toString = function () {
        return "CodeAnimationObject[ name = " + this.name + "]";
    };

    CodeAnimationObject.prototype.createObject = function () {
        var nextY = 0;
        var nextX = 0;
        for (var i = 0; i < this.codeLines.length; i++) {
            var dummyCAO = this;
            var textLine = new Kinetic.Text({
                x: nextX,
                y: nextY,
                text: dummyCAO.codeLines[i].code.trim(),
                fontSize: dummyCAO.animator.getConfigs()[Constants.CODE_FONT_SIZE],
                fill: dummyCAO.animator.getConfigs()[Constants.CODE_COLOR]
            });

            nextY += textLine.height();

            this.allCodeText.push(textLine);
            this.group.add(textLine);

            if (this.codeLines[i].isCodeStatement) {
                this.codeStatementText.push(textLine);
            }
        }

        var layer = this.animator.layoutManager.getLayer();
        layer.add(this.group);
        layer.draw();

        this.animator.getAnimationEngine().next();
    };

    /**
     * get the code statement. Highlight it and change the font for just a sec
     * @param codeStatementNumber
     * @param animationEngine
     */
    CodeAnimationObject.prototype.startCodeStatementAnimation = function (codeStatementNumber) {
        var textLine = this.codeStatementText[codeStatementNumber];
//        Logger.info("inside startCodeStatementAnimation for textLine : " + textLine.text());
//        Logger.info("setting the color to : " + this.animator.getConfigs()[Constants.CODE_HIGHLIGHT_COLOR]);
        textLine.fill(this.animator.getConfigs()[Constants.CODE_HIGHLIGHT_COLOR]);
        textLine.fontSize(this.animator.getConfigs()[Constants.CODE_HIGHLIGHT_FONT_SIZE]);
        var layer = this.animator.getLayoutManager().getLayer();
        layer.draw();

        this.animator.getAnimationEngine().next();
    };

    /**
     * get the code statement. Highlight it and change the font for just a sec
     * @param codeStatementNumber
     */
    CodeAnimationObject.prototype.endCodeStatementAnimation = function (codeStatementNumber) {
        var textLine = this.codeStatementText[codeStatementNumber];
        textLine.fill(this.animator.getConfigs()[Constants.CODE_COLOR]);
        textLine.fontSize(this.animator.getConfigs()[Constants.CODE_FONT_SIZE]);

        var layer = this.animator.getLayoutManager().getLayer();
        layer.draw();

        this.animator.getAnimationEngine().next();
    };
    return CodeAnimationObject;
});