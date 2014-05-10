define(["animds/AnimationObject", "libs/kinetic","core/Constants","core/Logger"], function (AnimationObject, Kinetic,Constants,Logger) {

    function CodeAnimationObject( codeLines, configs, layer, animationEngine, layoutManager ) {
        AnimationObject.call(this, "CodeAnimationObject", configs, layer, animationEngine, layoutManager );
        this.codeLines = codeLines;
        this.allCodeText = [];
        this.codeStatementText = [];
        this.group = new Kinetic.Group();
        this.group.draggable(true);

        this.getLayer().add(this.group);
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
                fontSize: dummyCAO.getConfigs()[Constants.CODE_FONT_SIZE],
                fill: dummyCAO.getConfigs()[Constants.CODE_COLOR],
                fontFamily: dummyCAO.getConfigs()[Constants.TEXT_FONT_FAMILY]
            });

            nextY += textLine.height();

            this.allCodeText.push(textLine);
            this.group.add(textLine);

            if (this.codeLines[i].isCodeStatement) {
                this.codeStatementText.push(textLine);
            }
        }

//        var layer = ;
//        layer.add(this.group);
        this.getLayer().draw();

        this.getAnimationEngine().next();
    };

    /**
     * get the code statement. Highlight it and change the font for just a sec
     * @param codeStatementNumber
     * @param animationEngine
     */
    CodeAnimationObject.prototype.startCodeStatementAnimation = function (codeStatementNumber) {
        var textLine = this.codeStatementText[codeStatementNumber];
//        Logger.info("inside startCodeStatementAnimation for textLine : " + textLine.text());
//        Logger.info("setting the color to : " + this.getConfigs()[Constants.CODE_HIGHLIGHT_COLOR]);
        textLine.fill(this.getConfigs()[Constants.CODE_HIGHLIGHT_COLOR]);
        textLine.fontSize(this.getConfigs()[Constants.CODE_HIGHLIGHT_FONT_SIZE]);
        var layer = this.getLayer();
        layer.draw();

        this.getAnimationEngine().next();
    };

    /**
     * get the code statement. Highlight it and change the font for just a sec
     * @param codeStatementNumber
     */
    CodeAnimationObject.prototype.endCodeStatementAnimation = function (codeStatementNumber) {
        var textLine = this.codeStatementText[codeStatementNumber];
        textLine.fill(this.getConfigs()[Constants.CODE_COLOR]);
        textLine.fontSize(this.getConfigs()[Constants.CODE_FONT_SIZE]);

        var layer = this.getLayer();
        layer.draw();

        this.getAnimationEngine().next();
    };
    return CodeAnimationObject;
});