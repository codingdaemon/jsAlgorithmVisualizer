jsav = {
	STAGE_CONTAINERDIV :"stage.containerDiv",
	STAGE_HEIGHT : "stage.height",
	STAGE_WIDTH : "stage.width",
	STAGE_COLOR_RED : "stage.color.red",
	STAGE_COLOR_BLUE : "stage.color.blue",
	STAGE_COLOR_GREEN : "stage.color.green",
	STAGE_OPACITY : "stage.opacity",
	
	VAR_BOX_LENGTH : "var.box.length",
	
	STACK_BOX_WIDTH : "stack.box.width",
	STACK_BOX_HEIGHT : "stack.box.height",

	STACK_BOX_BORDER_COLOR : "stack.box.border.color",
	STACK_BOX_INIT_COLOR : "stack.box.init.color",
	STACK_BOX_FINAL_COLOR : "stack.box.final.color",
	STACK_BOX_TEXT_COLOR : "stack.box.text.color",
	CODE_FONT_SIZE : "code.font.size",
	CODE_COLOR : "code.color",
	CODE_HIGHLIGHT_COLOR : "code.highlight.color",
	CODE_HIGHLIGHT_FONT_SIZE : "code.highlight.font.size",
	
	DEFAULT_OPTIONS : {},
	
	animatorMap : [],
	currentCodeAnimationId : 0,
	
	generateCodeAnimation : function( codeString ){
		var animationId = this.currentCodeAnimationId;
		var codeParser =  new CodeParser(codeString, animationId );
		var codeStatementLines = codeParser.getCodeStatementLines();
		var animator = new Animator(animationId, codeStatementLines, jsav.DEFAULT_OPTIONS);// codeStatementLines, options
		this.animatorMap[animationId] = animator;
		
		var modifiedCode = codeParser.getModifiedCode();
		this.runCodeAndAnimate(animationId, modifiedCode);
		
		this.currentCodeAnimationId++;
		
		return animationId;
	},

	getAnimatorById : function(animationId){
		return this.animatorMap[animationId];
	},
	
	runCodeAndAnimate : function(animationId, modifiedCode){
		Logger.info("Executing the code : " + modifiedCode);
		var animator = this.getAnimatorById(animationId);
		animator.createStage();
		
		var head = document.head;

		var jsCodeScript = document.createElement("script");
		jsCodeScript.type = 'text/javascript';
		jsCodeScript.innerHTML = modifiedCode;
	    
		head.appendChild(jsCodeScript);
	},

	playCodeAnimation : function(animationId){
		var animator = this.animatorMap[animationId];
		animator.playCodeAnimation();
	},
	
	startAnimateLineExecution : function(statementNumber, animationId){
		var animator = this.animatorMap[animationId];
		if( null == animator ){
			throw "Cannot Find the Animation with Id " + animationId;
		}
		
		animator.startAnimateLineExecution(statementNumber);
	},
	
	endAnimateLineExecution : function( statementNumber, animationId ){
		var animator = this.animatorMap[animationId];
		if( null == animator ){
			throw "Cannot Find the Animation with Id " + animationId;
		}
		
		animator.endAnimateLineExecution(statementNumber);
	}
};
