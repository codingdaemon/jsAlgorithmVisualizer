function LoggerClass(){
	this.log = function(message){
		if( console && console.log ){
			console.log(message);
		}
	};
}