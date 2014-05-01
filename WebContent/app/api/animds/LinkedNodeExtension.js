/**
 * Created by nitiraj on 1/5/14.
 */
define(["ds/LinkedNode"], function(LinkedNode){
    /**
     * @returns  LinkedNodeAnimationObject associated with this LinkedNode
     */
    LinkedNode.prototype.getAnimNode = function(){
        return this.animNode;
    };
    /**
     * sets the animation Object for this linked Node
     * @param linkedNodeAnimationObject
     */
    LinkedNode.prototype.setAnimNode = function(linkedNodeAnimationObject){
        this.animNode = linkedNodeAnimationObject;
    };

    return LinkedNode;
});