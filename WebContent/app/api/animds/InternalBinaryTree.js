/**
 * Created by nitiraj on 1/5/14.
 */
define(["core/Utils"], function(Utils){

    /**
     * @param right : internal tree to the right
     * @param left : internal tree to the left
     * @param data
     * @constructor
     */
    function InternalBinaryTree(left,right,data){
        this.setRight(right) ;
        this.setLeft(left);
        this.setData(data);
        this.parent = null;
    }

    /**
     * O(n) in time and space
     * @returns {number}
     */
    InternalBinaryTree.prototype.getHeight = function(){

        var leftHeight = 0 ;
        var rightHeight = 0 ;
        if( this.getLeft() ){
            leftHeight = this.getLeft().getHeight();
        }
        if( this.getRight() ){
            rightHeight = this.getRight().getHeight();
        }

        return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
    };

    InternalBinaryTree.prototype.setRight = function(right){
        if( right != null && !(right instanceof InternalBinaryTree) ){
            throw "Not instance of BinaryTree";
        }

        this.right = right;
        if( !Utils.isNullOrUndefined(this.right)){
            right.parent = this;
        }
    };

    InternalBinaryTree.prototype.setLeft = function(left){
        if( left != null && !(left instanceof InternalBinaryTree) ){
            throw "Not instance of BinaryTree";
        }

        this.left = left;
        if( !Utils.isNullOrUndefined(this.left)){
            left.parent = this;
        }
    };

    InternalBinaryTree.prototype.setData = function(data){
        this.data = data;
    };
//
//    InternalBinaryTree.prototype.setParent = function( parent ) {
//        if( parent != null && !(parent instanceof InternalBinaryTree) ){
//            throw "Not instance of BinaryTree";
//        }
//        this.parent = parent;
//    };

    InternalBinaryTree.prototype.getRight = function(){
        return this.right;
    };

    InternalBinaryTree.prototype.getLeft = function(){
        return this.left;
    };

    InternalBinaryTree.prototype.getData = function(){
        return this.data;
    };

    InternalBinaryTree.prototype.getParent = function() {
        return  this.parent;
    };

    /**
     * @returns  LinkedNodeAnimationObject associated with this LinkedNode
     */
    InternalBinaryTree.prototype.getAnimNode = function(){
        return this.animNode;
    };
    /**
     * sets the animation Object for this linked Node
     * @param linkedNodeAnimationObject
     */
    InternalBinaryTree.prototype.setAnimNode = function(binaryTreeAnimationObject){
        this.animNode = binaryTreeAnimationObject;
    };

    return InternalBinaryTree;
});