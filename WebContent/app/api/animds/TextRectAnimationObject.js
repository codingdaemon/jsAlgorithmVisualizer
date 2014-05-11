define(["animds/AnimationObject", "libs/kinetic", "core/Utils", "core/Logger", "core/Constants"], function (AnimationObject, Kinetic, Utils, Logger, Constants) {

    function TextRectAnimationObject(configs, layer, group) {
        AnimationObject.call(this, "TextRectAnimationObject", configs, layer );

        this.data = this.getConfigs()["data"];
        if (Utils.isNullOrUndefined(group)) {
            this.group = new Kinetic.Group({
                draggable: true
            });
            this.originalGroup = this.group;
        } else {
            this.group = group;
        }

        this.x = this.getConfigs()["x"];
        this.y = this.getConfigs()["y"];
        this.rectWidth = this.getConfigs()[Constants.RECT_WIDTH];
        this.rectHeight = this.getConfigs()[Constants.RECT_HEIGHT];
        this.rectFill = this.getConfigs()[Constants.RECT_FILL_COLOR];
        this.rectStroke = this.getConfigs()[Constants.RECT_STROKE_COLOR];
        this.rectStrokeWidth = this.getConfigs()[Constants.RECT_STROKE_WIDTH];
        this.textString = this.data.toString();
        this.fontSize = this.getConfigs()[Constants.TEXT_FONT_SIZE];
        this.fontFamily = this.getConfigs()[Constants.TEXT_FONT_FAMILY];
        this.textFill = this.getConfigs()[Constants.TEXT_FILL_COLOR];
        this.textWidth = this.getConfigs()[Constants.TEXT_WIDTH];
        this.textAlign = this.getConfigs()[Constants.TEXT_ALIGN];

        this.text = new Kinetic.Text({
        });

        this.rect = new Kinetic.Rect({
        });

        this.group.add(this.rect);
        this.group.add(this.text);

        this.draw();
    }

    TextRectAnimationObject.prototype = new AnimationObject();


    TextRectAnimationObject.prototype.draw = function () {
        this.text.x(this.x);
        this.text.y(this.y);
        this.text.text(this.textString);
        this.text.fontSize(this.fontSize);
        this.text.fontFamily(this.fontFamily);
        this.text.fill(this.textFill);
        this.text.width(this.textWidth);
        this.text.align(this.textAlign);

        this.rect.x(this.x);
        this.rect.y(this.y);
        this.rect.width(this.rectWidth);
        this.rect.height(this.rectHeight);
        this.rect.fill(this.rectFill);
        this.rect.stroke(this.rectStroke);
        this.rect.strokeWidth(this.rectStrokeWidth);

        this.getLayer().draw();
    };

    TextRectAnimationObject.prototype.getChildren = function () {
        return [this.rect, this.text];
    };

    TextRectAnimationObject.prototype.getRectWidth = function () {
        return this.rectWidth;
    };
    TextRectAnimationObject.prototype.getRectHeight = function () {
        return this.rectHeight;
    };
    TextRectAnimationObject.prototype.getRectFill = function () {
        return this.rectFill;
    };
    TextRectAnimationObject.prototype.getRectStroke = function () {
        return this.rectStroke;
    };
    TextRectAnimationObject.prototype.getRectStrokeWidth = function () {
        return this.rectStrokeWidth;
    };
    TextRectAnimationObject.prototype.getData = function () {
        return this.data;
    };
    TextRectAnimationObject.prototype.getFontSize = function () {
        return this.fontSize;
    };
    TextRectAnimationObject.prototype.getFontFamily = function () {
        return this.fontFamily;
    };
    TextRectAnimationObject.prototype.getTextFill = function () {
        return this.textFill;
    };
    TextRectAnimationObject.prototype.getTextWidth = function () {
        return this.textWidth;
    };
    TextRectAnimationObject.prototype.getTextAlign = function () {
        return this.textAlign;
    };

    TextRectAnimationObject.prototype.setRectWidth = function (value) {
        this.rectWidth = value;
    };
    TextRectAnimationObject.prototype.setRectHeight = function (value) {
        this.rectHeight = value;
    };
    TextRectAnimationObject.prototype.setRectFill = function (value) {
        this.rectFill = value;
        this.getRect().fill(this.rectFill);
        this.draw();
    };

    TextRectAnimationObject.prototype.setRectStroke = function (value) {
        this.rectStroke = value;
    };
    TextRectAnimationObject.prototype.setRectStrokeWidth = function (value) {
        this.rectStrokeWidth = value;
    };
    TextRectAnimationObject.prototype.setData = function (value) {
        this.data = value;
        if (null != this.data) {
            this.textString = this.data.toString();
        } else {
            this.textString = "";
        }
        this.draw();
    };
    TextRectAnimationObject.prototype.setFontSize = function (value) {
        this.fontSize = value;
    };
    TextRectAnimationObject.prototype.setFontFamily = function (value) {
        this.fontFamily = value;
    };
    TextRectAnimationObject.prototype.setTextFill = function (value) {
        this.textFill = value;
    };
    TextRectAnimationObject.prototype.setTextWidth = function (value) {
        this.textWidth = value;
    };
    TextRectAnimationObject.prototype.setTextAlign = function (value) {
        this.textAlign = value;
    };

    TextRectAnimationObject.prototype.getX = function () {
//        return this.x + this.group.x();
        return this.x ;
    };

    TextRectAnimationObject.prototype.getY = function () {
//        return this.y + this.group.y();
        return this.y;
    };

    TextRectAnimationObject.prototype.setX = function (x) {
//        this.x  = x - this.group.x();
        this.x  = x ;
    };

    TextRectAnimationObject.prototype.setY = function (y) {
//        this.y = y - this.group.y();
        this.y = y ;
    };
    /**
     * return the root object on which the events can be registered.
     */
    TextRectAnimationObject.prototype.getRoot = function () {
        return this.rect;
    };

    TextRectAnimationObject.prototype.getGroup = function () {
        return this.group;
    };

    TextRectAnimationObject.prototype.moveXY = function (xdiff,ydiff) {
        this.x += xdiff;
        this.y += ydiff;

        this.draw();
    };

    TextRectAnimationObject.prototype.setGroup = function (group) {
        // move from old group to new group keeping the absolute position same
//        var relRectX = this.x;
//        var relRectY = this.y;
//        var curGroupX = this.group.x();
//        var curGroupY = this.group.y();
//        var absRectX = relRectX + curGroupX ;
//        var absRectY = relRectY + curGroupY ;
//        var newGroupX = group.x();
//        var newGroupY = group.y();

        this.x = this.x + this.group.x() - group.x() ; // note x and y of rect and text are same.
        this.y = this.y + this.group.y() - group.y() ;

        this.rect.moveTo(group);
        this.text.moveTo(group);

        if( !Utils.isNullOrUndefined(this.originalGroup) ){
            this.originalGroup.destroy();
            this.originalGroup = null;
        }

        this.group = group ; // set new group

        this.draw();
    };

//    TextRectAnimationObject.prototype.setData = function (data) {
//        this.data = data;
//        this.text.text(data.toString());
//    };

    TextRectAnimationObject.prototype.getRect = function () {
        return this.rect;
    };
    TextRectAnimationObject.prototype.getText = function () {
        return this.text;
    };

    TextRectAnimationObject.prototype.getPointTo = function (point) {
        // draw a line from point to the center of the rect and see where this line cuts the rectangle that would be
        // our pointTo
        var x1 = this.getX();
        var y1 = this.getY();
        var width = this.getRectWidth();
        var height = this.getRectHeight();

        Logger.info("rect x = " + x1 + " y = " + y1 + " width = " + width + " height = " + height);
        var x2 = x1 + width;
        var y2 = y1;

        var x3 = x2;
        var y3 = y1 + height;

        var x4 = x1;
        var y4 = y1 + height;

        var centerX = x1 + width / 2;
        var centerY = y1 + height / 2;

        // if point and center are on opposite side
        if (Utils.getPointsPositionWrtLine(x1, y1, x2, y2, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x1, y1, x2, y2, centerX, centerY)) {
            var p1 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x1, y1, x2, y2);
            if (null != p1) return p1;
        }

        if (Utils.getPointsPositionWrtLine(x2, y2, x3, y3, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x2, y2, x3, y3, centerX, centerY)) {
            var p2 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x2, y2, x3, y3);
            if (null != p2) return p2;
        }

        if (Utils.getPointsPositionWrtLine(x3, y3, x4, y4, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x3, y3, x4, y4, centerX, centerY)) {
            var p3 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x3, y3, x4, y4);
            if (null != p3) return p3;
        }

        if (Utils.getPointsPositionWrtLine(x4, y4, x1, y1, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x4, y4, x1, y1, centerX, centerY)) {
            var p4 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x4, y4, x1, y1);
            if (null != p4) return p4;
        }

        return null;
    };

    return TextRectAnimationObject;
});