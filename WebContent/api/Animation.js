function Animator(options){
	this.options = options;
	this.jsCodeScript = null;
	this.animationEngine = new AnimationEngine();
	this.stage = null;
}

Animator.prototype.createStage = function(containerDiv, stageHeight, stageWidth) {
		this.stage = new Kinetic.Stage({
			container : containerDiv,
			width : stageHeight,
			height : stageWidth
		});

		this.layoutManager = new LayoutManager(this.stage);
	},
	
Animator.prototype.generateCodeAnimation = function( codeString ){
		this.codeAnimationGenerator =  new CodeAnimationGenerator(codeString );
		var modifiedCode = this.codeAnimationGenerator.getModifiedCode();
		this.runCodeAndAnimate(modifiedCode);
};
	
Animator.prototype.playCodeAnimation = function(){
		this.animationEngine.start();
};
	
Animator.prototype.runCodeAndAnimate = function(modifiedCode){
		var head = document.head;
		if (this.jsCodeScript != null ){
			head.removeChild(this.jsCodeScript);
		}
		this.jsCodeScript = document.createElement("script");
		this.jsCodeScript.type = 'text/javascript';
		this.jsCodeScript.innerHTML = modifiedCode;
	    head.appendChild(this.jsCodeScript);
};
	
Animator.prototype.endAnimateLineExecution = function(statementNumber){
		this.codeAnimationGenerator.generateEndCodeStatementAnimation(statementNumber);
},
	
startAnimateLineExecution = function( statementNumber ){
		this.codeAnimationGenerator.generateStartCodeStatementAnimation(statementNumber);
},
	
	resetCodeAnimation : function(){
		var layer = this.layoutManager.getLayer()
		layer.removeChildren();
		layer.clear();
		layer.draw();

		this.animationEngine.reset();
	}