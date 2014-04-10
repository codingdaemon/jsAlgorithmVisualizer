function AnimationInput(object, func, params){
	/**
	 *  Type AnimationObject
	 */
	this.object = object;
	
	/**
	 *  Type Function of AnimationObject
	 */
	this.func = func;
	
	/**
	 * Parameters to the func
	 */  
	this.params = params;
}

AnimationInput.prototype.toString = function(){
	return "AnimationInput[ object = " + this.object + ", func = " + this.func.name + ", parmas = " + this.params +" ]";
};