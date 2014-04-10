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
	
	animationEngine : new AnimationEngine(),

	createStage : function(containerDiv, stageHeight, stageWidth) {
		jsav.stage = new Kinetic.Stage({
			container : containerDiv,
			width : stageHeight,
			height : stageWidth
		});

		jsav.layoutManager = new LayoutManager(jsav.stage);
	},
	
	getCodeAnimationGenerator : function( codeString ){
		return new CodeAnimationGenerator(codeString );
	},
	
	animateLineExecution : function(statementNumber){
		
	},
};
