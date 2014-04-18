function Arrow(configs){
	this.tailText = configs.tailText;
	this.x1 = configs["from.x"];
	this.y1 = configs["fromx.y"];
	this.x2 = configs["to.x"];
	this.y2 = configs["to.y"];
	this.l = configs["head.length"] ;
	this.h = configs["head.width"];
	this.tailColor = configs["tail.color"];
	this.headColor = configs["head.color"];
	this.tailWidth = configs["tail.width"]; 
	this.headSolid = configs["head.solid"];
	this.text = configs["tail.text"];
	this.tailTextFontSize = configs["tail.text.font.size"];
	this.tailTextColor = configs["tail.text.color"];
	this.tailTextFont = configs["tail.text.font"];
	
	this.group = new Kinetic.Group({
		draggable : true
	});
	
	var theta = Math.atan((this.y2-this.y1)/(this.x2-this.x1));
	var beta = Math.asin(this.h/this.l);
	this.x3 = x2 - l * Math.cos(beta-theta);
	this.y3 = y2 + l * Math.sin(beta-theta);
	
	this.x4 = x2 - l * Math.sin(Math.PI/2 - theta -beta);
	this.y4 = y2 - l * Math.cos( Math.PI/2 -theta - beta);
	
	var ref = this;
	this.tailLine = new Kinetic.Line({
		 points: [ref.x1, ref.y1, ref.x2, ref.y2],
	        stroke: ref.tailColor,
	        strokeWidth: ref.tailWidth,
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
		this.group.add(this.text);
	}
	
	return this.group;
};

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

