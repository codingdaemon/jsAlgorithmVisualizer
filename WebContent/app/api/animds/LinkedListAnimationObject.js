/**
 * Created by nitiraj on 24/4/14.
 */

define(["core/Point", "ds/LinkedNode", "animds/AnimationObject", "animds/LinkedNodeAnimationObject", "animds/PointerAnimationObject", "core/Constants", "core/Utils", "core/Defaults", "libs/kinetic", "core/Factory", "core/Logger","animds/AnimUtils"], function ( Point, LinkedNode, AnimationObject, LinkedNodeAnimationObject, PointerAnimationObject, Constants, Utils, Defaults, Kinetic, Factory, Logger, AnimUtils) {

    function LinkedListAnimationObject(config, animationId, layoutManager, layer, animationEngine) {
        AnimationObject.call(this, "LinkedListAnimationObject", layer);
        this.configs = config;
        this.animationId = animationId;
        this.layoutManager = layoutManager;
        this.animationEngine = animationEngine;
        this.head = null;
        this.tail = null;
        this.headPointer = null;
        this.tailPointer = null;
//        this.animator = jsav.getAnimatorById(animationId);
        this.group = new Kinetic.Group({
            draggable : true
        });
        this.getLayer().add(this.group);
    }

    LinkedListAnimationObject.prototype = new AnimationObject();
    
    LinkedListAnimationObject.prototype.createObject = function () {
        Logger.info("createObject called");
        // create the head and tail pointer pointing to null
        var center = this.layoutManager.getCenter();

        var headConfigs = Utils.clone(this.configs);
        headConfigs[Constants.ARROW_FROMX] = center.getX() / 2;
        headConfigs[Constants.ARROW_FROMY] = center.getY() / 2 - this.configs[Constants.LINKEDLIST_POINTER_LENGTH];
        headConfigs[Constants.ARROW_TOX] = center.getX() / 2;
        headConfigs[Constants.ARROW_TOY] = center.getY() / 2;
        headConfigs[ Constants.ARROW_TAIL_TEXT] = "head";
        this.headPointer = new PointerAnimationObject(headConfigs, this.getLayer());
        this.headPointer.getGroup().draggable(false);

        var tailConfigs = Utils.clone(this.configs);
        tailConfigs[Constants.ARROW_FROMX] = center.getX() / 2;
        tailConfigs[Constants.ARROW_FROMY] = center.getY() / 2 + this.configs[Constants.LINKEDLIST_POINTER_LENGTH];
        tailConfigs[Constants.ARROW_TOX] = center.getX() / 2;
        tailConfigs[Constants.ARROW_TOY] = center.getY() / 2;
        tailConfigs[Constants.ARROW_TAIL_TEXT] = "tail";

        this.tailPointer = new PointerAnimationObject(tailConfigs,this.getLayer());
        this.tailPointer.getGroup().draggable(false);

        this.group.add(this.headPointer.getGroup());
        this.group.add(this.tailPointer.getGroup());

        this.getLayer().draw();
        
        this.animationEngine.next();
    };

    LinkedListAnimationObject.prototype.addFront = function (data) {
        Logger.info("addFront called");
        var node = new LinkedNode(data);
        var currHead = this.head;

        var nodeConfigs = Utils.clone( this.configs );
        var nextPointerConfigs = Utils.clone( this.configs );

        var rectWidth = this.configs[Constants.LINKEDLIST_BOX_WIDTH];
        var rectHeight = this.configs[Constants.LINKEDLIST_BOX_HEIGHT];
        var pointerLength =  this.configs[Constants.LINKEDLIST_POINTER_LENGTH];
        var timeUnit = this.configs[Constants.ANIMATION_UNIT_TIME];

        var animNode = null;

        if (null == currHead) {

            nodeConfigs["x"] = this.headPointer.x2 - rectWidth/2;
        	nodeConfigs["y"] = this.headPointer.y2 - rectHeight/2;
        	nodeConfigs[Constants.RECT_WIDTH] = rectWidth;
        	nodeConfigs[Constants.RECT_HEIGHT] = rectHeight;
        	nodeConfigs["data"] = data;

        	nextPointerConfigs[Constants.ARROW_FROMX] = this.headPointer.x2 + rectWidth/2;
        	nextPointerConfigs[Constants.ARROW_FROMY] = this.headPointer.y2 ;
        	nextPointerConfigs[Constants.ARROW_TOX] = this.headPointer.x2 + rectWidth/2 + pointerLength;
        	nextPointerConfigs[Constants.ARROW_TOY] = this.headPointer.y2 ;
            nextPointerConfigs[Constants.ARROW_HEAD_TEXT] = "null";
        	
        	nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;
        	
        	animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer());
        	node.setAnimNode(animNode);
        	this.group.add(animNode.getGroup());

        	this.head = node;
//        	this.headPointer.setTailPoint(new Point(this.headPointer.x1, this.headPointer.y1 - rectHeight/2));
            AnimUtils.animatePointerTailShift(this.headPointer,this.headPointer.x1, this.headPointer.y1 - rectHeight/2,timeUnit,this.getLayer(),this,function(){
                this.headPointer.pointHeadTo(node.getAnimNode());
                this.tail = node;
                this.tailPointer.setTailPoint(new Point(this.headPointer.x1, this.headPointer.y2 + rectHeight + pointerLength));
                this.tailPointer.pointHeadTo(node.getAnimNode());

                this.getLayer().draw();
                this.animationEngine.next();
            });
        } else {
	     	nodeConfigs["x"] = this.headPointer.x2 - rectWidth/2 - rectWidth - pointerLength;
	     	nodeConfigs["y"] = this.headPointer.y2;
	     	nodeConfigs[Constants.RECT_WIDTH] = rectWidth;
	     	nodeConfigs[Constants.RECT_HEIGHT] = rectHeight;
	     	nodeConfigs["data"] = data;

	     	nextPointerConfigs[Constants.ARROW_FROMX] = this.headPointer.x2 - rectWidth/2 - pointerLength;
	     	nextPointerConfigs[Constants.ARROW_FROMY] = this.headPointer.y2 + rectHeight/2 ;
	     	nextPointerConfigs[Constants.ARROW_TOX] = this.headPointer.x2 - rectWidth/2 ;
	     	nextPointerConfigs[Constants.ARROW_TOY] = this.headPointer.y2 + rectHeight/2 ;
	     	
	     	nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;
	     	
	     	animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer());
	     	node.setAnimNode(animNode);
	     	this.group.add(animNode.getGroup());

//            Logger.info("Pointer headPointer to : " + tailPoint);
//	     	this.headPointer.setTailPoint(tailPoint);
            AnimUtils.animatePointerTailShift(this.headPointer,this.headPointer.x1 - rectWidth - pointerLength, this.headPointer.y1,timeUnit,this.getLayer(),this,function() {
                this.headPointer.pointHeadTo(animNode);
                animNode.getNextPointer().pointHeadTo(currHead.getAnimNode());

                this.head = node;
                this.head.setNextPointer(currHead);

                this.getLayer().draw();
                this.animationEngine.next();
            });
        }
    };

    LinkedListAnimationObject.prototype.addLast = function (data) {
        Logger.info("addLast called");
        var node = new LinkedNode(data);
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
        Logger.info("elementAt called");
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
        Logger.info("removeAt called");
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
                if(this.head != null )
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
        Logger.info("getLength called");
        var p = this.head;
        var length = 0;
        while (p != null) {
            p = p.getNextPointer();
            length++;
        }

        return length;
    };

    LinkedListAnimationObject.prototype.getHead = function(){
        Logger.info("getHead called");
        return this.head;
    };

    LinkedListAnimationObject.prototype.getTail = function(){
        Logger.info("getTail called");
        return this.tail;
    };

    LinkedListAnimationObject.prototype.toString = function(){
        var p = this.getHead();
        var str = "[LinkedListAnimationObject values= ";
        while(p != null ){
            if(p != this.head)
                str += "," ;

            str += p.getData();
            p = p.getNextPointer();
        }
        str += " ]";

        return str;
    };

    return LinkedListAnimationObject;

/*    LinkedListAnimationObject.prototype.createObject = function () {
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
    };*/
});