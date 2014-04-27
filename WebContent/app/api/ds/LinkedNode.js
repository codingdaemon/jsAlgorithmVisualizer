/**
 * Created by nitiraj on 24/4/14.
 */
define([], function () {
    function LinkedNode(data) {
        this.data = data;
        this.nextPointer = null;
        this.prevPointer = null;
    }

    LinkedNode.prototype.getNextPointer = function () {
        return this.nextPointer;
    };

    LinkedNode.prototype.getPrevPointer = function () {
        return this.prevPointer;
    };

    LinkedNode.prototype.setNextPointer = function (nextPointer) {
        if (!( nextPointer instanceof LinkedNode) && nextPointer != null) throw "Not LinkedNode object";

        this.nextPointer = nextPointer;
    };

    LinkedNode.prototype.setPrevPointer = function (prevPointer) {
        if (!( prevPointer instanceof LinkedNode) && prevPointer != null) throw "Not LinkedNode Object";

        this.prevPointer = prevPointer;
    };

    LinkedNode.prototype.getData = function () {
        return this.data;
    };

    LinkedNode.prototype.setData = function (data) {
        this.data = data;
    };

    LinkedNode.prototype.toString = function () {
        return "LinkedNode[ data=" + this.data + "]";
    };

    return LinkedNode;
});