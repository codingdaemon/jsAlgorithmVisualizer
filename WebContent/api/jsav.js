jsav = {
	VAR_BOX_LENGTH : 50,
	
	STACK_BOX_WIDTH : 50,
	STACK_BOX_HEIGHT : 30,

	STACK_BOX_BORDER_COLOR : "00000",
	STACK_BOX_INIT_COLOR : "FFFF33",
	STACK_BOX_FINAL_COLOR : "0066CC",
	STACK_BOX_TEXT_COLOR : "00000",
	CODE_FONT_SIZE : 20,
	CODE_COLOR : 'black',
	CODE_HIGHLIGHT_COLOR : 'red',
	CODE_HIGHLIGHT_FONT_SIZE : 24,
	
	animationEngine : new AnimationEngine(),
	jsCodeScript : null,
	createStage : function(containerDiv, stageHeight, stageWidth) {
		jsav.stage = new Kinetic.Stage({
			container : containerDiv,
			width : stageHeight,
			height : stageWidth
		});

		jsav.layoutManager = new LayoutManager(jsav.stage);
	},
	
	generateCodeAnimation : function( codeString ){
		this.codeAnimationGenerator =  new CodeAnimationGenerator(codeString );
		var modifiedCode = this.codeAnimationGenerator.getModifiedCode();
		this.runCodeAndAnimate(modifiedCode);
	},
	
	playCodeAnimation : function(){
		this.animationEngine.start();
	},
	
	runCodeAndAnimate : function(modifiedCode){
		var head = document.head;
		if (this.jsCodeScript != null ){
			head.removeChild(this.jsCodeScript);
		}
		this.jsCodeScript = document.createElement("script");
		this.jsCodeScript.type = 'text/javascript';
		this.jsCodeScript.innerHTML = modifiedCode;
	    head.appendChild(this.jsCodeScript);
	},
	
	endAnimateLineExecution : function(statementNumber){
		this.codeAnimationGenerator.generateEndCodeStatementAnimation(statementNumber);
	},
	
	startAnimateLineExecution : function( statementNumber ){
		this.codeAnimationGenerator.generateStartCodeStatementAnimation(statementNumber);
	}
};
