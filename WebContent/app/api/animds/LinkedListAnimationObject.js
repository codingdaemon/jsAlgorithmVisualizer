/**
 * Created by nitiraj on 24/4/14.
 */

define(["libs/connect", "core/Point", "ds/LinkedNode", "animds/AnimationObject", "animds/LinkedNodeAnimationObject", "animds/PointerAnimationObject", "core/Constants", "core/Utils", "core/Defaults", "libs/kinetic", "core/Factory", "core/Logger","animds/AnimUtils"], function ( ConnectJs, Point, LinkedNode, AnimationObject, LinkedNodeAnimationObject, PointerAnimationObject, Constants, Utils, Defaults, Kinetic, Factory, Logger, AnimUtils) {

    function LinkedListAnimationObject(configs, layer, animationEngine, layoutManager ) {
        AnimationObject.call(this, "LinkedList", configs, layer, animationEngine, layoutManager );
        this.head = null;
        this.tail = null;
        this.headPointer = null;
        this.tailPointer = null;

        this.rectWidth = this.getConfigs()[Constants.LINKEDLIST_BOX_WIDTH];
        this.rectHeight = this.getConfigs()[Constants.LINKEDLIST_BOX_HEIGHT];
        this.pointerLength =  this.getConfigs()[Constants.LINKEDLIST_POINTER_LENGTH];
        this.unitTime = this.getConfigs()[Constants.ANIMATION_UNIT_TIME];

        this.group = new Kinetic.Group({
            draggable : true
        });
        this.getLayer().add(this.group);
    }

    LinkedListAnimationObject.prototype = new AnimationObject();
    
    LinkedListAnimationObject.prototype.createObject = function () {
        Logger.info("createObject called");
        // create the head and tail pointer pointing to null
        var center = this.getLayoutManager().getCenter();

        var headConfigs = Utils.clone(this.getConfigs());
        headConfigs[Constants.ARROW_FROMX] = center.getX() / 2;
        headConfigs[Constants.ARROW_FROMY] = center.getY() / 2 - this.getConfigs()[Constants.LINKEDLIST_POINTER_LENGTH];
        headConfigs[Constants.ARROW_TOX] = center.getX() / 2;
        headConfigs[Constants.ARROW_TOY] = center.getY() / 2;
        headConfigs[ Constants.ARROW_TAIL_TEXT] = "head";
        this.headPointer = new PointerAnimationObject(headConfigs, this.getLayer(),this.group);

        var tailConfigs = Utils.clone(this.getConfigs());
        tailConfigs[Constants.ARROW_FROMX] = center.getX() / 2;
        tailConfigs[Constants.ARROW_FROMY] = center.getY() / 2 + this.getConfigs()[Constants.LINKEDLIST_POINTER_LENGTH];
        tailConfigs[Constants.ARROW_TOX] = center.getX() / 2;
        tailConfigs[Constants.ARROW_TOY] = center.getY() / 2;
        tailConfigs[Constants.ARROW_TAIL_TEXT] = "tail";

        this.tailPointer = new PointerAnimationObject(tailConfigs,this.getLayer(),this.group);
//        this.tailPointer.setGroup(this.group);

//        this.group.add(this.headPointer.getGroup());
//        this.group.add(this.tailPointer.getGroup());

        this.getLayer().draw();
        
        this.getAnimationEngine().next();
    };

    LinkedListAnimationObject.prototype.addFront = function (data) {
        Logger.info("addFront called");
        var node = new LinkedNode(data);
        var currHead = this.head;

        var nodeConfigs = Utils.clone( this.getConfigs() );
        var nextPointerConfigs = Utils.clone( this.getConfigs() );

        var animNode = null;

        if (null == currHead) {

            nodeConfigs["x"] = this.headPointer.getHeadX() - this.rectWidth/2;
        	nodeConfigs["y"] = this.headPointer.getHeadY() - this.rectHeight/2;
        	nodeConfigs[Constants.RECT_WIDTH] = this.rectWidth;
        	nodeConfigs[Constants.RECT_HEIGHT] = this.rectHeight;
        	nodeConfigs["data"] = data;

        	nextPointerConfigs[Constants.ARROW_FROMX] = this.headPointer.getHeadX() + this.rectWidth/2;
        	nextPointerConfigs[Constants.ARROW_FROMY] = this.headPointer.getHeadY() ;
        	nextPointerConfigs[Constants.ARROW_TOX] = this.headPointer.getHeadX() + this.rectWidth/2 + this.pointerLength;
        	nextPointerConfigs[Constants.ARROW_TOY] = this.headPointer.getHeadY() ;
            nextPointerConfigs[Constants.ARROW_HEAD_TEXT] = "null";
        	
        	nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;
        	
        	animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer(),this.group);
        	node.setAnimNode(animNode);
//        	animNode.setGroup(this.group);

        	this.head = node;
//        	this.headPointer.setTailPoint(new Point(this.headPointer.x1, this.headPointer.y1 - rectHeight/2));
            AnimUtils.animatePointerTailShift(this.headPointer,this.headPointer.getTailX(), this.headPointer.getTailY() - this.rectHeight/2,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                this.headPointer.pointHeadTo(node.getAnimNode());
                this.tail = node;
                this.tailPointer.setTailPoint(new Point(this.headPointer.getTailX(), this.headPointer.getHeadY() + this.rectHeight + this.pointerLength));
                this.tailPointer.pointHeadTo(node.getAnimNode());

                this.getLayer().draw();
                this.getAnimationEngine().next();
            }));
        } else {
	     	nodeConfigs["x"] = this.headPointer.getHeadX() - this.rectWidth/2 - this.rectWidth - this.pointerLength;
	     	nodeConfigs["y"] = this.headPointer.getHeadY();
	     	nodeConfigs[Constants.RECT_WIDTH] = this.rectWidth;
	     	nodeConfigs[Constants.RECT_HEIGHT] = this.rectHeight;
	     	nodeConfigs["data"] = data;

	     	nextPointerConfigs[Constants.ARROW_FROMX] = this.headPointer.getHeadX() - this.rectWidth/2 - this.pointerLength;
	     	nextPointerConfigs[Constants.ARROW_FROMY] = this.headPointer.getHeadY() + this.rectHeight/2 ;
	     	nextPointerConfigs[Constants.ARROW_TOX] = this.headPointer.getHeadX() - this.rectWidth/2 ;
	     	nextPointerConfigs[Constants.ARROW_TOY] = this.headPointer.getHeadY() + this.rectHeight/2 ;
	     	
	     	nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;
	     	
	     	animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer(),this.group);
	     	node.setAnimNode(animNode);
//            animNode.setGroup(this.group);

//            Logger.info("Pointer headPointer to : " + tailPoint);
//	     	this.headPointer.setTailPoint(tailPoint);
            AnimUtils.animatePointerTailShift(this.headPointer,this.headPointer.getTailX() - this.rectWidth - this.pointerLength, this.headPointer.getTailY(),this.unitTime,this.getLayer(),ConnectJs.hitch(this,function() {
                this.headPointer.pointHeadTo(animNode);
                animNode.getNextPointer().pointHeadTo(currHead.getAnimNode());

                this.head = node;
                this.head.setNextPointer(currHead);

                this.getLayer().draw();
                this.getAnimationEngine().next();
            }));
        }
    };

    LinkedListAnimationObject.prototype.addLast = function (data) {
        Logger.info("addLast called");

        var node = new LinkedNode(data);

        var nodeConfigs = Utils.clone( this.getConfigs() );
        var nextPointerConfigs = Utils.clone( this.getConfigs() );

        var animNode = null;

        var currTail = this.tail;
        if (currTail == null) {

            nodeConfigs["x"] = this.headPointer.getHeadX() - this.rectWidth/2;
            nodeConfigs["y"] = this.headPointer.getHeadY() - this.rectHeight/2;
            nodeConfigs[Constants.RECT_WIDTH] = this.rectWidth;
            nodeConfigs[Constants.RECT_HEIGHT] = this.rectHeight;
            nodeConfigs["data"] = data;

            nextPointerConfigs[Constants.ARROW_FROMX] = this.headPointer.getHeadX() + this.rectWidth/2;
            nextPointerConfigs[Constants.ARROW_FROMY] = this.headPointer.getHeadY() ;
            nextPointerConfigs[Constants.ARROW_TOX] = this.headPointer.getHeadX() + this.rectWidth/2 + this.pointerLength;
            nextPointerConfigs[Constants.ARROW_TOY] = this.headPointer.getHeadY() ;
            nextPointerConfigs[Constants.ARROW_HEAD_TEXT] = "null";

            nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;

            animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer(),this.group);
            node.setAnimNode(animNode);
//            animNode.setGroup(this.group);

            this.head = node;
//        	this.headPointer.setTailPoint(new Point(this.headPointer.x1, this.headPointer.y1 - rectHeight/2));
            AnimUtils.animatePointerTailShift(this.headPointer,this.headPointer.getTailX(), this.headPointer.getTailY() - this.rectHeight/2,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                this.headPointer.pointHeadTo(node.getAnimNode());
                this.tail = node;
                this.tailPointer.setTailPoint(new Point(this.headPointer.getTailX(), this.headPointer.getHeadY() + this.rectHeight + this.pointerLength));
                this.tailPointer.pointHeadTo(node.getAnimNode());

                this.getLayer().draw();
                this.getAnimationEngine().next();
            }));

            this.tail = node;
            this.head = this.tail;
        } else {
            nodeConfigs["x"] = this.tailPointer.getHeadX() + this.rectWidth/2 + this.pointerLength;
            nodeConfigs["y"] = this.tailPointer.getHeadY() - this.rectHeight;
            nodeConfigs[Constants.RECT_WIDTH] = this.rectWidth;
            nodeConfigs[Constants.RECT_HEIGHT] = this.rectHeight;
            nodeConfigs["data"] = data;

            nextPointerConfigs[Constants.ARROW_FROMX] = this.tailPointer.getHeadX() + this.rectWidth/2 + this.rectWidth + this.pointerLength;
            nextPointerConfigs[Constants.ARROW_FROMY] = this.tailPointer.getHeadY() - this.rectHeight/2 ;
            nextPointerConfigs[Constants.ARROW_TOX] = this.tailPointer.getHeadX() + this.rectWidth/2 + this.rectWidth + 2*this.pointerLength;
            nextPointerConfigs[Constants.ARROW_TOY] = this.tailPointer.getHeadY() - this.rectHeight/2 ;
            nextPointerConfigs[Constants.ARROW_HEAD_TEXT] = "null";

            nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;

            currTail.getAnimNode().getNextPointer().setHeadText("");

            animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer(),this.group);
            node.setAnimNode(animNode);
//            animNode.setGroup(this.group);

//          Logger.info("Pointer headPointer to : " + tailPoint);
//	     	this.headPointer.setTailPoint(tailPoint);
            AnimUtils.animatePointerTailShift(this.tailPointer,this.tailPointer.getTailX() + this.rectWidth + this.pointerLength, this.tailPointer.getTailY(),this.unitTime,this.getLayer(),ConnectJs.hitch(this,function() {
                this.tailPointer.pointHeadTo(animNode);
                currTail.getAnimNode().getNextPointer().pointHeadTo(animNode);

                this.tail = node;
                currTail.setNextPointer(this.tail);

                this.getLayer().draw();
                this.getAnimationEngine().next();
            }));
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

    LinkedListAnimationObject.prototype.insertAt = function (atIndex, data) {
        var index = atIndex;

        if(index < 0){
            throw "index cannot be negative :"  + atIndex;
        }

        var node = null;
        var p = this.head;
        var q = null;
        while( index != 0 && p != null ){
            q = p ;
            p = p.getNextPointer();
            index--;
        }

        if(index != 0 ){
            throw "index out of bounds : index = " + atIndex;
        }

        node = new LinkedNode(data);
        var animNode = null;
        var nodeConfigs = Utils.clone( this.getConfigs() );
        var nextPointerConfigs = Utils.clone( this.getConfigs() );

        if(q != null){
            if( p != null){
                nodeConfigs["x"] = p.getAnimNode().getRect().getX() ;
                nodeConfigs["y"] = p.getAnimNode().getRect().getY() - this.rectHeight - this.rectHeight / 2; // keep little distance between 2 rects
                nodeConfigs[Constants.RECT_WIDTH] = this.rectWidth;
                nodeConfigs[Constants.RECT_HEIGHT] = this.rectHeight;
                nodeConfigs["data"] = data;

                nextPointerConfigs[Constants.ARROW_FROMX] = p.getAnimNode().getRect().getX() + this.rectWidth;
                nextPointerConfigs[Constants.ARROW_FROMY] = p.getAnimNode().getRect().getY() - this.rectHeight;
                nextPointerConfigs[Constants.ARROW_TOX] =  nextPointerConfigs[Constants.ARROW_FROMX] + this.pointerLength;
                nextPointerConfigs[Constants.ARROW_TOY] = nextPointerConfigs[Constants.ARROW_FROMY];

                nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;

                animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer(),this.group);
                node.setAnimNode(animNode);
//                animNode.setGroup(this.group);
                this.getLayer().draw();

                q.setNextPointer(node);
                AnimUtils.animatePointHeadTo(q.getAnimNode().getNextPointer(), animNode,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                    node.setNextPointer(p);
                    AnimUtils.animatePointHeadTo(node.getAnimNode().getNextPointer(), p.getAnimNode(),this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                        // shift p and rest of the group to the right.
//                        var tempGroup = new Kinetic.Group();
//                        this.group.add(tempGroup);
                        var x = p;
                        var allObject = [];
                        while(x != null){
                            allObject.push(x.getAnimNode());
                            x = x.getNextPointer();
                        }
                        allObject.push(this.tailPointer);

                        var distance = this.pointerLength + this.rectWidth;
                        var unitDistance = distance/10;
                        AnimUtils.repeater( ConnectJs.hitch(this,function() {
                            for(var i = 0 ; i < allObject.length ; i++ ){
                                allObject[i].moveXY(unitDistance,0);
                            }
                            this.getLayer().draw();
                        }),this.unitTime,10,ConnectJs.hitch(this,function(){
                            animNode.moveXY(0, this.rectHeight + this.rectHeight/2);
                            this.getLayer().draw();

                            q.getAnimNode().getNextPointer().pointHeadTo(animNode);
                            animNode.getNextPointer().pointHeadTo(p.getAnimNode());

                            this.getLayer().draw();
                            this.getAnimationEngine().next();
                        }));
                    }));
                }));
            }else{ // q points to tail
                nodeConfigs["x"] = q.getAnimNode().getRect().getX() + this.rectWidth + this.pointerLength;
                nodeConfigs["y"] = q.getAnimNode().getRect().getY();
                nodeConfigs[Constants.RECT_WIDTH] = this.rectWidth;
                nodeConfigs[Constants.RECT_HEIGHT] = this.rectHeight;
                nodeConfigs["data"] = data;

                nextPointerConfigs[Constants.ARROW_FROMX] = nodeConfigs["x"] + this.rectWidth;
                nextPointerConfigs[Constants.ARROW_FROMY] = nodeConfigs["y"] + this.rectHeight/2;
                nextPointerConfigs[Constants.ARROW_TOX] =  nextPointerConfigs[Constants.ARROW_FROMX] + this.pointerLength;
                nextPointerConfigs[Constants.ARROW_TOY] = nextPointerConfigs[Constants.ARROW_FROMY];
                nextPointerConfigs[Constants.ARROW_HEAD_TEXT] = "null";

                nodeConfigs["nextPointerConfigs"] = nextPointerConfigs ;

                animNode = new LinkedNodeAnimationObject(nodeConfigs, true, false, this.getLayer(),this.group);
                node.setAnimNode(animNode);

                this.getLayer().draw();

                q.getAnimNode().getNextPointer().setHeadText("");
                AnimUtils.animatePointHeadTo(q.getAnimNode().getNextPointer(),animNode,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){

                    q.setNextPointer(node);
                    node.setNextPointer(p); // already point the next to null;

                    AnimUtils.animatePointerTailShift(this.tailPointer,animNode.getRect().getX() + this.rectWidth/2, animNode.getRect().getY() + this.rectHeight + this.pointerLength,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                        this.tailPointer.pointHeadTo(animNode);
                        this.tail = node;
                        this.getAnimationEngine().next();
                    }));
                }));
            }
        }else{ // q == null
            // same as insert in front so just calling that animation.
            this.addFront(data);
//
//            this.head = node;
//            node.setNextPointer(p);
//            if(p == null){ // this was head which is null
//                this.tail = node;
//            }
        }
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
                if(q != null ){ // i.e. q is a box
                    var x = q.getAnimNode().getRect().getX() + this.rectWidth/2
                    var y = this.tailPointer.getTailY();

                    AnimUtils.animatePointerTailShift(this.tailPointer,x,y,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                        this.tailPointer.pointHeadTo(q.getAnimNode());
                        q.setNextPointer(p.getNextPointer());
                        q.getAnimNode().getNextPointer().setHeadText("null");
                        q.getAnimNode().getNextPointer().pointHeadTo(null);
                        AnimUtils.animateNodeDeletion(p.getAnimNode(),this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                            this.getAnimationEngine().next();
                        }));
                    }));
                } else { // this was the only data
                    this.head = null;
                    var x = p.getAnimNode().getRect().getX() + this.rectWidth / 2;
                    var y = p.getAnimNode().getRect().getY() + this.rectHeight / 2;
                    var ytail = p.getAnimNode().getRect().getY() + this.rectHeight / 2 + this.pointerLength;
                    var yhead = p.getAnimNode().getRect().getY() + this.rectHeight / 2 - this.pointerLength;

                    AnimUtils.animateNodeDeletion(p.getAnimNode(), this.unitTime, this.getLayer(), ConnectJs.hitch(this, function () {
                        AnimUtils.animatePointerTailShift(this.tailPointer, x, ytail, this.unitTime, this.getLayer(), ConnectJs.hitch(this, function () {
                            AnimUtils.animatePointerHeadShift(this.tailPointer, x, y, this.unitTime, this.getLayer(), ConnectJs.hitch(this, function () {
                                AnimUtils.animatePointerTailShift(this.headPointer, x, yhead, this.unitTime, this.getLayer(), ConnectJs.hitch(this, function () {
                                    AnimUtils.animatePointerHeadShift(this.headPointer, x, y, this.unitTime, this.getLayer(), ConnectJs.hitch(this, function () {
                                        this.getAnimationEngine().next();
                                    }));
                                }));
                            }));
                        }));
                    }));
                }
            }else{
                if (p == this.head) {
                    this.head = this.head.getNextPointer();
                    // next cannot be null now as the case is cover in the previous condition
                    var x = this.head.getAnimNode().getRect().getX() + this.rectWidth/2;
                    var ytail = this.headPointer.getTailY();

                    AnimUtils.animatePointerTailShift(this.headPointer,x,ytail,this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                        this.headPointer.pointHeadTo(this.head.getAnimNode());
                        AnimUtils.animateNodeDeletion(p.getAnimNode(),this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
                            this.getAnimationEngine().next();
                        }));

                    }));
                }else{
                    // q's next points to the next of p and next of p cannot be null as p == tail is covered
                    AnimUtils.animateNodeDeletion(p.getAnimNode(),this.unitTime,this.getLayer(),ConnectJs.hitch(this,function(){
//                        this.getLayer()
                        // shift rest of the nodes to the left
                        var tempNode = p.getNextPointer();
                        var allNodes = [];
                        while(tempNode != null ){
                           allNodes.push(tempNode.getAnimNode());
                           tempNode = tempNode.getNextPointer();
                        }

                        allNodes.push(this.tailPointer);
                        var diffX = -(this.rectWidth + this.pointerLength);
                        AnimUtils.repeater(ConnectJs.hitch(this,function(){
                            for(var i = 0 ; i < allNodes.length ; i++ ){
                                allNodes[i].moveXY(diffX/10,0);
                            }
                            this.getLayer().draw();
                        }),this.unitTime,10,ConnectJs.hitch(this,function(){
                            q.getAnimNode().getNextPointer().pointHeadTo(p.getNextPointer().getAnimNode());

                            q.setNextPointer(p.getNextPointer());

                            this.getAnimationEngine().next();
                        }));
                    }));
                }
            }
//            p.setNextPointer(null);
        }

//        if (null != p) {
//            return p.getData();
//        } else {
//            return null;
//        }
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
});