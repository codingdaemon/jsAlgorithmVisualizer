/**
 * Created by nitiraj on 11/5/14.
 */
define([ "animgen/BinaryTreeAnimationGenerator", "core/Logger","core/Utils"],function(BinaryTreeAnimationGenerator,Logger,Utils){
    /**
     * binary tree constructor. parent data is optional depending on the
     * algo being used.
     * @param right
     * @param left
     * @param data
     * @param parent : optional
     * @constructor
     */
   function BinaryTree(left,right,data){
       this.setRight(right) ;
       this.setLeft(left);
       this.data = data;
       this.parent = null;

       if( typeof animationId !== 'undefined' && null != animationId ){
           this.animationGenerator = new BinaryTreeAnimationGenerator(animationId,"BinaryTree",this,left,right,data);
       }
   }

   BinaryTree.prototype.setRight = function(right){
       if( right != null && !(right instanceof BinaryTree) ){
           throw "Not instance of BinaryTree";
       }

       this.right = right;
       if(!Utils.isNullOrUndefined(this.right)){
           this.right.parent = this;
       }
   };

   BinaryTree.prototype.setLeft = function(left){
       if( left != null && !(left instanceof BinaryTree) ){
           throw "Not instance of BinaryTree";
       }
       this.left = left;
       if( !Utils.isNullOrUndefined( this.left )){
           this.left.parent = this;
       }
   };

   BinaryTree.prototype.setData = function(data){
        this.data = data;
   };

//   BinaryTree.prototype.setParent = function( parent ) {
//       if( parent != null && !(parent instanceof BinaryTree) ){
//           throw "Not instance of BinaryTree";
//       }
//       this.parent = parent;
//   };

    BinaryTree.prototype.getRight = function(){
        return this.right;
    };

    BinaryTree.prototype.getLeft = function(){
        return this.left;
    };

    BinaryTree.prototype.getData = function(){
        return this.data;
    };

    BinaryTree.prototype.getParent = function() {
        return  this.parent;
    };

    /**
     * these method had to be added in BinaryTree.js because BinaryTreeExtension was not working as expected
     * @param internalBinaryTree
     */
    BinaryTree.prototype.setInternalTree = function (internalBinaryTree) {
        this.internalBinaryTree = internalBinaryTree;
    };

    /**
     * these method had to be added in BinaryTree.js because BinaryTreeExtension was not working as expected
     * @returns {*|BinaryTree.internalBinaryTree}
     */
    BinaryTree.prototype.getInternalTree = function () {
        return this.internalBinaryTree;
    };

    return BinaryTree;
});