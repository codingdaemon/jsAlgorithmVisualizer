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
     * @constructor
     */
   function BinaryTree(left,right,data){
       this.setRight(right);
       this.setLeft(left);
       this.data = data;
       this.parent = null;
       this.id = Utils.generateId();

       if( typeof animationId !== 'undefined' && null != animationId ){
           this.animationGenerator = new BinaryTreeAnimationGenerator(animationId,"BinaryTree",this,left,right,data);
       }
   }
   
   BinaryTree.prototype.getId = function(){
	   return this.id;
   };

   BinaryTree.prototype.setRight = function(right){
       if( right != null && !(right instanceof BinaryTree) ){
           throw "Not instance of BinaryTree";
       }

       if( !Utils.isNullOrUndefined(this.right) ){
		   this.right.parent = null;
	   }
       
	   this.right = right;

	   if( !Utils.isNullOrUndefined(right) ){
		   if( !Utils.isNullOrUndefined(right.parent) ){
			   if( right.parent.getLeft() == right ){
				   right.parent.setLeft(null);
			   }else{
				   right.parent.setRight(null);
			   }
		   }
		   
	       right.parent = this;
	   }
       
       if(!Utils.isNullOrUndefined(this.animationGenerator)){
           this.animationGenerator.setRight(right);
       }
   };

   BinaryTree.prototype.setLeft = function(left){
	   if( left != null && !(left instanceof BinaryTree) ){
           throw "Not instance of BinaryTree";
       }

       if( !Utils.isNullOrUndefined(this.left) ){
		   this.left.parent = null;
	   }
       
	   this.left = left;

	   if( !Utils.isNullOrUndefined(left) ){
		   if( !Utils.isNullOrUndefined(left.parent) ){
			   if( left.parent.getLeft() == left ){
				   left.parent.setLeft(null);
			   }else{
				   left.parent.setRight(null);
			   }
		   }
		   
	       left.parent = this;
	   }
       
       if(!Utils.isNullOrUndefined(this.animationGenerator)){
           this.animationGenerator.setLeft(left);
       }
   };

   BinaryTree.prototype.setData = function(data){
        this.data = data;

       if(!Utils.isNullOrUndefined(this.animationGenerator)){
           this.animationGenerator.setData(this.data);
       }
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

    BinaryTree.prototype.toString = function() {
        return  "BinaryTree [ id=" + this.id + ", data=" + this.data + "]";
    };

    return BinaryTree;
});