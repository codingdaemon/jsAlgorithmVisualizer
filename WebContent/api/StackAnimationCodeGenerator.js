function StackAnimationCodeGenerator(name){
	AnimationCodeGenerator.call(this);
	this.name = name;
	this.stackAnimObject = new StackAnimationObject(name);
	jsav.animationEngine.push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.createObject, [jsav.animationEngine]));
}

StackAnimationCodeGenerator.prototype = new AnimationCodeGenerator();

StackAnimationCodeGenerator.prototype.toString = function(){
	return "StackAnimationCodeGenerator[ name = " + this.name + ", stackAnimObject = " + this.stackAnimObject + "]";
};

StackAnimationCodeGenerator.prototype.push = function(data){
	jsav.animationEngine.push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.push, [data, jsav.animationEngine]));
};

StackAnimationCodeGenerator.prototype.pop = function(){
	jsav.animationEngine.push(new AnimationInput(this.stackAnimObject, StackAnimationObject.prototype.pop, [jsav.animationEngine]));
};