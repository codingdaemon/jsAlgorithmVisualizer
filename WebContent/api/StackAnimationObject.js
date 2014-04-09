function StackAnimationObject(name){
	AnimationObject.call(name);
	this.group = new Kinetic.Group({
        draggable: true
     });
	this.rectArray = [];
	this.currentIndex = 0 ; // this represents where the actual values will go
							// does not include the name rectangle 
}

StackAnimationObject.prototype = new AnimationObject();

StackAnimationObject.prototype.toString = function(){
	return "Stack[ name = " + this.name + "]";
};

StackAnimationObject.prototype.getNextRect = function(){
	
};

StackAnimationObject.prototype.createObject = function(animationEngine){
	var center = jsav.layoutManager.getCenter();
	var rect = new Kinetic.Rect({
        x: center.getX(),
        y: center.getY(),
        width: jsav.STACK_BOX_LENGTH,
        height: jsav.STACK_BOX_LENGTH,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
      });
	
	this.group.add(rect);
	jsav.layoutManager.getLayer().add(this.group);
	animationEngine.next();
};

StackAnimationObject.prototype.push = function(data, animationEngine){
	Logger.log("Animating to push data = " + data + " on the stack = " + this);
	animationEngine.next();
};

StackAnimationObject.prototype.pop = function(animationEngine){
	Logger.log("Animating to pop data from the stack = " + this);
	animationEngine.next();
};
