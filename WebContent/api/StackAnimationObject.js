function StackAnimationObject(name){
	AnimationObject.call(name);
	this.group = new Kinetic.Group({
        draggable: true
     });
	this.rectArray = [];
}

StackAnimationObject.prototype = new AnimationObject();

StackAnimationObject.prototype.toString = function(){
	return "Stack[ name = " + this.name + "]";
};

StackAnimationObject.prototype.getNextRect = function(){
	
};

StackAnimationObject.prototype.createObject = function(animationEngine){
	Logger.log("Animating to create stack = " + this.toString());
	
	var center = jsav.layoutManager.getCenter();
	
	var rect = this.getTextRectangle(this.name, center.getX(), center.getY());
	
	this.rectArray.push(rect);
	this.group.add(rect);
	
	var layer = jsav.layoutManager.getLayer();
	layer.add(this.group);
	layer.draw();
	
	setTimeout(function(){
		rect.setFill("green");
		layer.draw();
		animationEngine.next();
	},2000 );
};

StackAnimationObject.prototype.getTextRectangle = function(text,coorX,coorY){
	// since this text is inside of a defined area, we can center it using
    // align: 'center'
    var text = new Kinetic.Text({
      x: coorX,
      y: coorY,
      text: text,
      fontSize: 11,
      fontFamily: 'Calibri',
      fill: '#555',
      width: jsav.STACK_BOX_LENGTH,
      align: 'center'
    });

    var rect = new Kinetic.Rect({
        x: coorX,
        y: coorY,
        width: jsav.STACK_BOX_LENGTH,
        height: jsav.STACK_BOX_LENGTH,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4
      });
    
    var group = new Kinetic.Group();
    group.draggable(true);

    group.add(rect);
    group.add(text);
    
    return group;
};

StackAnimationObject.prototype.push = function(data, animationEngine){
	// get the top rect and find the position where should we put the next rect
	Logger.log("Animating to push data = " + data + " on the stack = " + this);

	var topRect = this.rectArray[this.rectArray.length - 1];
	var nextX = topRect.x;
	var nextY = topRect.y - jsav.STACK_BOX_LENGTH;
	
	var rectGroup = this.getTextRectangle(data.toString(), nextX, nextY);
	
	this.rectArray.push(rectGroup);
	this.group.add(rectGroup);
	
	var layer = jsav.layoutManager.getLayer();
	layer.draw();
	
	setTimeout(function(){
		 // get all children
	    var children = rectGroup.getChildren();

	    // get only rect
	    var actualRect = rectGroup.getChildren(function(node){
	       return node.getClassName() === 'Rect';
	    });

		actualRect.setFill("green");
		layer.draw();
		animationEngine.next();
	},2000 );
};

StackAnimationObject.prototype.pop = function(animationEngine){
	Logger.log("Animating to pop data from the stack = " + this);
	
	var rectGroup = this.rectArray.pop();
	
	var intervalTimer = setInterval(function(){
		rectGroup.opacity(rectGroup.opacity - 0.1);
		layer.draw();
		
		if( rectGroup.opacity <= 0 ){
			rectGroup.destroyAllChildren();
			rectGroup.destroy();
			clearInterval(intervalTimer);
			animationEngine.next();
		}
	}, 100);
};
