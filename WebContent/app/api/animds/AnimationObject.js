define(["core/Logger", "core/Utils"], function (logger,utils) {
    function AnimationObject(name, layer, animationEngine) {
        this.name = name;
        this.id = utils.generateId();
        this.layer = layer;
        this.animationEngine = animationEngine;
    }

    AnimationObject.prototype.createObject = function (animationEngine) {
        logger.info("creating new AnimationObject");
        animationEngine.next();
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

    return AnimationObject;
});