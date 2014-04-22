define(["animds/AnimationObject", "libs/kinetic", "core/Constants", "core/Point", "core/Logger"], function (AnimationObject, Kinetic, Constants, Point, Logger) {

    function Pointer(configs, layer) {
        AnimationObject.call(this, "pointer", layer);
        this.x1 = configs[ Constants.ARROW_FROMX];
        this.y1 = configs[ Constants.ARROW_FROMY];
        this.x2 = configs[ Constants.ARROW_TOX];
        this.y2 = configs[ Constants.ARROW_TOY];
        this.l = configs[ Constants.ARROW_HEAD_LENGTH];
        this.h = configs[ Constants.ARROW_HEAD_HEIGHT];
        this.tailColor = configs[ Constants.ARROW_TAIL_COLOR];
        this.headColor = configs[ Constants.ARROW_HEAD_COLOR];
        this.tailWidth = configs[ Constants.ARROW_TAIL_WIDTH];
        this.headWidth = configs[Constants.ARROW_HEAD_WIDTH];
        this.headSolid = configs[ Constants.ARROW_HEAD_SOLID];
        this.text = configs[ Constants.ARROW_TAIL_TEXT];
        this.tailTextFontSize = configs[ Constants.ARROW_TAIL_TEXT_FONT_SIZE];
        this.tailTextColor = configs[ Constants.ARROW_TAIL_TEXT_COLOR];
        this.tailTextFont = configs[ Constants.ARROW_TAIL_TEXT_FONT];

        this.tailObject = null;
        this.headObject = null;

        this.group = new Kinetic.Group({
            draggable: true
        });
        this.tailLine = new Kinetic.Line({});
        this.headLine = new Kinetic.Line({});
        this.tailText = new Kinetic.Text({});

        this.group.add(this.tailLine);
        this.group.add(this.headLine);
        this.group.add(this.tailText);

        this.draw();
    }

    Pointer.prototype = new AnimationObject();

    Pointer.prototype.draw = function () {

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

        if (this.text) {
            this.tailText.x(this.x1);
            this.tailText.y(this.y1);
            this.tailText.text(this.text);
            this.tailText.fontSize(this.tailTextFontSize);
            this.tailText.fontFamily(this.tailTextFont);
            this.tailText.fill(this.tailTextColor);
        }
        Logger.info("redrawing the line ");
        this.getLayer().draw();
    };

    Pointer.prototype.getGroup = function () {
        return this.group;
    };

    Pointer.prototype.getHeadLine = function () {
        return this.headLine;
    };

    Pointer.prototype.getTailLine = function () {
        return this.tailLine;
    };

    Pointer.prototype.getTailText = function () {
        return this.tailText;
    };

    Pointer.prototype.onHeadPointTo = function () {
        Logger.info("called onHeadPointTo");
        var tailPoint = new Point(this.x1, this.y1);
        var newHeadPoint = this.headObject.getPointTo(tailPoint);
        if( null == newHeadPoint ){
            Logger.info("head points to null at ");
            return;
        }
//        Logger.info("got new head Point : " + newHeadPoint);
        this.x2 = Math.floor(newHeadPoint.getX());
        this.y2 = Math.floor(newHeadPoint.getY());

        this.draw();
    };

    Pointer.prototype.pointHeadTo = function (obj) {

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

    Pointer.prototype.onTailPointTo = function () {

        var headPoint = new Point(this.x2, this.y2);
        var newTailPoint = this.tailObject.getPointTo(headPoint);

        if( null == newTailPoint ){
            Logger.info("tail points to null at ");
            return;
        }
        this.x1 = Math.floor(newTailPoint.getX());
        this.y1 = Math.floor(newTailPoint.getY());


        this.draw();
    };

    Pointer.prototype.pointTailTo = function (obj) {

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
    return Pointer;
});