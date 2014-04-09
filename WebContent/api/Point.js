/**
 *  to define the x and y on the coordinate
 */ 

function Point( x , y ){
	this.x = x ;
	this.y = y;
}

Point.prototype.getX = function(){
	return this.x;
};

Point.prototype.setX = function(x){
	this.x = x;
};

Point.prototype.getY = function(){
	return this.y;
};

Point.prototype.setY = function(y){
	this.y = y;
};
