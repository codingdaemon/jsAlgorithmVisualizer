/**
 * this Stack class can be used directly in code.
 * @returns
 */
function Stack(){
	this.codeGenerator = new StackAnimationCodeGenerator();
	this.array = [];
	this.currentIndex = 0;
}

Stack.prototype.toString = function(){
	return "Stack[ currentIndex = " + this.currentIndex + ", array = " + this.array + "]";
};

Stack.prototype.push = function(data){
	this.array[this.currentIndex] = data;
	this.currentIndex++;
	this.codeGenerator.push(data);
};

Stack.prototype.pop = function(){
	var data = null;
	if( this.currentIndex != 0 ){
		this.currentIndex--;
		data = this.array[this.currentIndex];
		this.codeGenerator.pop();
		return data;
	}else{
		Logger.log("No more data in the stack.");
		return null;
	}
};