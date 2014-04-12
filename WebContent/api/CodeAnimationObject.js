function CodeAnimationObject(name, codeLines){
	AnimationObject.call(this,name);
	this.codeLines = codeLines;
	this.allCodeText = [];
	this.codeStatementText = [];
	this.group = new Kinetic.Group();
	this.group.draggable(true);
}

CodeAnimationObject.prototype = new AnimationObject();

CodeAnimationObject.prototype.toString = function(){
	return "CodeAnimationObject[ name = " + name +"]";
};

CodeAnimationObject.prototype.createObject = function(animationEngine){
	var nextY = 0 ;
	var nextX = 0 ;
	for( var i = 0 ; i < this.codeLines.length ; i++ ){
		var dummyCAO = this;
		var textLine = new Kinetic.Text({
			x : nextX,
			y : nextY,
			text : dummyCAO.codeLines[i].code.trim(),
			fontSize : jsav.CODE_FONT_SIZE,
			fill : jsav.CODE_COLOR
		});
		
		nextY += textLine.height();
		
		this.allCodeText.push( textLine );
		this.group.add(textLine);
		
		if( this.codeLines[i].isCodeStatement ){
			this.codeStatementText.push(textLine);
		}
	}
	
	var layer = jsav.layoutManager.getLayer();
	layer.add(this.group);
	layer.draw();
	
	animationEngine.next();
};

/**
 * get the code statement. Highlight it and change the font for just a sec
 * @param codeStatementNumber
 * @param animationEngine
 */
CodeAnimationObject.prototype.startCodeStatementAnimation = function( codeStatementNumber, animationEngine){
	var textLine = this.codeStatementText[codeStatementNumber];
	textLine.fill(jsav.CODE_HIGHLIGHT_COLOR);
	textLine.fontSize(jsav.CODE_HIGHLIGHT_FONT_SIZE);
	var layer = jsav.layoutManager.getLayer();
	layer.draw();
	
	animationEngine.next();
};

/**
 * get the code statement. Highlight it and change the font for just a sec
 * @param codeStatementNumber
 * @param animationEngine
 */
CodeAnimationObject.prototype.endCodeStatementAnimation = function( codeStatementNumber, animationEngine){
	var textLine = this.codeStatementText[codeStatementNumber];
	textLine.fill(jsav.CODE_COLOR);
	textLine.fontSize(jsav.CODE_FONT_SIZE);
	
	var layer = jsav.layoutManager.getLayer();
	layer.draw();
	
	animationEngine.next();
};




