define(["core/Logger", "core/Utils"], function (logger,utils) {
    function AnimationObject(name, configs, layer, animationEngine, layoutManager) {
        this.name = name;
        this.id = utils.generateId();
        this.layer = layer;
        this.animationEngine = animationEngine;
        this.layoutManager = layoutManager;
        this.configs = configs;
    }

    AnimationObject.prototype.createObject = function (animationEngine) {
        logger.info("creating new AnimationObject");
        animationEngine.next();
    };

    AnimationObject.prototype.getLayoutManager = function () {
        return this.layoutManager;
    };


    AnimationObject.prototype.getConfigs = function () {
        return this.configs;
    };

    AnimationObject.prototype.getConfig = function (configKey) {
        return this.configs[configKey];
    };

    AnimationObject.prototype.getName = function () {
        return this.name;
    };

    AnimationObject.prototype.getId = function () {
        return this.id;
    };

    AnimationObject.prototype.getRoot = function () {
        return null;
    };

    AnimationObject.prototype.getLayer = function () {
        return this.layer;
    };

    AnimationObject.prototype.getAnimationEngine = function () {
        return this.animationEngine;
    };
    /**
     * returns the array of Kinetic Objects contained
     * @returns {Array}
     */
    AnimationObject.prototype.getChildren = function () {
        return [];
    };

    AnimationObject.prototype.destroy = function () {
        var children = this.getChildren();
        for(var i = 0 ; i < children.length ; i++){
            children[i].destroy();
        }
    };

    /**
     * moves the animation object by xdiff on x-axis and ydiff on y-axis
     * @param xdiff
     * @param ydiff
     */
    AnimationObject.prototype.moveXY = function (xdiff,ydiff) {
    };

    AnimationObject.prototype.setXY = function (x,y) {
    };

    AnimationObject.prototype.getX = function () {
    };

    AnimationObject.prototype.getY = function () {
    };

    return AnimationObject;
});