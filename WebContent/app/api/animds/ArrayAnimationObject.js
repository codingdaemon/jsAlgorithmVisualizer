/**
 * Created by nitiraj on 10/5/14.
 */

define(["core/Logger", "core/Utils", "animds/AnimUtils", "animds/TextRectAnimationObject", "core/Constants", "animds/AnimationObject"], function (Logger, Utils, AnimUtils, TextRectAnimationObject, Constants, AnimationObject) {
    function ArrayAnimationObject(configs, layer, animationEngine, layoutManager) {
        AnimationObject.call(this, "ArrayAnimationObject", configs, layer, animationEngine, layoutManager);
        this.array = [];
        this.rectArray = [];
        this.group = new Kinetic.Group({
            draggable: true
        });

        this.getLayer().add(this.group);
        this.getConfigs()[Constants.RECT_WIDTH] = this.getConfig([Constants.ARRAY_BOX_WIDTH]);
        this.getConfigs()[Constants.RECT_HEIGHT] = this.getConfig([Constants.ARRAY_BOX_HEIGHT]);
        this.getConfigs()[Constants.TEXT_WIDTH] = this.getConfig([Constants.ARRAY_BOX_WIDTH]);
    }

    ArrayAnimationObject.prototype = new AnimationObject();

    ArrayAnimationObject.prototype.createObject = function (size) {
        this.size = size;
        var nodeConfigs = Utils.clone(this.getConfigs());
        var x = this.getLayoutManager().getCenter().getX();
        var y = this.getLayoutManager().getCenter().getY();
        nodeConfigs["data"] = "null";
        for (var i = 0; i < this.size; i++) {
            nodeConfigs = Utils.clone(nodeConfigs); // make a copy of current configs
            nodeConfigs["x"] = x;
            nodeConfigs["y"] = y;
            x = x + nodeConfigs[Constants.ARRAY_BOX_WIDTH];

            this.rectArray[i] = new TextRectAnimationObject(nodeConfigs, this.getLayer(), this.group);
            this.array[i] = null;
        }

        this.getLayer().draw();
        this.getAnimationEngine().next();
    };


    ArrayAnimationObject.prototype.at = function (index) {
        if (index < 0 || index >= this.size) {
            throw "index out of bound exception";
        }

        AnimUtils.animateHighLightTextRect(this.rectArray[index], this.getConfig(Constants.RECT_HIGHLIGHT_COLOR),
            this.getAnimationEngine().getUnitTime(), this.getLayer(), ConnectJs.hitch(this, function () {
            this.getAnimationEngine().next();
//            return this.array[index] ; // no need to return anything
        }));
    };

    ArrayAnimationObject.prototype.set = function (index, value) {
        Logger.info("ArrayAnimationObject.set(index,value) with index = " + index + ", value = " + value);

        if( index < 0 || index >= this.size){
            throw "index out of bound exception";
        }

        this.array[index] = value;

        this.rectArray[index].setData(value);
        this.getLayer().draw();
        AnimUtils.animateHighLightTextRect(this.rectArray[index], this.getConfig(Constants.RECT_HIGHLIGHT_COLOR),
            this.getAnimationEngine().getUnitTime(), this.getLayer(), ConnectJs.hitch(this, function () {
                this.getAnimationEngine().next();
        }));
    };

    return ArrayAnimationObject;
});