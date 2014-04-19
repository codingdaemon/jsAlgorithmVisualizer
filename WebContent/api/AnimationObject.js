function AnimationObject(name, layer){
	this.name = name;
    this.id = Utils.generateId();
    this.layer = layer;
}

AnimationObject.prototype.createObject = function(animationEngine){
	Logger.info("creating new AnimationObject");
	animationEngine.next();
};

AnimationObject.prototype.getName = function(){
	return this.name;
};

AnimationObject.prototype.getId = function(){
    return this.id;
};

AnimationObject.prototype.getRoot = function(){
    return null;
};

AnimationObject.prototype.getLayer = function(){
    return this.layer;
};