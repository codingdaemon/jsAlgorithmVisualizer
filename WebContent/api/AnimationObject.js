function AnimationObject(name){
	this.name = name;
}

AnimationObject.prototype.createObject = function(animationEngine){
	Logger.log("creating new AnimationObject");
	animationEngine.next();
};

AnimationObject.prototype.getName = function(){
	return this.name;
};