function CodeAnimationObject(name, codeLines){
	AnimationObject.call(this,name);
	this.codeLines = codeLines;
	this.allCodeText = [];
	this.codeStatementText = [];
	this.group = new Kinetic.Group();
}

CodeAnimationObject.prototype = new AnimationObject();

CodeAnimationObject.prototype.createObject = function(animationEngine){
	var nextY = 0 ;
	var nextX = 0 ;
	for( var i = 0 ; i < this.codeLines.length ; i++ ){
		
		var textLine = new Kinetic.Text({
			x : nextX,
			y : nextY,
			text : codeLines[i].code.trim(),
			fontSize : jsav.CODE_FONT_SIZE,
			fill : jsav.CODE_COLOR
		});
		
		nextY += textLine.height;
		
		this.allCodeText.push( textLine );
		
		if( codeLines[i].isCodeStatement ){
			this.codeStatementText.push(textLine);
		}
	}
};

CodeAnimationObject.prototype.createNewTextLine = function(codeText, nextY){
	
}