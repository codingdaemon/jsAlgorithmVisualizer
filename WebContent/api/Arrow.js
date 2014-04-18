function Arrow(configs){
    this.x1 = configs[ jsav.ARROW_FROMX];
    this.y1 = configs[ jsav.ARROW_FROMY];
    this.x2 = configs[ jsav.ARROW_TOX];
    this.y2 = configs[ jsav.ARROW_TOY];
    this.l = configs[ jsav.ARROW_HEAD_LENGTH] ;
    this.h = configs[ jsav.ARROW_HEAD_HEIGHT];
    this.tailColor = configs[ jsav.ARROW_TAIL_COLOR];
    this.headColor = configs[ jsav.ARROW_HEAD_COLOR];
    this.tailWidth = configs[ jsav.ARROW_TAIL_WIDTH];
    this.headWidth = configs[jsav.ARROW_HEAD_WIDTH];
    this.headSolid = configs[ jsav.ARROW_HEAD_SOLID];
    this.text = configs[ jsav.ARROW_TAIL_TEXT];
    this.tailTextFontSize = configs[ jsav.ARROW_TAIL_TEXT_FONT_SIZE];
    this.tailTextColor = configs[ jsav.ARROW_TAIL_TEXT_COLOR];
    this.tailTextFont = configs[ jsav.ARROW_TAIL_TEXT_FONT];
	
	this.group = new Kinetic.Group({
		draggable : true
	});
	
	var theta = Math.atan((this.y2-this.y1)/(this.x2-this.x1));
	var beta = Math.asin(this.h/this.l);
	this.x3 = this.x2 - this.l * Math.cos(beta-theta);
	this.y3 = this.y2 + this.l * Math.sin(beta-theta);
	
	this.x4 = this.x2 - this.l * Math.sin(Math.PI/2 - theta -beta);
	this.y4 = this.y2 - this.l * Math.cos( Math.PI/2 -theta - beta);
	
	var ref = this;
	this.tailLine = new Kinetic.Line({
		 points: [ref.x1, ref.y1, ref.x2, ref.y2],
	        stroke: ref.tailColor,
	        strokeWidth: ref.tailWidth
	});
	
	this.group.add(this.tailLine);
	
	this.headLine = new Kinetic.Line({
		points : [ref.x3, ref.y3, ref.x4, ref.y4, ref.x2, ref.y2, ref.x3, ref.y3],
		stroke: ref.headColor,
		strokeWidth : ref.headWidth,
		closed : ref.headSolid,
		fill : ref.headColor
	});

	this.group.add(this.headLine);
	
	if( this.text ){
		this.tailText = new Kinetic.Text({
		        x: ref.x1,
		        y: ref.y1,
		        text: ref.text,
		        fontSize: ref.tailTextFontSize,
		        fontFamily: ref.tailTextFont,
		        fill: ref.tailTextColor
		});
		this.group.add(this.tailText);
	}
	
//	return this.group;
}

Arrow.prototype.getGroup = function(){
	return this.group;
};

Arrow.prototype.getHeadLine = function(){
	return this.headLine;
};

Arrow.prototype.getTailLine = function(){
	return this.tailLine;
};

Arrow.prototype.getTailText = function(){
	return this.tailText;
};

Arrow.prototype.pointHeadTo = function(obj){

};

Arrow.prototype.pointTailTo = function(obj){

};

