define(["StackAnimationGenerator","Logger"], function (StackAnimationGenerator,Logger) {

    /**
     * this Stack class can be used directly in code.
     * @returns
     */
    function Stack() {
        /**
         * note animationId is the current instance's animationId which is defined
         * globally with window object.. this will change after the current execution.
         */
        this.codeGenerator = new StackAnimationGenerator(animationId, "Stack");
        this.array = [];
        this.currentIndex = 0;
    }

    Stack.prototype.toString = function () {
        return "Stack[ currentIndex = " + this.currentIndex + ", array = " + this.array + "]";
    };

    Stack.prototype.push = function (data) {
        Logger.info("pushing the data : " + data);
        this.array[this.currentIndex] = data;
        this.currentIndex++;
        this.codeGenerator.push(data);
    };

    Stack.prototype.pop = function () {
        var data = null;
        if (this.currentIndex != 0) {
            this.currentIndex--;
            data = this.array[this.currentIndex];
            Logger.info("popped out the data : " + data);
            this.codeGenerator.pop();
            return data;
        } else {
            Logger.info("No more data in the stack.");
            return null;
        }
    };
    return Stack;
});