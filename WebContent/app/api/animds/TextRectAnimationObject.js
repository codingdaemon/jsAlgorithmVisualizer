define(["animds/AnimationObject", "libs/kinetic", "core/Utils","core/Logger", "core/Constants"], function (AnimationObject, Kinetic, Utils, Logger, Constants) {

    function TextRectAnimationObject(configs, layer) {
        AnimationObject.call(this, "TextRectAnimationObject", layer);
        this.configs = configs;
        this.data = configs["data"];
        this.group = new Kinetic.Group();
        var ref = this;
        this.text = new Kinetic.Text({
            x: ref.configs["x"],
            y: ref.configs["y"],
            text: ref.data.toString(),
            fontSize: ref.configs[Constants.TEXT_FONT_SIZE],
            fontFamily: ref.configs[Constants.TEXT_FONT_FAMILY],
            fill: ref.configs[Constants.TEXT_FILL_COLOR],
            width: ref.configs[Constants.TEXT_WIDTH],
            align: ref.configs[Constants.TEXT_ALIGN]
        });

        this.rect = new Kinetic.Rect({
            x: ref.configs["x"],
            y: ref.configs["y"],
            width: ref.configs[Constants.RECT_WIDTH],
            height: ref.configs[Constants.RECT_HEIGHT],
            fill: ref.configs[Constants.RECT_FILL_COLOR],
            stroke: ref.configs[Constants.RECT_STROKE_COLOR],
            strokeWidth: ref.configs[Constants.RECT_STROKE_WIDTH]
        });

        this.group.add(this.rect);
        this.group.add(this.text);
    }

    TextRectAnimationObject.prototype = new AnimationObject();

    /**
     * return the root object on which the events can be registered.
     */
    TextRectAnimationObject.prototype.getRoot = function () {
        return this.group;
    };

    TextRectAnimationObject.prototype.getGroup = function () {
        return this.group;
    };

    TextRectAnimationObject.prototype.setData = function( data ){
        this.data = data;
        this.text.text(data.toString());
    };

    TextRectAnimationObject.prototype.getRect = function () {
        return this.rect;
    };
    TextRectAnimationObject.prototype.getText = function () {
        return this.text;
    };

    TextRectAnimationObject.prototype.getPointTo = function (point) {
        // draw a line from point to the center of the rect and see where this line cuts the rectangle that would be
        // our pointTo
        var x1 = this.rect.x();
        var y1 = this.rect.y();
        var width = this.rect.width();
        var height = this.rect.height();

        Logger.info("rect x = " + x1 + " y = " + y1 + " width = " + width + " height = " + height);
        var x2 = x1 + width;
        var y2 = y1;

        var x3 = x2;
        var y3 = y1 + height;

        var x4 = x1;
        var y4 = y1 + height;

        var centerX = x1 + width / 2;
        var centerY = y1 + height / 2;

        var p1 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x1, y1, x2, y2);
        if (null != p1) return p1;

        var p2 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x2, y2, x3, y3);
        if (null != p2) return p2;

        var p3 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x3, y3, x4, y4);
        if (null != p3) return p3;

        var p4 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x4, y4, x1, y1);
        if (null != p4) return p4;

        return null;
    };

    return TextRectAnimationObject;
});