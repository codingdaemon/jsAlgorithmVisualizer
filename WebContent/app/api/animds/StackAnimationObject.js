define(["core/Utils","animds/AnimationObject", "libs/kinetic", "core/Constants", "core/Logger","animds/TextRectAnimationObject", "core/Defaults"], function (Utils,AnimationObject, Kinetic, Constants, Logger,TextRectAnimationObject, Defaults) {

    function StackAnimationObject(configs, layer, animationEngine, layoutManager) {

        AnimationObject.call(this, "Stack", configs, layer, animationEngine, layoutManager );

        this.group = new Kinetic.Group({
            draggable: true
        });

        this.getLayer().add(this.group);
        this.rectArray = [];
    }

    StackAnimationObject.prototype = new AnimationObject();

    StackAnimationObject.prototype.toString = function () {
        return "StackAnimationObject[ name = " + this.getName() + "]";
    };

    StackAnimationObject.prototype.createObject = function () {
        Logger.info("Animating to create stack = " + this.toString());

        var center = this.getLayoutManager().getCenter();
        var ref = this;

        var boxConfigs = {};
        boxConfigs["x"] =  center.getX();
        boxConfigs["y"] =  center.getY();
        boxConfigs["data"] =  ref.getName();
        boxConfigs[Constants.TEXT_WIDTH] =  ref.getConfigs()[Constants.STACK_BOX_WIDTH];
        boxConfigs[Constants.RECT_WIDTH] =  ref.getConfigs()[Constants.STACK_BOX_WIDTH];
        boxConfigs[Constants.RECT_HEIGHT] =  ref.getConfigs()[Constants.STACK_BOX_HEIGHT];
        boxConfigs[Constants.RECT_FILL_COLOR] =  ref.getConfigs()[Constants.STACK_BOX_INIT_COLOR];
        boxConfigs[Constants.RECT_STROKE_COLOR] =  ref.getConfigs()[Constants.STACK_BOX_BORDER_COLOR];

        boxConfigs = Utils.overrideObject(Defaults,boxConfigs);
        var textRect = this.getTextRectangle(boxConfigs);

        this.rectArray.push(textRect);
//        this.group.add(textRect.getGroup());

        var layer = this.getLayer();
        layer.draw();

        setTimeout(function () {
            textRect.getRect().fill(ref.getConfigs(Constants.STACK_BOX_FINAL_COLOR));
            layer.draw();
            ref.getAnimationEngine().next();
        }, 2000);
    };

    StackAnimationObject.prototype.push = function (data) {
        // get the top rect and find the position where should we put the next rect
        Logger.info("Animating to push data = " + data + " on the stack = " + this);
        var ref = this;
        var topRect = this.rectArray[this.rectArray.length - 1];
        var nextX = topRect.getX();
        var nextY = topRect.getY() - this.getConfigs()[Constants.STACK_BOX_HEIGHT];

        var boxConfigs = {};
       boxConfigs["x"]= nextX;
       boxConfigs["y"]= nextY;
       boxConfigs["data"]= data;
       boxConfigs[Constants.TEXT_WIDTH]= ref.getConfigs()[Constants.STACK_BOX_WIDTH];
       boxConfigs[Constants.RECT_WIDTH]= ref.getConfigs()[Constants.STACK_BOX_WIDTH];
       boxConfigs[Constants.RECT_HEIGHT]= ref.getConfigs()[Constants.STACK_BOX_HEIGHT];
       boxConfigs[Constants.RECT_FILL_COLOR]= ref.getConfigs()[Constants.STACK_BOX_INIT_COLOR];
       boxConfigs[Constants.RECT_STROKE_COLOR]= ref.getConfigs()[Constants.STACK_BOX_BORDER_COLOR];

       boxConfigs = Utils.overrideObject(Defaults,boxConfigs);
       var rect = this.getTextRectangle(boxConfigs);

        this.rectArray.push(rect);

        var layer = this.getLayer();
        layer.draw();

        setTimeout(function () {
            // get only rect
            rect.getRect().fill(ref.getConfigs()[Constants.STACK_BOX_FINAL_COLOR]);
            layer.draw();
            ref.getAnimationEngine().next();
        }, 2000);
    };

    StackAnimationObject.prototype.pop = function () {
        Logger.info("Animating to pop data from the stack = " + this);

        var textRect = this.rectArray.pop();
//        var group = textRect.getGroup();
        var rect = textRect.getRect();

        var layer = this.getLayoutManager().getLayer();

        var ref = this;
        var intervalTimer = setInterval(function () {
            rect.opacity(rect.opacity() - 0.1);

            if (rect.opacity() <= 0) {
                textRect.destroy();
                layer.draw();
                clearInterval(intervalTimer);
                ref.getAnimationEngine().next();
            } else {
                layer.draw();
            }
        }, 100);
    };


    StackAnimationObject.prototype.getTextRectangle = function (boxConfigs) {
        return new TextRectAnimationObject(boxConfigs,this.getLayer(),this.group);
    };

    return StackAnimationObject;
});