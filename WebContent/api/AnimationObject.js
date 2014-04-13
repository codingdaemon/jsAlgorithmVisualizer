function AnimationObject(name){
	this.name = name;
}

AnimationObject.prototype.createObject = function(animationEngine){
	Logger.info("creating new AnimationObject");
	animationEngine.next();
};

AnimationObject.prototype.getName = function(){
	return this.name;
};