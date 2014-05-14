/**
 * Created by nitiraj on 11/5/14.
 */
define(["core/Constants", "animds/InternalBinaryTree", "animds/TextRectAnimationObject","animds/PointerAnimationObject",
        "animds/AnimationObject", "core/Utils", "core/Logger", "core/Point"],
    function(Constants, InternalBinaryTree, TextRectAnimationObject, PointerAnimationObject, AnimationObject, Utils, Logger, Point){

    function BinaryTreeAnimationObject(configs, layer, animationEngine, layoutManager, group){
        AnimationObject.call(this, "BinaryTreeAnimationObject", configs, layer, animationEngine, layoutManager );
        if( Utils.isNullOrUndefined(group)){
            this.group = new Kinetic.Group({
                draggable : true
            });
            this.originalGroup = this.group;
        }else {
            this.group = group;
        }

        this.height = this.getConfig(Constants.BINARY_TREE_BOX_HEIGHT);
        this.width = this.getConfig(Constants.BINARY_TREE_BOX_WIDTH);

        this.getConfigs()[Constants.RECT_WIDTH] = this.width;
        this.getConfigs()[Constants.RECT_HEIGHT] = this.height;

        this.binaryTree = null;

        this.getLayer().add(this.group);
    }

    BinaryTreeAnimationObject.prototype = new AnimationObject();

    BinaryTreeAnimationObject.prototype.setGroup = function( group ){
        if( this.group != group ){
            this.group = group;
            this.rect.setGroup(group);
            this.rightPointer.setGroup(group);
            this.leftPointer.setGroup(group);
            if( !Utils.isNullOrUndefined(this.originalGroup) ){
                this.originalGroup.destroy();
                this.originalGroup = null;
            }
        }
    };

    BinaryTreeAnimationObject.prototype.setXY = function(x,y){
        this.x = x ;
        this.y = y ;

        this.draw();
    };

    BinaryTreeAnimationObject.prototype.getX = function(){
        return this.x;
    };

    BinaryTreeAnimationObject.prototype.getY = function(){
        return this.y;
    };

        /**
         * draws just this node
         */
    BinaryTreeAnimationObject.prototype.draw = function(){
        this.rect.setX(this.x);
        this.rect.setY(this.y);
        this.rect.setData(this.data);

        this.rightPointer.setTailPoint(new Point(this.x + this.width, this.y + this.height));
        this.leftPointer.setTailPoint(new Point(this.x, this.y + this.height));
    };
    /**
     * Draws the whole tree not just this node.
     */
    BinaryTreeAnimationObject.prototype.drawTree = function(){
        // get the root
        var root = this.binaryTree;
        var heightUp = 0 ;
        while( root.getParent() != null ){
            heightUp++;
            root = root.getParent();
        }

        var heightDown = this.binaryTree.getHeight();
        var height = heightDown + heightUp ;

        var numberOfLeafNodes = Math.pow(2, height - 1); // assuming full binary tree
        var widthOfTree = (2 * numberOfLeafNodes -1 ) * this.width;

        var x = root.getAnimNode().getX();
        var y = root.getAnimNode().getY();

        var nodes = [];
        nodes.push(root);
        var group = root.getAnimNode().getGroup();
        nodes.push("D"); // the delimiter for level
        var currNode = null;
        while(nodes.length != 0){
            currNode = nodes.shift();

            if( currNode === "D"){ // delimiter
                height--;
                numberOfLeafNodes = Math.pow(2, height - 1); // assuming full binary tree
                widthOfTree = (2 * numberOfLeafNodes -1 ) * this.width;
                if( nodes.length != 0 ){ // this was not last D
                    nodes.push("D"); // push delemiter for ending this level
                }
            }
            else{
                var currAnimNode = currNode.getAnimNode();
                currAnimNode.setGroup(group);
                if( currNode.getLeft() ){
                    nodes.push(currNode.getLeft());
                    var leftAnimNode = currNode.getLeft().getAnimNode();
                    var rx = currAnimNode.getX() - widthOfTree/4 ;
                    var ry = currAnimNode.getY() + 2 * this.height;
                    leftAnimNode.setXY(rx,ry);
                    currAnimNode.leftPointer.pointHeadTo(leftAnimNode);
                }else{
                    currAnimNode.leftPointer.setHeadPoint(new Point(currAnimNode.getX(),currAnimNode.getY() + 2 * currAnimNode.height));
                }

                if( currNode.getRight() ){
                    nodes.push(currNode.getRight());
                    var rightAnimNode = currNode.getRight().getAnimNode();
                    var lx = widthOfTree/4 + currNode.getAnimNode().getX();
                    var ly = currNode.getAnimNode().getY() + 2 * this.height;
                    rightAnimNode.setXY(lx,ly);
                    currAnimNode.rightPointer.pointHeadTo(rightAnimNode);
                }else{
                    currAnimNode.rightPointer.setHeadPoint(new Point(currAnimNode.getX() + currAnimNode.width,currAnimNode.getY() + 2 * currAnimNode.height));
                }
            }
        }

        this.getLayer().draw();
        Logger.debug("Binary Tree draw completed");
    };

    BinaryTreeAnimationObject.prototype.getRoot = function () {
        return this.rect.getRoot();
    };

    BinaryTreeAnimationObject.prototype.getPointTo = function (point) {
        return this.rect.getPointTo(point);
    };

    BinaryTreeAnimationObject.prototype.getGroup = function() {
        return this.group;
    };

        BinaryTreeAnimationObject.prototype.createObject = function( binaryTree, right,left,data){
        var iRight = null , iLeft = null ;

        this.data = data;
        this.x = this.getLayoutManager().getCenter().getX();
        this.y = this.getLayoutManager().getCenter().getY();

        this.getConfigs()["x"] = this.x ;
        this.getConfigs()["y"] = this.y ;
        this.getConfigs()["data"] = this.data;

        this.rect = new TextRectAnimationObject(this.getConfigs(), this.getLayer(), this.getGroup());

        var rightNodeConfigs = Utils.clone(this.getConfigs());
        rightNodeConfigs[Constants.ARROW_FROMX] = this.rect.getX() + this.width;
        rightNodeConfigs[Constants.ARROW_FROMY] = this.rect.getX() + this.height;
        rightNodeConfigs[Constants.ARROW_TOX] = this.rect.getX() + this.width ;
        rightNodeConfigs[Constants.ARROW_TOY] = this.rect.getX() + this.height + this.height;

        this.rightPointer = new PointerAnimationObject(rightNodeConfigs, this.getLayer(), this.getGroup());

        var leftNodeConfigs = Utils.clone(this.getConfigs());
        leftNodeConfigs[Constants.ARROW_FROMX] = this.rect.getX();
        leftNodeConfigs[Constants.ARROW_FROMY] = this.rect.getX() + this.height;
        leftNodeConfigs[Constants.ARROW_TOX] = this.rect.getX();
        leftNodeConfigs[Constants.ARROW_TOY] = this.rect.getX() + this.height + this.height;

        this.leftPointer = new PointerAnimationObject(leftNodeConfigs, this.getLayer(), this.getGroup());

        if( right != null ){
            iRight = right.getInternalTree();
        }

        if( left != null ){
            iLeft = left.getInternalTree();
        }

//        if( parent != null ){
//            iParent = parent.getInternalTree();
//        }

        var internalBinaryTree = new InternalBinaryTree(iLeft,iRight,data);
        internalBinaryTree.setAnimNode(this);

        binaryTree.setInternalTree(internalBinaryTree);

        this.binaryTree = internalBinaryTree;
        this.drawTree();

        this.getAnimationEngine().next();
//        if(iParent){
//            // align wrt parent..
//            var parentNode = iParent.getAnimNode();
//            this.setGroup(parentNode.setGroup());
//            var x = parentNode.getX() - this.width - this.width/2;
//            var y = parentNode.getY() + 2 * this.height ;
//        }else if( iLeft && iRight ){
//            var leftNode = iLeft.getAnimNode();
//            var rightNode = iRight.getAnimNode();
//            this.x = ( leftNode.getX() + rightNode.getX() ) / 2;
//            this.y = (leftNode.getY() < rightNode.getY() ? leftNode.getY() : rightNode.getY()) - 2 * this.height;
//        }else if( iLeft ){
//            this.x = iLeft.getAnimNode().getX() + this.width + this.width/2;
//            this.y = iLeft.getAnimNode().getY() - 2 * this.height;
//        }else if( iRight ){
//            this.x = iRight.getAnimNode().getX() - this.width - this.width/2;
//            this.y = iRight.getAnimNode().getY() - 2 * this.height;
//        }else{
//            var center = this.getLayoutManager().getCenter();
//            this.x = center.getX();
//            this.y = center.getY();
//        }
//
    };

    return BinaryTreeAnimationObject;
});