function StackAnimationGenerator(name){
	AnimationGenerator.call(this);
	this.name = name;
	this.stackAnimObject = new StackAnimationObject(name);
	jsav.animationEngine.push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.createObject, [jsav.animationEngine]));
}

StackAnimationGenerator.prototype = new AnimationCodeGenerator();

StackAnimationGenerator.prototype.toString = function(){
	return "StackAnimationGenerator[ name = " + this.name + ", stackAnimObject = " + this.stackAnimObject + "]";
};

StackAnimationGenerator.prototype.push = function(data){
	jsav.animationEngine.push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.push, [data, jsav.animationEngine]));
};

StackAnimationGenerator.prototype.pop = function(){
	jsav.animationEngine.push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.pop, [jsav.animationEngine]));
};