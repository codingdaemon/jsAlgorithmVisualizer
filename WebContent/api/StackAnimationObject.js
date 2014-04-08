function StackAnimationObject(name){
	AnimationObject.call(name);
}

StackAnimationObject.prototype = new AnimationObject();

StackAnimationObject.prototype.toString = function(){
	return "Stack[ name = " + this.name + "]";
};

StackAnimationObject.prototype.createObject = function(animationEngine){
	Logger.log("Animation for creating new Stack object for " + this);
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
