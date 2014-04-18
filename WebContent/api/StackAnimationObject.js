function StackAnimationObject(animationId, name){
	if(!name){
		name = "Stack";
	}
	this.animationId = animationId;
	this.animator = jsav.getAnimatorById(animationId);
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

StackAnimationObject.prototype.createObject = function(){
	Logger.info("Animating to create stack = " + this.toString());
	
	var center = this.animator.getLayoutManager().getCenter();
	var ref = this;
	
	var boxConfigs = {
        "x" : center.getX(),
        "y": center.getY(),
        "text.value" : ref.getName(),
        "text.font.size" : 20 ,
        "text.font.family" : "Calibri",
        "text.fill.color" : 'black',
        "text.width" : 50,
        "text.align" : 'center',
        "rect.width" : ref.animator.getConfigs()[jsav.STACK_BOX_WIDTH],
        "rect.height" : ref.animator.getConfigs()[jsav.STACK_BOX_HEIGHT],
        "rect.fill.color" : ref.animator.getConfigs()[jsav.STACK_BOX_INIT_COLOR],
        "rect.stroke.color" : ref.animator.getConfigs()[jsav.STACK_BOX_BORDER_COLOR],
        "rect.stroke.width" : 2
      };

	var rectGroup = this.getTextRectangle(boxConfigs);
	
	this.rectArray.push(rectGroup);
	this.group.add(rectGroup.getGroup());
	
	var layer = this.animator.getLayoutManager().getLayer();
	layer.add(this.group);
	layer.draw();

	setTimeout(function(){
	    rectGroup.getRect().fill(ref.animator.getConfigs(jsav.STACK_BOX_FINAL_COLOR));
		layer.draw();
		ref.animator.getAnimationEngine().next();
	},2000 );
};

StackAnimationObject.prototype.push = function(data){
	// get the top rect and find the position where should we put the next rect
	Logger.info("Animating to push data = " + data + " on the stack = " + this);
	var ref = this;
	var topRect = this.rectArray[this.rectArray.length - 1];
	var nextX = topRect.getRect().x();
	var nextY = topRect.getRect().y() - this.animator.getConfigs()[jsav.STACK_BOX_HEIGHT];

	var boxConfigs = {
	        "x" : nextX,
	        "y": nextY,
	        "text.value" : data.toString(),
	        "text.font.size" : 20 ,
	        "text.font.family" : "Calibri",
	        "text.fill.color" : 'black',
	        "text.width" : 50,
	        "text.align" : 'center',
	        "rect.width" : ref.animator.getConfigs()[jsav.STACK_BOX_WIDTH],
	        "rect.height" : ref.animator.getConfigs()[jsav.STACK_BOX_HEIGHT],
	        "rect.fill.color" : ref.animator.getConfigs()[jsav.STACK_BOX_INIT_COLOR],
	        "rect.stroke.color" : ref.animator.getConfigs()[jsav.STACK_BOX_BORDER_COLOR],
	        "rect.stroke.width" : 2
	      };

	var rectGroup = this.getTextRectangle(boxConfigs);
	
	this.rectArray.push(rectGroup);
	this.group.add(rectGroup.getGroup());
	
	var layer = this.animator.getLayoutManager().getLayer();
	layer.draw();
	
	setTimeout(function(){
	    // get only rect
		rectGroup.getRect().fill(ref.animator.getConfigs()[jsav.STACK_BOX_FINAL_COLOR]);
		layer.draw();
		ref.animator.getAnimationEngine().next();
	},2000 );
};

StackAnimationObject.prototype.pop = function(){
	Logger.info("Animating to pop data from the stack = " + this);
	
	var rectGroup = this.rectArray.pop();
	var group = rectGroup.getGroup();
	var rect = rectGroup.getRect();
	
	var layer = this.animator.getLayoutManager().getLayer();
	
	var ref = this;
	var intervalTimer = setInterval(function(){
		rect.opacity(rect.opacity() - 0.1);

		if( rect.opacity() <= 0 ){
			group.destroyChildren();
			group.destroy();
			layer.draw();
			clearInterval(intervalTimer);
			ref.animator.getAnimationEngine().next();
		}else{
			layer.draw();
		}
	}, 100);
};


StackAnimationObject.prototype.getTextRectangle = function(boxConfigs){
	return new TextRect(boxConfigs);
};
