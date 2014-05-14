define(["core/Logger"], function (Logger) {

    function AnimationEngine(/*animationId,*/ unitTime) {
//        this.animationId = animationId;
        this.unitTime = unitTime;
        /**
         *  Type AnimationInput Array
         */
        this.animationInputArray = [];

        /**
         *  Type Integer for currentIndex of execution
         */
        this.currentIndex = -1;

        this.isStarted = false;
    }

    /**
     * push AnimationInput to be executed.
     */
    AnimationEngine.prototype.push = function (animationInput) {
        this.animationInputArray.push(animationInput);
    };

    /**
     * Starts the animation if not already started and animationInputArray is not empty.
     */
    AnimationEngine.prototype.start = function () {
        if (this.animationInputArray.length != 0 && this.currentIndex == -1) {
            this.currentIndex = 0;
            this.isStarted = true;
            Logger.info("AnimationEngine : start : Complete List of Executions : " + this.animationInputArray);

            var animObj = this.animationInputArray[this.currentIndex];
            animObj.func.apply(animObj.object, animObj.params);
        } else {
            Logger.info("no animationInput or not the start of animation.");
        }
    };

    /**
     * Executes the next animation
     */
    AnimationEngine.prototype.next = function () {
        if (this.isStarted) {
            if (this.currentIndex < this.animationInputArray.length - 1) {
                this.currentIndex++;
                var animObj = this.animationInputArray[this.currentIndex];
                Logger.info("AnimationEngine.next : executing : " + animObj);

                animObj.func.apply(animObj.object, animObj.params);
                return true;
            } else {
                this.animationCompleted();
                return false;
            }
        }
    };

    /**
     * one can connect to this method to be notified when the animation
     * queue is finished.
     */
    AnimationEngine.prototype.animationCompleted = function(){
        Logger.info("Animation completed.");
    };

    AnimationEngine.prototype.reset = function () {
        this.currentIndex = -1;
        this.isStarted = false; // stops any old animation
    };

    /**
     * always get the unit time using this method
     * as it might keep changing with speed of animation required.
     * @returns {*}
     */
    AnimationEngine.prototype.getUnitTime = function(){
        return this.unitTime;
    };

    AnimationEngine.prototype.setUnitTime = function(unitTime){
        this.unitTime = unitTime;
    };

    return AnimationEngine;
});