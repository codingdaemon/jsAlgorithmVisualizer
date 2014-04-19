function TextRect(configs,layer) {
    AnimationObject.call(this,"TextRect",layer);
    this.configs = configs;
    this.group = new Kinetic.Group();
    var ref = this;
    this.text = new Kinetic.Text({
        x: ref.configs["x"],
        y: ref.configs["y"],
        text: ref.configs["text.value"],
        fontSize: ref.configs["text.font.size"],
        fontFamily: ref.configs["text.font.family"],
        fill: ref.configs["text.fill.color"],
        width: ref.configs["text.width"],
        align: ref.configs["text.align"]
    });

    this.rect = new Kinetic.Rect({
        x: ref.configs["x"],
        y: ref.configs["y"],
        width: ref.configs["rect.width"],
        height: ref.configs["rect.height"],
        fill: ref.configs["rect.fill.color"],
        stroke: ref.configs["rect.stroke.color"],
        strokeWidth: ref.configs["rect.stroke.width"]
    });

    this.group.add(this.rect);
    this.group.add(this.text);
}

TextRect.prototype = new AnimationObject();

/**
 * return the root object on which the events can be registered.
 */
TextRect.prototype.getRoot = function(){
    return this.group;
};

TextRect.prototype.getGroup = function () {
        return this.group;
};

TextRect.prototype.getRect = function () {
    return this.rect;
};
TextRect.prototype.getText = function () {
    return this.text;
};

TextRect.prototype.getPointTo = function(point){
    // draw a line from point to the center of the rect and see where this line cuts the rectangle that would be
    // our pointTo
    var x1 = this.rect.x();
    var y1 = this.rect.y();
    var width = this.rect.width();
    var height = this.rect.height();

    var x2 = x1 + width;
    var y2 = y1;

    var x3 = x2;
    var y3 = y1 + height;

    var x4 = x1;
    var y4 = y1 + height;

    var centerX = x1 + width/2 ;
    var centerY = y1 + height/2;

    var p1 = Utils.findIntersectionPointOfLineAndSegment(point.getX(), point.getY(), centerX, centerY, x1, y1, x2, y2);
    if( null != p1 ) return p1;

    var p2 = Utils.findIntersectionPointOfLineAndSegment(point.getX(), point.getY(), centerX, centerY, x2, y2, x3, y3);
    if( null != p2 ) return p2;

    var p3 = Utils.findIntersectionPointOfLineAndSegment(point.getX(), point.getY(), centerX, centerY, x3, y3, x4, y4);
    if( null != p3 ) return p3;

    var p4 = Utils.findIntersectionPointOfLineAndSegment(point.getX(), point.getY(), centerX, centerY, x4, y4, x1, y1);
    if( null != p4 ) return p4;

    return null;
};