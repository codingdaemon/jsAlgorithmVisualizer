define(["core/Utils","animds/AnimationObject", "libs/kinetic", "core/Constants", "core/Logger","animds/TextRectAnimationObject", "core/Defaults"], function (Utils,AnimationObject, Kinetic, Constants, Logger,TextRectAnimationObject, Defaults) {

    function StackAnimationObject(animationId, layer) {
        this.animationId = animationId;
        this.animator = jsav.getAnimatorById(animationId);
        AnimationObject.call(this, "Stack", layer);
        this.group = new Kinetic.Group({
            draggable: true
        });
        this.rectArray = [];
    }

    StackAnimationObject.prototype = new AnimationObject();

    StackAnimationObject.prototype.toString = function () {
        return "StackAnimationObject[ name = " + this.getName() + "]";
    };

    StackAnimationObject.prototype.createObject = function () {
        Logger.info("Animating to create stack = " + this.toString());

        var center = this.animator.getLayoutManager().getCenter();
        var ref = this;

        var boxConfigs = {};
        boxConfigs["x"] =  center.getX();
        boxConfigs["y"] =  center.getY();
        boxConfigs["data"] =  ref.getName();
//        boxConfigs["text.font.size"] =  20,
//        boxConfigs["text.font.family"] =  "Calibri",
//        boxConfigs["text.fill.color"] =  'black',
        boxConfigs[Constants.TEXT_WIDTH] =  ref.animator.getConfigs()[Constants.STACK_BOX_WIDTH];
//        boxConfigs["text.align"] =  'center',
        boxConfigs[Constants.RECT_WIDTH] =  ref.animator.getConfigs()[Constants.STACK_BOX_WIDTH];
        boxConfigs[Constants.RECT_HEIGHT] =  ref.animator.getConfigs()[Constants.STACK_BOX_HEIGHT];
        boxConfigs[Constants.RECT_FILL_COLOR] =  ref.animator.getConfigs()[Constants.STACK_BOX_INIT_COLOR];
        boxConfigs[Constants.RECT_STROKE_COLOR] =  ref.animator.getConfigs()[Constants.STACK_BOX_BORDER_COLOR];
//        boxConfigs[Constants.RECT_STROKE_WIDTH] =  2

        boxConfigs = Utils.overrideObject(Defaults,boxConfigs);
        var rectGroup = this.getTextRectangle(boxConfigs);

        this.rectArray.push(rectGroup);
        this.group.add(rectGroup.getGroup());

        var layer = this.animator.getLayoutManager().getLayer();
        layer.add(this.group);
        layer.draw();

        setTimeout(function () {
            rectGroup.getRect().fill(ref.animator.getConfigs(Constants.STACK_BOX_FINAL_COLOR));
            layer.draw();
            ref.animator.getAnimationEngine().next();
        }, 2000);
    };

    StackAnimationObject.prototype.push = function (data) {
        // get the top rect and find the position where should we put the next rect
        Logger.info("Animating to push data = " + data + " on the stack = " + this);
        var ref = this;
        var topRect = this.rectArray[this.rectArray.length - 1];
        var nextX = topRect.getRect().x();
        var nextY = topRect.getRect().y() - this.animator.getConfigs()[Constants.STACK_BOX_HEIGHT];

        var boxConfigs = {};
       boxConfigs["x"]= nextX;
       boxConfigs["y"]= nextY;
       boxConfigs["data"]= data;
//       boxConfigs["text.font.size"]= 20,
//       boxConfigs["text.font.family"]= "Calibri",
//       boxConfigs["text.fill.color"]= 'black',
       boxConfigs[Constants.TEXT_WIDTH]= ref.animator.getConfigs()[Constants.STACK_BOX_WIDTH];
//       boxConfigs["text.align"]= 'center',
       boxConfigs[Constants.RECT_WIDTH]= ref.animator.getConfigs()[Constants.STACK_BOX_WIDTH];
       boxConfigs[Constants.RECT_HEIGHT]= ref.animator.getConfigs()[Constants.STACK_BOX_HEIGHT];
       boxConfigs[Constants.RECT_FILL_COLOR]= ref.animator.getConfigs()[Constants.STACK_BOX_INIT_COLOR];
       boxConfigs[Constants.RECT_STROKE_COLOR]= ref.animator.getConfigs()[Constants.STACK_BOX_BORDER_COLOR];
//       boxConfigs[Constants.RECT_STROKE_WIDTH]= 2;

        boxConfigs = Utils.overrideObject(Defaults,boxConfigs);
       var rectGroup = this.getTextRectangle(boxConfigs);

        this.rectArray.push(rectGroup);
        this.group.add(rectGroup.getGroup());

        var layer = this.animator.getLayoutManager().getLayer();
        layer.draw();

        setTimeout(function () {
            // get only rect
            rectGroup.getRect().fill(ref.animator.getConfigs()[Constants.STACK_BOX_FINAL_COLOR]);
            layer.draw();
            ref.animator.getAnimationEngine().next();
        }, 2000);
    };

    StackAnimationObject.prototype.pop = function () {
        Logger.info("Animating to pop data from the stack = " + this);

        var rectGroup = this.rectArray.pop();
        var group = rectGroup.getGroup();
        var rect = rectGroup.getRect();

        var layer = this.animator.getLayoutManager().getLayer();

        var ref = this;
        var intervalTimer = setInterval(function () {
            rect.opacity(rect.opacity() - 0.1);

            if (rect.opacity() <= 0) {
                group.destroyChildren();
                group.destroy();
                layer.draw();
                clearInterval(intervalTimer);
                ref.animator.getAnimationEngine().next();
            } else {
                layer.draw();
            }
        }, 100);
    };


    StackAnimationObject.prototype.getTextRectangle = function (boxConfigs) {
        return new TextRectAnimationObject(boxConfigs,this.getLayer());
    };

    return StackAnimationObject;
});