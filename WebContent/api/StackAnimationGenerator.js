function StackAnimationGenerator(animationId, name){
	AnimationGenerator.call(this);
	this.name = name;
	this.animationId = animationId;
	this.stackAnimObject = new StackAnimationObject(animationId, name);
	var animator = jsav.getAnimatorById(this.animationId);
	animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.createObject, []));
}

StackAnimationGenerator.prototype = new AnimationGenerator();

StackAnimationGenerator.prototype.toString = function(){
	return "StackAnimationGenerator[ name = " + this.name + ", stackAnimObject = " + this.stackAnimObject + "]";
};

StackAnimationGenerator.prototype.push = function(data){
	var animator = jsav.getAnimatorById(this.animationId);
	animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.push, [data]));
};

StackAnimationGenerator.prototype.pop = function(){
	var animator = jsav.getAnimatorById(this.animationId);
	animator.getAnimationEngine().push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.pop, []));
};