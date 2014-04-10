function TextRect(textValue,coorX,coorY){
	this.textValue = textValue;
	this.x = coorX;
	this.y = coorY;
	this.group = new Kinetic.Group();
    this.text = new Kinetic.Text({
        x: coorX,
        y: coorY,
        text: textValue,
        fontSize: 11,
        fontFamily: 'Calibri',
        fill: '#00000',
        width: jsav.STACK_BOX_LENGTH,
        align: 'center'
      });

     this.rect = new Kinetic.Rect({
          x: coorX,
          y: coorY,
          width: jsav.STACK_BOX_LENGTH,
          height: jsav.STACK_BOX_LENGTH,
          fill: 'yellow',
          stroke: 'black',
          strokeWidth: 1
        });

      this.group.add(this.rect);
      this.group.add(this.text);
      
      this.getGroup = function(){
    	  return this.group;
      };
      this.getRect = function(){
    	  return this.rect;
      };
      this.getText = function(){
    	  return this.text;
      };
      this.getTextValue = function(){
    	  return this.textValue;
      };
}


function StackAnimationObject(name){
	if(!name){
		name = "Stack";
	}
	
	AnimationObject.call(this,name);
	this.group = new Kinetic.Group({
        draggable: true
     });
	this.rectArray = [];
}

StackAnimationObject.prototype = new AnimationObject();

StackAnimationObject.prototype.toString = function(){
	return "Stack[ name = " + this.getName() + "]";
};

StackAnimationObject.prototype.createObject = function(animationEngine){
	Logger.log("Animating to create stack = " + this.toString());
	
	var center = jsav.layoutManager.getCenter();
	
	var rectGroup = this.getTextRectangle(this.getName(), center.getX(), center.getY());
	
	this.rectArray.push(rectGroup);
	this.group.add(rectGroup.getGroup());
	
	var layer = jsav.layoutManager.getLayer();
	layer.add(this.group);
	layer.draw();

	setTimeout(function(){
	    rectGroup.getRect().fill("green");
		layer.draw();
		animationEngine.next();
	},2000 );
};

StackAnimationObject.prototype.push = function(data, animationEngine){
	// get the top rect and find the position where should we put the next rect
	Logger.log("Animating to push data = " + data + " on the stack = " + this);

	var topRect = this.rectArray[this.rectArray.length - 1];
	var nextX = topRect.getRect().x();
	var nextY = topRect.getRect().y() - jsav.STACK_BOX_LENGTH;
	
	var rectGroup = this.getTextRectangle(data.toString(), nextX, nextY);
	
	this.rectArray.push(rectGroup);
	this.group.add(rectGroup.getGroup());
	
	var layer = jsav.layoutManager.getLayer();
	layer.draw();
	
	setTimeout(function(){
	    // get only rect
		rectGroup.getRect().fill("green");
		layer.draw();
		animationEngine.next();
	},2000 );
};

StackAnimationObject.prototype.pop = function(animationEngine){
	Logger.log("Animating to pop data from the stack = " + this);
	
	var rectGroup = this.rectArray.pop();
	var group = rectGroup.getGroup();
	var rect = rectGroup.getRect();
	
	var layer = jsav.layoutManager.getLayer();
	
	var intervalTimer = setInterval(function(){
		rect.opacity(rect.opacity() - 0.1);

		if( rect.opacity() <= 0 ){
			group.destroyChildren();
			group.destroy();
			layer.draw();
			clearInterval(intervalTimer);
			animationEngine.next();
		}else{
			layer.draw();
		}
	}, 100);
};


StackAnimationObject.prototype.getTextRectangle = function(text,coorX,coorY){
	return new TextRect(text,coorX,coorY);
};
