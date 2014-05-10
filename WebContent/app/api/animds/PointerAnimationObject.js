define(["animds/AnimationObject", "libs/kinetic", "core/Constants", "core/Point", "core/Logger","core/Utils"], function (AnimationObject, Kinetic, Constants, Point, Logger, Utils) {

    function PointerAnimationObject(configs, layer, group) {
        AnimationObject.call(this, "pointer", configs, layer);

        this.x1 = this.getConfigs()[ Constants.ARROW_FROMX];
        this.y1 = this.getConfigs()[ Constants.ARROW_FROMY];
        this.x2 = this.getConfigs()[ Constants.ARROW_TOX];
        this.y2 = this.getConfigs()[ Constants.ARROW_TOY];
        this.l = this.getConfigs()[ Constants.ARROW_HEAD_LENGTH];
        this.h = this.getConfigs()[ Constants.ARROW_HEAD_HEIGHT];
        this.tailColor = this.getConfigs()[ Constants.ARROW_TAIL_COLOR];
        this.headColor = this.getConfigs()[ Constants.ARROW_HEAD_COLOR];
        this.tailWidth = this.getConfigs()[ Constants.ARROW_TAIL_WIDTH];
        this.headWidth = this.getConfigs()[Constants.ARROW_HEAD_WIDTH];
        this.headSolid = this.getConfigs()[ Constants.ARROW_HEAD_SOLID];
        this.tailString = this.getConfigs()[ Constants.ARROW_TAIL_TEXT];
        this.tailTextFontSize = this.getConfigs()[ Constants.ARROW_TAIL_TEXT_FONT_SIZE];
        this.tailTextColor = this.getConfigs()[ Constants.ARROW_TAIL_TEXT_COLOR];
        this.tailTextFont = this.getConfigs()[ Constants.ARROW_TAIL_TEXT_FONT];

        this.headString = this.getConfigs()[ Constants.ARROW_HEAD_TEXT];
        this.headTextFontSize = this.getConfigs()[ Constants.ARROW_HEAD_TEXT_FONT_SIZE];
        this.headTextColor = this.getConfigs()[ Constants.ARROW_HEAD_TEXT_COLOR];
        this.headTextFont = this.getConfigs()[ Constants.ARROW_HEAD_TEXT_FONT];

        this.tailObject = null;
        this.headObject = null;

        if (Utils.isNullOrUndefined(group)) {
            this.group = new Kinetic.Group({
                draggable: true
            });
            this.originalGroup = this.group;
        } else {
            this.group = group;
        }

        this.tailLine = new Kinetic.Line({});
        this.headLine = new Kinetic.Line({});
        this.tailText = new Kinetic.Text({});
        this.headText = new Kinetic.Text({});

        this.group.add(this.tailLine);
        this.group.add(this.headLine);
        this.group.add(this.tailText);
        this.group.add(this.headText);

        this.draw();
    }

    PointerAnimationObject.prototype = new AnimationObject();

    PointerAnimationObject.prototype.draw = function () {

        var theta = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
        var beta = Math.asin(this.h / this.l);
        this.x3 = this.x2 - this.l * Math.cos(beta - theta);
        this.y3 = this.y2 + this.l * Math.sin(beta - theta);

        this.x4 = this.x2 - this.l * Math.sin(Math.PI / 2 - theta - beta);
        this.y4 = this.y2 - this.l * Math.cos(Math.PI / 2 - theta - beta);

        this.tailLine.points([this.x1, this.y1, this.x2, this.y2]);
        this.tailLine.stroke(this.tailColor);
        this.tailLine.strokeWidth(this.tailWidth);

        this.headLine.points([this.x3, this.y3, this.x4, this.y4, this.x2, this.y2, this.x3, this.y3]);
        this.headLine.stroke(this.headColor);
        this.headLine.strokeWidth(this.headWidth);
        this.headLine.closed(this.headSolid);
        this.headLine.fill(this.headColor);

        this.tailText.x(this.x1);
        this.tailText.y(this.y1);
        this.tailText.text(this.tailString);
        this.tailText.fontSize(this.tailTextFontSize);
        this.tailText.fontFamily(this.tailTextFont);
        this.tailText.fill(this.tailTextColor);

        this.headText.x(this.x2);
        this.headText.y(this.y2);
        this.headText.text(this.headString);
        this.headText.fontSize(this.headTextFontSize);
        this.headText.fontFamily(this.headTextFont);
        this.headText.fill(this.headTextColor);

        Logger.info("redrawing the line " + this);
        this.getLayer().draw();
    };

    PointerAnimationObject.prototype.getGroup = function () {
        return this.group;
    };

    PointerAnimationObject.prototype.getChildren = function () {
        return [this.headLine,this.tailLine,this.headText,this.tailText];
    };

    PointerAnimationObject.prototype.setGroup = function (group) {
        // move to the new group and set X,Y
        this.x1 = this.x1 + this.group.x() - group.x();
        this.y1 = this.y1 + this.group.y() - group.y();
        this.x2 = this.x2 + this.group.x() - group.x();
        this.y2 = this.y2 + this.group.y() - group.y();

        this.headLine.moveTo(group);
        this.tailLine.moveTo(group);
        this.headText.moveTo(group);
        this.tailText.moveTo(group);

        if( !Utils.isNullOrUndefined(this.originalGroup )){
            this.originalGroup.destroy();
            this.originalGroup = null;
        }

        this.group = group;

        this.draw();
    };

    PointerAnimationObject.prototype.moveXY = function (xdiff,ydiff) {
        this.x1 += xdiff;
        this.y1 += ydiff;
        this.x2 += xdiff;
        this.y2 += ydiff;

        this.draw();
    };

    PointerAnimationObject.prototype.getHeadLine = function () {
        return this.headLine;
    };

    PointerAnimationObject.prototype.getTailLine = function () {
        return this.tailLine;
    };

    PointerAnimationObject.prototype.getTailText = function () {
        return this.tailText;
    };

    PointerAnimationObject.prototype.onHeadPointTo = function () {
        Logger.info("called onHeadPointTo");
        var tailPoint = new Point(this.getTailX(), this.getTailY());
        var newHeadPoint = this.headObject.getPointTo(tailPoint);
        if (null == newHeadPoint) {
            Logger.info("head points to null at ");
            return;
        }

        this.setHeadPoint( new Point(
            Math.floor(newHeadPoint.getX()),
            Math.floor(newHeadPoint.getY())
            )
        );
    };

    PointerAnimationObject.prototype.pointHeadTo = function (obj) {

        if (this.headObject) {
            var eventName = "dragmove." + this.getId() + this.headObject.getId();
            this.headObject.getRoot().off(eventName);
            this.headObject = null;
        }

        if (null == obj) return;

        this.headObject = obj;

        var newEventName = "dragmove." + this.getId() + this.headObject.getId();
        var ref = this;
        this.headObject.getRoot().on(newEventName, function () {
            ref.onHeadPointTo();
        });

        this.onHeadPointTo(); // call once to set the pointer initially
    };

    PointerAnimationObject.prototype.getHeadX = function () {
//        return this.x2 + this.getGroup().x();
        return this.x2;
    };

    PointerAnimationObject.prototype.getHeadY = function () {
//        return this.y2 + this.getGroup().y();
        return this.y2;
    };

    PointerAnimationObject.prototype.getTailX = function () {
//        return this.x1 + this.getGroup().x();
        return this.x1;
    };

    PointerAnimationObject.prototype.getTailY = function () {
//        return this.y1 + this.getGroup().y();
        return this.y1;
    };

    PointerAnimationObject.prototype.setHeadX = function (x) {
//        this.x2  = x - this.getGroup().x();
        this.x2  = x ;
    };

    PointerAnimationObject.prototype.setHeadY = function (y) {
//        this.y2 = y - this.getGroup().y();
        this.y2 = y ;
    };

    PointerAnimationObject.prototype.setTailX = function (x) {
//        this.x1  = x - this.getGroup().x();
        this.x1  = x ;
    };

    PointerAnimationObject.prototype.setTailY = function (y) {
//        this.y1 = y - this.getGroup().y();
        this.y1 = y ;
    };

    PointerAnimationObject.prototype.onTailPointTo = function () {

        var headPoint = new Point(this.getHeadX(), this.getHeadY());
        var newTailPoint = this.tailObject.getPointTo(headPoint);

        if (null == newTailPoint) {
            Logger.info("tail points to null at ");
            return;
        }

        this.setTailPoint(new Point(Math.floor(newTailPoint.getX()), Math.floor(newTailPoint.getY())));
    };

    PointerAnimationObject.prototype.pointTailTo = function (obj) {

        if (this.tailObject) {
            var eventName = "dragmove." + this.getId() + this.tailObject.getId();
            this.tailObject.getRoot().off(eventName);
            this.tailObject = null;
        }

        if (null == obj) return;
        this.tailObject = obj;

        var newEventName = "dragmove." + this.getId() + this.tailObject.getId();
        var ref = this;
        this.tailObject.getRoot().on(newEventName, function () {
            ref.onTailPointTo();
        });

        this.onTailPointTo(); // call once to set the pointer initially
    };

    PointerAnimationObject.prototype.setPoints = function (x1, y1, x2, y2) {
        this.setTailX(x1);
        this.setTailY(y1);
        this.setHeadX(x2);
        this.setHeadY(y2);

        this.draw();
    };

    PointerAnimationObject.prototype.setTailPoint = function (point) {
        this.setTailX(point.getX());
        this.setTailY(point.getY());

        this.draw();
    };

    PointerAnimationObject.prototype.setHeadPoint = function (point) {
        this.setHeadX(point.getX());
        this.setHeadY(point.getY());

        this.draw();
    };

    PointerAnimationObject.prototype.setHeadText = function(headText){
        this.headString = headText;

        this.draw();
    };

    PointerAnimationObject.prototype.setTailText = function(tailText){
        this.tailString = tailText;

        this.draw();
    };

    PointerAnimationObject.prototype.getTailPoint = function(){
        return new Point(this.getTailX(),this.getTailY());
    };

    PointerAnimationObject.prototype.getHeadPoint = function(){
        return new Point(this.getHeadX(),this.getHeadY());
    };

    PointerAnimationObject.prototype.toString = function(){
        return "PointerAnimationObject[" + this.x1 + "," + this.y1 + "," + this.x2 + "," + this.y2 + ",tailText" + this.tailString + ", headText = " + this.headString + "]";
    };

    return PointerAnimationObject;
});