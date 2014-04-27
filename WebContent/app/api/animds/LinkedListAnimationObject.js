/**
 * Created by nitiraj on 24/4/14.
 */

define([ "core/Point", "ds/LinkedNode", "animds/AnimationObject", "animds/LinkedNodeAnimationObject", "aminds/PointerAnimationObject", "core/Constants", "core/Utils", "core/Defaults", "libs/kinetic", "core/Factory"], function (Point, LinkedNode, AnimationObject, LinkedNodeAnimationObject, PointerAnimationObject, Constants, Utils, Defaults, Kinetic, Factory) {
    function LinkedListAnimationObject(config, layer) {
        AnimationObject.call(this, layer);
        this.configs = config;
        this.head = null;
        this.tail = null;
        this.headPointer = null;
        this.tailPointer = null;

        this.group = new Kinetic.Group({
            draggable : true
        });
        this.getLayer().add(this.group);
    }

    LinkedListAnimationObject.prototype.createObject = function () {
        // create the head and tail pointer pointing to null
        var center = this.animator.getLayoutManager().getCenter();
        var ref = this;

        var headConfigs = Utils.clone(this.configs);
        headConfigs[Constants.ARROW_FROMX] = center.getX() / 2;
        headConfigs[Constants.ARROW_FROMY] = center.getY() / 2 - this.configs[Constants.LINKEDLIST_POINTER_LENGTH];;
        headConfigs[Constants.ARROW_TOX] = center.getX() / 2;
        headConfigs[Constants.ARROW_TOY] = center.getY() / 2;
        headConfigs[ Constants.ARROW_TAIL_TEXT] = "head";
        this.headPointer = new PointerAnimationObject(headConfigs, this.getLayer());

        var tailConfigs = Utils.clone(this.configs);
        tailConfigs[Constants.ARROW_FROMX] = center.getX() / 2;
        tailConfigs[Constants.ARROW_FROMY] = center.getY() / 2 + this.configs[Constants.LINKEDLIST_POINTER_LENGTH];;
        tailConfigs[Constants.ARROW_TOX] = center.getX() / 2;
        tailConfigs[Constants.ARROW_TOY] = center.getY() / 2;
        tailConfigs[Constants.ARROW_TAIL_TEXT] = "tail";

        this.tailPointer = new PointerAnimationObject(tailConfigs,this.getLayer());

        this.group.add(this.headPointer);
        this.group.add(this.tailPointer);

        this.getLayer().draw();
    };

    LinkedListAnimationObject.prototype.addFront = function (data) {
        var nodeConfigs = Utils.clone(this.configs);
        nodeConfigs["data"] = data;

        var nodeAO = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer());
        var node = new LinkedNode(data);
        var currHead = this.head;

        this.head= node;

        var headPoint = this.headPointer.getHeadPoint();
        nodeAO.getGroup().x(headPoint.getX());
        nodeAO.getGroup().y(headPoint.getY());
        this.headPointer.setTailPoint( new Point( nodeAO.getGroup().x() + nodeAO.getRect().width()/2, nodeAO.getGroup().y() - nodeAO.getRect().height()/2 - this.configs[Constants.LINKEDLIST_POINTER_LENGTH]));
        this.headPointer.pointHeadTo(nodeAO);

        if (null == currHead) {
            this.tail = this.head;
            this.tailPointer.setTailPoint( new Point( nodeAO.getGroup().x() + nodeAO.getRect().width()/2, nodeAO.getGroup().y() + nodeAO.getRect().height()/2 + this.configs[Constants.LINKEDLIST_POINTER_LENGTH]));
            this.tailPointer.pointHeadTo(nodeAO);
        } else {
            this.head.setNextPointer(currHead);
            this.headPointer.getNextPointer().pointHeadTo(nodeAO);
        }
    };

    LinkedListAnimationObject.prototype.addLast = function (data) {
        var node = new LinkedNodeAnimationObject(data);
        var currTail = this.tail;
        if (currTail == null) {
            this.tail = node;
            this.head = this.tail;
        } else {
            this.tail = node;
            currTail.setNextPointer(this.tail);
        }
    };

    LinkedListAnimationObject.prototype.elementAt = function (index) {
        var p = this.head;
        var count = 0;
        while (count != index && p != null) {
            p = p.getNextPointer();
            count++;
        }

        if (null == p) return null;
        else return p.getData();
    };

    LinkedListAnimationObject.prototype.removeAt = function (index) {
        if (index < 0)
            throw "index cannot be negative : " + index;

        var p = this.head;
        var q = null;
        var count = 0;
        while (count != index && p != null) {
            q = p;
            p = p.getNextPointer();
            count++;
        }

        if (null == p) throw "no object exists at index " + index;
        else {
            if (p == this.tail) {
                this.tail = q;
            }
            if (p == this.head) {
                if (this.head != null)
                    this.head = this.head.getNextPointer();
            }
            if (q != null) {
                q.setNextPointer(p.getNextPointer());
            }
            p.setNextPointer(null);
        }

        if (null != p) {
            return p.getData();
        } else {
            return null;
        }
    };

    LinkedListAnimationObject.prototype.getLength = function () {
        var p = this.head;
        var length = 0;
        while (p != null) {
            p = p.getNextPointer();
            length++;
        }

        return length;
    };

//    LinkedListAnimationObject.prototype.toString = function () {
//        return "LinkedListAnimationObject[]";
//    };

    LinkedListAnimationObject.prototype.getHead = function () {
        return this.head;
    };

    LinkedListAnimationObject.prototype.getTail = function () {
        return this.tail;
    };

    LinkedListAnimationObject.prototype.toString = function () {
        var p = this.getHead();
        var str = "[LinkedListAnimationObject values= ";
        while (p != null) {
            if (p != this.head)
                str += ",";

            str += p.getData();
            p = p.getNextPointer();
        }
        str += " ]";

        return str;
    };
});